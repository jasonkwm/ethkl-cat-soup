import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt, Bytes } from "@graphprotocol/graph-ts"
import {
  ApprovalForAll,
  CreatePermissionEvent,
  CreateRequestEvent,
  CreateSurveyEvent,
  CreateSurveyMetadataEvent,
  RoleAdminChanged,
  RoleGranted,
  RoleRevoked,
  SubmitSurveyReplyEvent,
  TransferBatch,
  TransferSingle,
  URI
} from "../generated/CryptoSurvey/CryptoSurvey"

export function createApprovalForAllEvent(
  account: Address,
  operator: Address,
  approved: boolean
): ApprovalForAll {
  let approvalForAllEvent = changetype<ApprovalForAll>(newMockEvent())

  approvalForAllEvent.parameters = new Array()

  approvalForAllEvent.parameters.push(
    new ethereum.EventParam("account", ethereum.Value.fromAddress(account))
  )
  approvalForAllEvent.parameters.push(
    new ethereum.EventParam("operator", ethereum.Value.fromAddress(operator))
  )
  approvalForAllEvent.parameters.push(
    new ethereum.EventParam("approved", ethereum.Value.fromBoolean(approved))
  )

  return approvalForAllEvent
}

export function createCreatePermissionEventEvent(
  surveyId: BigInt,
  requestAddress: Address,
  encryptedCID: string
): CreatePermissionEvent {
  let createPermissionEventEvent = changetype<CreatePermissionEvent>(
    newMockEvent()
  )

  createPermissionEventEvent.parameters = new Array()

  createPermissionEventEvent.parameters.push(
    new ethereum.EventParam(
      "surveyId",
      ethereum.Value.fromUnsignedBigInt(surveyId)
    )
  )
  createPermissionEventEvent.parameters.push(
    new ethereum.EventParam(
      "requestAddress",
      ethereum.Value.fromAddress(requestAddress)
    )
  )
  createPermissionEventEvent.parameters.push(
    new ethereum.EventParam(
      "encryptedCID",
      ethereum.Value.fromString(encryptedCID)
    )
  )

  return createPermissionEventEvent
}

export function createCreateRequestEventEvent(
  surveyId: BigInt,
  requestAddress: Address,
  description: string,
  publicKey: string
): CreateRequestEvent {
  let createRequestEventEvent = changetype<CreateRequestEvent>(newMockEvent())

  createRequestEventEvent.parameters = new Array()

  createRequestEventEvent.parameters.push(
    new ethereum.EventParam(
      "surveyId",
      ethereum.Value.fromUnsignedBigInt(surveyId)
    )
  )
  createRequestEventEvent.parameters.push(
    new ethereum.EventParam(
      "requestAddress",
      ethereum.Value.fromAddress(requestAddress)
    )
  )
  createRequestEventEvent.parameters.push(
    new ethereum.EventParam(
      "description",
      ethereum.Value.fromString(description)
    )
  )
  createRequestEventEvent.parameters.push(
    new ethereum.EventParam("publicKey", ethereum.Value.fromString(publicKey))
  )

  return createRequestEventEvent
}

export function createCreateSurveyEventEvent(
  surveyId: BigInt,
  name: string,
  description: string,
  imageCID: string,
  encryptedCID: string,
  surveyAddress: Address
): CreateSurveyEvent {
  let createSurveyEventEvent = changetype<CreateSurveyEvent>(newMockEvent())

  createSurveyEventEvent.parameters = new Array()

  createSurveyEventEvent.parameters.push(
    new ethereum.EventParam(
      "surveyId",
      ethereum.Value.fromUnsignedBigInt(surveyId)
    )
  )
  createSurveyEventEvent.parameters.push(
    new ethereum.EventParam("name", ethereum.Value.fromString(name))
  )
  createSurveyEventEvent.parameters.push(
    new ethereum.EventParam(
      "description",
      ethereum.Value.fromString(description)
    )
  )
  createSurveyEventEvent.parameters.push(
    new ethereum.EventParam("imageCID", ethereum.Value.fromString(imageCID))
  )
  createSurveyEventEvent.parameters.push(
    new ethereum.EventParam(
      "encryptedCID",
      ethereum.Value.fromString(encryptedCID)
    )
  )
  createSurveyEventEvent.parameters.push(
    new ethereum.EventParam(
      "surveyAddress",
      ethereum.Value.fromAddress(surveyAddress)
    )
  )

  return createSurveyEventEvent
}

export function createCreateSurveyMetadataEventEvent(
  surveyId: BigInt,
  maxReply: BigInt,
  incentive: BigInt,
  owner: Address
): CreateSurveyMetadataEvent {
  let createSurveyMetadataEventEvent = changetype<CreateSurveyMetadataEvent>(
    newMockEvent()
  )

  createSurveyMetadataEventEvent.parameters = new Array()

  createSurveyMetadataEventEvent.parameters.push(
    new ethereum.EventParam(
      "surveyId",
      ethereum.Value.fromUnsignedBigInt(surveyId)
    )
  )
  createSurveyMetadataEventEvent.parameters.push(
    new ethereum.EventParam(
      "maxReply",
      ethereum.Value.fromUnsignedBigInt(maxReply)
    )
  )
  createSurveyMetadataEventEvent.parameters.push(
    new ethereum.EventParam(
      "incentive",
      ethereum.Value.fromUnsignedBigInt(incentive)
    )
  )
  createSurveyMetadataEventEvent.parameters.push(
    new ethereum.EventParam("owner", ethereum.Value.fromAddress(owner))
  )

  return createSurveyMetadataEventEvent
}

