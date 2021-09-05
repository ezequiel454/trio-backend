export enum ErrorCode {
	Unauthorized = 'UNAUTHORIZED',
	Forbidden = 'FORBIDDEN',
	ExternalServerError = 'EXTERNAL_SERVER_ERROR',
	ValidationError = 'BAD_REQUEST_BODY',
	NotFound = 'NOT_FOUND',
	Timeout = 'TIMEOUT',
	HeaderError = 'HEADER_ERROR',
}

export enum SubErrorCode {
	NOT_FOUND = 'NOT_FOUND',
	EMPTY_LIST = 'EMPTY_LIST',
	EXTERNAL_SERVICE = 'EXTERNAL_SERVICE',
}

export interface SubError {
	code: string
	msg: string
}

export interface SwpError extends Error {
	code: ErrorCode
	message: string
	subErrors: SubError[]
}
