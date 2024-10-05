// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.27;

import { AccessControl } from "@openzeppelin/contracts/access/AccessControl.sol";
import { IAccessControl} from "@openzeppelin/contracts/access/IAccessControl.sol";
import {ERC1155} from "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import { IERC1155} from "@openzeppelin/contracts/token/ERC1155/IERC1155.sol";


contract CryptoSurveyV1 is AccessControl, ERC1155 {
    uint private _surveyId = 1;
    uint256 public constant CSURVEY = 0;
    mapping(address=>Survey[]) public surveys;
    mapping(address=>SurveyReply[]) public surveyReplies;
    mapping(uint=>SurveyMetadata) public surveyMetadata;
    mapping(address=>Request[]) public requests;
    mapping(address=>Permission[]) public permissions;

    event CreateSurveyEvent(uint surveyId, string name, string description, string imageCID, string encryptedCID, address surveyAddress);
    event CreateSurveyMetadataEvent(uint surveyId, uint maxReply, uint incentive, address owner);
    event CreateRequestEvent(uint surveyId, address requestAddress, string description, string publicKey);
    event CreatePermissionEvent(uint surveyId, address requestAddress, string encryptedCID);
    event SubmitSurveyReplyEvent(uint surveyId, uint incentive, string encryptedCID, address replyAddress);
    
    struct Survey {
        uint surveyId;
        string name;
        string description;
        string imageCID;
        string encryptedCID;
    }

    struct SurveyMetadata {
        uint surveyId;
        uint maxReply;
        uint incentive;
        address owner;
    }

    struct SurveyReply {
        uint surveyId;
        uint incentive;
        string encryptedCID;
        address replyAddress;
    }

    struct Request {
        uint surveyId;
        address requestAddress;
        string description;
        string publicKey;
    }

    struct Permission {
        uint surveyId;
        address requestAddress;
        string encryptedCID;
    }

    constructor() ERC1155(""){
    }

    function getSurveysForAddress(address _address) public view returns (Survey[] memory) {
        return surveys[_address];
    }

    function supportsInterface(bytes4 interfaceId) public view override(AccessControl, ERC1155) returns (bool) {
        return
            interfaceId == type(IAccessControl).interfaceId || 
            interfaceId == type(IERC1155).interfaceId || 
            super.supportsInterface(interfaceId); 
    }
    //Survey creator
    function createSurvey(uint maxReply, uint incentive, string calldata name, string calldata description, string calldata imageCID, string calldata encryptedCID) public {
        //mint CSURVEY tokens based on input for now to be distributed to Survey Respondents
        _mint(msg.sender, CSURVEY, incentive, "");
        surveys[msg.sender].push(Survey(_surveyId, name, description, imageCID, encryptedCID));
        surveyMetadata[_surveyId] = SurveyMetadata(_surveyId, maxReply, incentive, msg.sender);
        emit CreateSurveyEvent(_surveyId, name, description, imageCID, encryptedCID, msg.sender);
        emit CreateSurveyMetadataEvent(_surveyId, maxReply, incentive, msg.sender);     
        _surveyId++;
    }
    //created by User who wants to participate in survey
    function createRequest(uint surveyId, address surveyAddress, string calldata description, string calldata publicKey) public {
        //returns error if duplicate request or invalid request due to token gating mechanism. 
        require(balanceOf(msg.sender, surveyId) == 0, "Duplicate request, approval outstanding");
        require(balanceOf(msg.sender, surveyId + 1) == 0, "Invalid request, survey reply outstanding");
        require(msg.sender != surveyMetadata[surveyId].owner, "Can't respond to your own survey");
        
        requests[surveyAddress].push(Request(surveyId, msg.sender, description, publicKey));
        emit CreateRequestEvent(surveyId, msg.sender, description, publicKey);
    }
    //Survey creator reencrypted CID using public key to pass to user who requested it
    //Create an NFT that acts as token gate.
    function createPermission(uint surveyId, address requestAddress, string calldata encryptedCID) public {
        require(msg.sender == surveyMetadata[surveyId].owner, "Not Survey creator, can't approve");
        permissions[requestAddress].push(Permission(surveyId, requestAddress, encryptedCID));
        emit CreatePermissionEvent(surveyId, requestAddress, encryptedCID);
    }

    //Submit SurveyReply and CSURVEY token allocated are approved are transferred to msg.sender
    function submitSurveyReply(uint surveyId, address surveyAddress, string calldata encryptedCID) public {
        //token gating check for reply
        require(balanceOf(msg.sender, surveyId) == 0, "Already participated in survey.");
        uint incentive = surveyMetadata[surveyId].incentive / surveyMetadata[surveyId].maxReply;
        surveyReplies[msg.sender].push(SurveyReply(surveyId, incentive, encryptedCID, msg.sender));
        //survey toll gate nft
        _mint(msg.sender, surveyId, 1, "");
        _mint(msg.sender, CSURVEY, incentive, "");
        _burn(surveyAddress, CSURVEY, incentive);
        emit SubmitSurveyReplyEvent(surveyId, incentive, encryptedCID, msg.sender);
    }
    

    

}