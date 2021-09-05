export interface ListSendgridDto {
	name: string
	id: string
	contact_count: string
}

export interface BasicResponse {
	data: ListSendgridDto
}

export interface BasicResultResponse {
	result: ListSendgridDto[]
}

export interface BasicListResponse {
	data: BasicResultResponse
}
