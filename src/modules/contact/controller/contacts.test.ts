// import { createContact } from './contact'
// import * as admin from 'firebase-admin'
// import { credential, firestore } from 'firebase-admin'

// // jest.mock('firebase', () => ({
// // 	...[jest.requireActual('firebase')],
// // 	batch: jest.fn(),
// // }))

// jest.mock('firebase-admin', () => ({
// 	...jest.mock('firebase-admin'),
// 	credential: {
// 		cert: jest.fn(),
// 	},
// 	initializeApp: jest.fn(),
// 	firestore: jest.fn(),
// }))

// beforeEach(() => {
// 	admin.firestore: jest.fn()
// })

// test('non existing tables', async () => {
// 	const result = createContact([
// 		{ email: 'string', first_name: 'string', last_name: 'string' },
// 	])
// 	expect(result).toBe(1)
// })
