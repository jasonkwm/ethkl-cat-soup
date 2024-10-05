import { store  } from '@graphprotocol/graph-ts'

import {
  ApprovalForAll as ApprovalForAllEvent,
  CreatePermissionEvent as CreatePermissionEventEvent,
  CreateRequestEvent as CreateRequestEventEvent,
  CreateSurveyEvent as CreateSurveyEventEvent,
  CreateSurveyMetadataEvent as CreateSurveyMetadataEventEvent,
  RoleAdminChanged as RoleAdminChangedEvent,
  RoleGranted as RoleGrantedEvent,
  RoleRevoked as RoleRevokedEvent,
  SubmitSurveyReplyEvent as SubmitSurveyReplyEventEvent,
  TransferBatch as TransferBatchEvent,
  TransferSingle as TransferSingleEvent,
  URI as URIEvent
} from "../generated/CryptoSurveyV1/CryptoSurveyV1"
import {
  ApprovalForAll,
  Survey,
  Request,
  Permission,
  SurveyReply,
  RoleAdminChanged,
  RoleGranted,
  RoleRevoked,
  TransferBatch,
  TransferSingle,
  URI
} from "../generated/schema"

export function handleCreateSurveyEvent(event: CreateSurveyEventEvent): void {
  let entity = Survey.load(event.params.surveyId.toHexString())
  if (entity == null)
    entity = new Survey(
      event.params.surveyId.toHexString()
  )
  entity.surveyId = event.params.surveyId
  entity.name = event.params.name
  entity.description = event.params.description
  entity.imageCID = event.params.imageCID
  entity.encryptedCID = event.params.encryptedCID
  entity.owner = event.params.surveyAddress
  entity.blockTimestamp = event.block.timestamp

  entity.save()
}

export function handleCreateSurveyMetadataEvent(
  event: CreateSurveyMetadataEventEvent
): void {
  let entity = Survey.load(event.params.surveyId.toHexString())
  if (entity == null)
    entity = new Survey(
      event.params.surveyId.toHexString()
  )
  entity.surveyId = event.params.surveyId
  entity.maxReply = event.params.maxReply
  entity.incentive = event.params.incentive
  entity.blockTimestamp = event.block.timestamp
  entity.save()
}

export function handleCreateRequestEvent(event: CreateRequestEventEvent): void {
  let entity = new Request(
    event.params.surveyId.toHexString() + event.params.requestAddress.toHexString()
  )
  entity.survey = event.params.surveyId.toHexString()
  entity.requestAddress = event.params.requestAddress
  entity.description = event.params.description
  entity.publicKey = event.params.publicKey
  entity.blockTimestamp = event.block.timestamp
  entity.save()
}

export function handleCreatePermissionEvent(
  event: CreatePermissionEventEvent
): void {
  let entity = new Permission(
    event.params.surveyId.toHexString() + event.params.requestAddress.toHexString()
  )
  store.remove('Request', event.params.surveyId.toHexString() + event.params.requestAddress.toHexString())
  entity.survey = event.params.surveyId.toHexString()
  entity.requestAddress = event.params.requestAddress
  entity.encryptedCID = event.params.encryptedCID
  entity.blockTimestamp = event.block.timestamp
  entity.save()
}

export function handleSubmitSurveyReplyEvent(
  event: SubmitSurveyReplyEventEvent
): void {
  let entity = new SurveyReply(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  store.remove('Permission', event.params.surveyId.toHexString() + event.params.replyAddress.toHexString())
  entity.survey = event.params.surveyId.toHexString()
  entity.incentive = event.params.incentive
  entity.encryptedCID = event.params.encryptedCID
  entity.replyAddress = event.params.replyAddress

  
  entity.blockTimestamp = event.block.timestamp

  entity.save()
}

export function handleApprovalForAll(event: ApprovalForAllEvent): void {
  let entity = new ApprovalForAll(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.account = event.params.account
  entity.operator = event.params.operator
  entity.approved = event.params.approved

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}






export function handleRoleAdminChanged(event: RoleAdminChangedEvent): void {
  let entity = new RoleAdminChanged(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.role = event.params.role
  entity.previousAdminRole = event.params.previousAdminRole
  entity.newAdminRole = event.params.newAdminRole

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleRoleGranted(event: RoleGrantedEvent): void {
  let entity = new RoleGranted(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.role = event.params.role
  entity.account = event.params.account
  entity.sender = event.params.sender

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleRoleRevoked(event: RoleRevokedEvent): void {
  let entity = new RoleRevoked(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.role = event.params.role
  entity.account = event.params.account
  entity.sender = event.params.sender

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}



export function handleTransferBatch(event: TransferBatchEvent): void {
  let entity = new TransferBatch(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.operator = event.params.operator
  entity.from = event.params.from
  entity.to = event.params.to
  entity.ids = event.params.ids
  entity.values = event.params.values

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleTransferSingle(event: TransferSingleEvent): void {
  let entity = new TransferSingle(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.operator = event.params.operator
  entity.from = event.params.from
  entity.to = event.params.to
 
  entity.value = event.params.value

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleURI(event: URIEvent): void {
  let entity = new URI(event.transaction.hash.concatI32(event.logIndex.toI32()))
  entity.value = event.params.value
  

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}