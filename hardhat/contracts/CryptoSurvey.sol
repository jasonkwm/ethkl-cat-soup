// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.27;

import { AccessControl } from "@openzeppelin/contracts/access/AccessControl.sol";
import { IAccessControl} from "@openzeppelin/contracts/access/IAccessControl.sol";
import {ERC1155} from "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import { IERC1155} from "@openzeppelin/contracts/token/ERC1155/IERC1155.sol";


contract CryptoSurvey is AccessControl, ERC1155 {
    uint private _surveyId = 1;
    uint256 public constant CSURVEY = 0;
    mapping(address=>Survey[]) public surveys;
    mapping(address=>SurveyReply[]) public surveyReplies;
    mapping(uint=>SurveyMetadata) public surveyMetadata;
    mapping(address=>Request[]) public requests;
   
    event CreateSurveyEvent(uint surveyId, string name, string description, string imageCID, string encryptedCID, address surveyAddress);
    event CreateSurveyMetadataEvent(uint surveyId, uint maxReply, uint incentive, address owner);
    
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
        // _surveyId +2 due to survey gating mechanism for request and reply
        _surveyId += 2;
    }
    

    

}