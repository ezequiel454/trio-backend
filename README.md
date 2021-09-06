# Trio-Backend

A microservice to sync contacts from mailchimp to firebase or sendgrid.

## Table of Contents

- [Production URL](#production-url)
- [Technology](#technology)
- [Developing](#developing)
  - [First Install](#first-install)
- [Technical Design](#technical-design)
  - [Project Structure](#project-structure)
- [Data Flow](#data-flow)
- [Next Steps](#next-steps)

## Production URL

`https://trio-backend-dev-zeke.herokuapp.com`

## Technology

Here's a brief overview of our technology stack:

- **[Express](https://github.com/expressjs/express)** as a tool to build the web server that handles our api endpoints.

- **[Firebase](https://firebase.google.com/)** as to store our data

- **[Heroku](https://heroku.com)** as a service to deploy

## Developing

In order to develop for this project you must have npm and node.js installed

Version used:

`"node": "14.17.0", "npm": "7.15.1"`

First Install

If you never developed in this repo before:

1. **Clone the repository:**

```sh
$ git clone git@github.com:ezequiel454/trio-backend.git
```

2. **Install dependencies:**

```sh
$ npm i
```

### Env

Check the env.examples file to get all env necessary to run this project

### Running the server

```sh
$ npm run dev
```

## Technical Design

### Project Structure

This section will try to explain the reason why i choose this organization for this project.

1. **Structure**

```
├── src
│   ├── modules
│   │   └── contact
│   │       └── controller
│   │              └── contact.ts
│   │
│   └── shared
│       ├── infra
│       │   ├── database
│       │   │   └── firebase-connection.ts
│       │   └── http
│       │       ├── controller
│       │       │   └── sync.ts
│       │       ├── dto
│       │       │   ├── common.ts
│       │       │   ├── mailchimp.ts
│       │       │   └── sendgrid.ts
│       │       ├── error
│       │       │   ├── construtors.ts
│       │       │   ├── error.ts
│       │       │   └── external-services.ts
│       │       ├── index.ts
│       │       ├── routes
│       │       │   ├── index.ts
│       │       │   └── sync.ts
│       │       └── server.ts
│       ├── provider
│       │   ├── mailchimp
│       │   │   ├── controller
│       │   │   │   ├── get-list-audience.ts
│       │   │   │   └── get-list-id.ts
│       │   │   └── mailchimp.ts
│       │   └── sendgrid
│       │       ├── controller
│       │       │   ├── create-list.ts
│       │       │   ├── create-sendgrid-contacts.ts
│       │       │   └── get-sendgrid-list-id.ts
│       │       └── sendgrid.ts
│       └── util
│           └── axios.ts
└── tsconfig.json
```

2. **Modules**

- The modules is entity that i have in this project.
- I only had one entity that was contact thats i use to integrate with firebase

  ### Contact.ts

  - It is a function that send all contacts to firebase.
  - The choice here was to send all information in only one batch doing a merge with contacts that already exist

3. **Shared**

- Everything that it is shared beetween the project should be here

  ### Infra

  - Database its a folder that will make the connection to our database in this case firebase
  - Http its a folder that will deal with every connection with the server like routes, controller, error and dto
  - Provider it is a folder that connect ours providers in this project like mailchimp and sendgrid
  - Util its a folder that deal with usefull function like axios

  ### Firebase

  - We have a collection with name `contacts`
  - The document id it is `email`
  - Our fields is:
    - first_name
    - last_name

  The key idea it is our document id that worked like a primery key, doing this way we will avoid duplication and update a contact that have the same email

  ### Mailchimp

  - This provider have some problems that i need to decide how i was gonna treat, like the list id from the audience
  - I have 2 main function on mailchimp that it is as followings:
    - `get-list-id.ts`
      - This function get a full list of ids.
      - I dont know which list `trio` want to use so i just get the first list and respond with that id
    - `get-list-audience`
      - This function get all audience from a list passed by id and return a obj as Person

  ### Sendgrid

  - To build the sendgrid provider it is a little tricker because i dont know the list id on sendgrid that need to be insert
  - So i make some test and figure out that the name was trio but could have many others.
  - To build my service i create 3 functions to make the call to the sendgrid and it is as following:
    - `get-sendgrid-list-id.ts`
      - his job is looking for a list that have a name as `trio` if not exist call a function that create a list with that name and respond with that id.
    - `create-list.ts`
      - his job is to create a list with a name and return the id
    - `create-sendgrid-contacts.ts`
      - his job is to create a list with a name and return the id

  ### Util

  - This folder only have the `axios` file that create a baseUrl and header.
  - To create the basuUrl from axios you can passing by env or param.

  ### Server.ts

  This class have everything that express need to run like:

  - `Middlewares`
  - `Routes`
  - `Exception`

  More things can be added here to power up the express.

## Data Flow

This project have 1 server with 2 endpoints.

#### 1. GET /v1/sync/firebase

Sync the contacts from Mailchimp to Firebase and return the number of contacts sync.

**Example:**

> `GET /v1/sync/firebase`

> `200 ok`

```json
Content-Type: application/json

{
	"data": {
		"constacts": 3
	}
}
```

#### 2. GET /v1/sync/sendgrid

Sync the contacts from Mailchimp to Firebase and return the number of contacts sync.

**Example:**

> `GET /v1/sync/sendgrid`

> `200 ok`

```json
Content-Type: application/json

{
	"data": {
		"constacts": 3
	}
}
```

## Next Steps

Some considerations to improvement the api.

1. About the requests

- If we have on `mailchimp` a large data we will not get all users sync on `firebase` or `sendgrid`.
- To save a large data would be better a work process with a queue system. Just will be necessary to check the limits on the providers and build a consume queue to get by batch.

2. Code Improvement

- We can create a interface to respond like was create to threat erros.
- Added CD on github to direct deploy to heroku
