export interface Id {
	id: string
}

export interface ListsResponseDto {
	lists: Id[]
}

export interface Members {
	email_address: string
	full_name: string
}

export interface AudienceListResponseDto {
	members: Members[]
	total_items: number
	statusCode: number
}

export interface MembersToDto {
	email: string
}
