import { ErrorCode, SubError, SwpError, SubErrorCode } from './error'
import { ExternalService } from './external-services'

const newTrioError = (
	code: ErrorCode,
	message: string,
	subErrors: SubError[] = []
): SwpError => ({
	name: code,
	message,
	code,
	subErrors,
})

export const newNotFound = (subErrors?: SubError[]) =>
	newTrioError(ErrorCode.NotFound, 'Resource not found.', subErrors)

export const newEmptyList = (subErrors?: SubError[]) =>
	newTrioError(ErrorCode.ValidationError, 'Empty list.', subErrors)

export const newMailchipEmptyAudianceList = (): SwpError =>
	newEmptyList([
		{
			code: SubErrorCode.EMPTY_LIST,
			msg: 'The audience list is empty.',
		},
	])

export const newExternalServiceError = (
	service: ExternalService,
	msg: string,
	errorCode: ErrorCode = ErrorCode.ExternalServerError
) =>
	newTrioError(
		errorCode,
		`An unexpected error occurred with the service. ${service}.`,
		[
			{
				code: SubErrorCode.EXTERNAL_SERVICE,
				msg,
			},
		]
	)