export function createRoleAdminChangedEvent(
  role: Bytes,
  previousAdminRole: Bytes,
  newAdminRole: Bytes
): RoleAdminChanged {
  let roleAdminChangedEvent = changetype<RoleAdminChanged>(newMockEvent())

  roleAdminChangedEvent.parameters = new Array()

  roleAdminChangedEvent.parameters.push(
    new ethereum.EventParam("role", ethereum.Value.fromFixedBytes(role))
  )
  roleAdminChangedEvent.parameters.push(
    new ethereum.EventParam(
      "previousAdminRole",
      ethereum.Value.fromFixedBytes(previousAdminRole)
    )
  )
  roleAdminChangedEvent.parameters.push(
    new ethereum.EventParam(
      "newAdminRole",
      ethereum.Value.fromFixedBytes(newAdminRole)
    )
  )

  return roleAdminChangedEvent
}

export function createRoleGrantedEvent(
  role: Bytes,
  account: Address,
  sender: Address
): RoleGranted {
  let roleGrantedEvent = changetype<RoleGranted>(newMockEvent())

  roleGrantedEvent.parameters = new Array()

  roleGrantedEvent.parameters.push(
    new ethereum.EventParam("role", ethereum.Value.fromFixedBytes(role))
  )
  roleGrantedEvent.parameters.push(
    new ethereum.EventParam("account", ethereum.Value.fromAddress(account))
  )
  roleGrantedEvent.parameters.push(
    new ethereum.EventParam("sender", ethereum.Value.fromAddress(sender))
  )

  return roleGrantedEvent
}

export function createRoleRevokedEvent(
  role: Bytes,
  account: Address,
  sender: Address
): RoleRevoked {
  let roleRevokedEvent = changetype<RoleRevoked>(newMockEvent())

  roleRevokedEvent.parameters = new Array()

  roleRevokedEvent.parameters.push(
    new ethereum.EventParam("role", ethereum.Value.fromFixedBytes(role))
  )
  roleRevokedEvent.parameters.push(
    new ethereum.EventParam("account", ethereum.Value.fromAddress(account))
  )
  roleRevokedEvent.parameters.push(
    new ethereum.EventParam("sender", ethereum.Value.fromAddress(sender))
  )

  return roleRevokedEvent
}

export function createSubmitSurveyReplyEventEvent(
  surveyId: BigInt,
  incentive: BigInt,
  encryptedCID: string,
  replyAddress: Address
): SubmitSurveyReplyEvent {
  let submitSurveyReplyEventEvent = changetype<SubmitSurveyReplyEvent>(
    newMockEvent()
  )

  submitSurveyReplyEventEvent.parameters = new Array()

  submitSurveyReplyEventEvent.parameters.push(
    new ethereum.EventParam(
      "surveyId",
      ethereum.Value.fromUnsignedBigInt(surveyId)
    )
  )
  submitSurveyReplyEventEvent.parameters.push(
    new ethereum.EventParam(
      "incentive",
      ethereum.Value.fromUnsignedBigInt(incentive)
    )
  )
  submitSurveyReplyEventEvent.parameters.push(
    new ethereum.EventParam(
      "encryptedCID",
      ethereum.Value.fromString(encryptedCID)
    )
  )
  submitSurveyReplyEventEvent.parameters.push(
    new ethereum.EventParam(
      "replyAddress",
      ethereum.Value.fromAddress(replyAddress)
    )
  )

  return submitSurveyReplyEventEvent
}

export function createTransferBatchEvent(
  operator: Address,
  from: Address,
  to: Address,
  ids: Array<BigInt>,
  values: Array<BigInt>
): TransferBatch {
  let transferBatchEvent = changetype<TransferBatch>(newMockEvent())

  transferBatchEvent.parameters = new Array()

  transferBatchEvent.parameters.push(
    new ethereum.EventParam("operator", ethereum.Value.fromAddress(operator))
  )
  transferBatchEvent.parameters.push(
    new ethereum.EventParam("from", ethereum.Value.fromAddress(from))
  )
  transferBatchEvent.parameters.push(
    new ethereum.EventParam("to", ethereum.Value.fromAddress(to))
  )
  transferBatchEvent.parameters.push(
    new ethereum.EventParam("ids", ethereum.Value.fromUnsignedBigIntArray(ids))
  )
  transferBatchEvent.parameters.push(
    new ethereum.EventParam(
      "values",
      ethereum.Value.fromUnsignedBigIntArray(values)
    )
  )

  return transferBatchEvent
}

export function createTransferSingleEvent(
  operator: Address,
  from: Address,
  to: Address,
  id: BigInt,
  value: BigInt
): TransferSingle {
  let transferSingleEvent = changetype<TransferSingle>(newMockEvent())

  transferSingleEvent.parameters = new Array()

  transferSingleEvent.parameters.push(
    new ethereum.EventParam("operator", ethereum.Value.fromAddress(operator))
  )
  transferSingleEvent.parameters.push(
    new ethereum.EventParam("from", ethereum.Value.fromAddress(from))
  )
  transferSingleEvent.parameters.push(
    new ethereum.EventParam("to", ethereum.Value.fromAddress(to))
  )
  transferSingleEvent.parameters.push(
    new ethereum.EventParam("id", ethereum.Value.fromUnsignedBigInt(id))
  )
  transferSingleEvent.parameters.push(
    new ethereum.EventParam("value", ethereum.Value.fromUnsignedBigInt(value))
  )

  return transferSingleEvent
}

export function createURIEvent(value: string, id: BigInt): URI {
  let uriEvent = changetype<URI>(newMockEvent())

  uriEvent.parameters = new Array()

  uriEvent.parameters.push(
    new ethereum.EventParam("value", ethereum.Value.fromString(value))
  )
  uriEvent.parameters.push(
    new ethereum.EventParam("id", ethereum.Value.fromUnsignedBigInt(id))
  )

  return uriEvent
}
