# KryptoniteApp

## Overview

KryptoniteApp is a futuristic application designed for the Kryptonian civilization. It includes a robust authentication system with two-factor authentication (2FA) and a file upload service that handles image files. The application leverages voice and biometric authentication details, and uses the Email service for sending OTPs.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Setup and Installation](#setup-and-installation)
- [API Endpoints](#api-endpoints)
  - [Kryptonian Registration and Authentication](#kryptonian-registration-and-authentication)
  - [File Upload Service](#file-upload-service)
  - [Accessing Images](#accessing-images)
- [Environment Variables](#environment-variables)


## Features

- Kryptonian registration with email confirmation.
- 2FA login using OTP sent via ElasticEmail.
- File upload functionality allowing only image files.
- Access to images without authentication.
- Compliance with RESTful API principles using class-based services and controllers.

## Setup and Installation

### Prerequisites

- Node.js
- MongoDB
- cors
- dotenv
- express
- jest
- jsonwebtoken
- mongodb-memory-server
- mongoose
- multer
- nodemailer
- node-cache
- supertest

### Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/Ken-Obieze/learnable_backend_standardisation_test.git
   cd kryptoniteapp
   ```

2. **Install dependencies**:

```bash
npm install
```

3. **Set up environment variables**:

Create a .env file in the root directory with the following content:

```env
PORT=xxxx
MONGO_URI=xxxx
DB_NAME=xxxx
JWT_SECRET=xxxx
EMAIL_USERNAME=xxxx
EMAIL_API_KEY=xxxx
```

4. **Start the server**:

```bash
npm start
```

### API Endpoints

Kryptonian Registration and Authentication
Base URL
```
https://kryptoniteapp-dfm6.onrender.com
```

**Register a Kryptonian**
* Endpoint: POST api/v1/auth/register
* Description: Register a new Kryptonian and send a confirmation email with an OTP.
* Request Body:
```json
{
  "email": "example@krypton.com"
}
```

* Response:
```json
{
  "message": "Kryptonian registered, check your email for OTP",
  "apiKey": "generated_api_key"
}
```

**Confirm Email**

* Endpoint: POST api/v1/auth/confirm-email
* Description: Confirm the email using the OTP sent.
* Request Body:
```json
{
  "email": "example@krypton.com",
  "otp": "123456"
}
```

* Response:
```json
{
  "message": "Email confirmed, you can log in now"
}
```

**Login**

* Endpoint: POST api/v1/auth/login
* Description: Log in using the OTP sent via email.
* Request Body:
```json
{
  "email": "example@krypton.com",
  "otp": "123456"
}
```

* Response:
```json
{
  "message": "Logged in successfully",
  "token": "jwt_token"
}
```

**Verify Login**

* Endpoint: POST api/v1/auth/verify-login
* Description: Log in using the OTP sent via email.
* Request Body:
```json
{
  "email": "example@krypton.com",
  "otp": "123456"
}
```

* Response:
```json
{
  "message": "Logged in successfully",
  "token": "jwt_token"
}
```

**File Upload Service**

Upload File
* Endpoint: POST api/v1/files/upload
* Description: Upload an image file.
* Headers:
```makefile

x-api-key: your_api_key_here
```
* Body (form-data):
```

file: (select an image file)
```
* Response:
```json

{
  "message": "File uploaded successfully",
  "file": {
    "_id": "file_id",
    "kryptonian": "kryptonian_id",
    "filename": "image.jpg",
    "data": "base64_encoded_string",
    "contentType": "image/jpeg"
  }
}
```

**Accessing Images**

Get File by ID
* Endpoint: GET api/v1/files/:id
* Description: Retrieve a specific image file by its ID.
* Response:
```json
{
  "file": {
    "_id": "file_id",
    "kryptonian": "kryptonian_id",
    "filename": "image.jpg",
    "data": "base64_encoded_string",
    "contentType": "image/jpeg"
  }
}
```

Get All Files

* Endpoint: GET api/v1/files
* Description: Retrieve all image files.
* Response:
```json
{
  "files": [
    {
      "_id": "file_id",
      "kryptonian": "kryptonian_id",
      "filename": "image.jpg",
      "data": "base64_encoded_string",
      "contentType": "image/jpeg"
    },
    {
      "_id": "another_file_id",
      "kryptonian": "kryptonian_id",
      "filename": "another_image.png",
      "data": "another_base64_encoded_string",
      "contentType": "image/png"
    }
  ]
}
```

### Environment Variables

The application requires the following environment variables:

* PORT: The port on which the server will run.
* MONGO_URI: The MongoDB connection string.
* JWT_SECRET: The secret key for JWT token generation.
* DB_NAME: Collection Name.
* JWT_SECRET: A secrete for JWT.
* EMAIL_USERNAME: Host email address.
* EMAIL_API_KEY: Application password or password to the email.
