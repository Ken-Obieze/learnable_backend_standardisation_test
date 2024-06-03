# KryptoniteApp API Documentation

## Base URL
```
http://localhost:3000
```
## Authentication and User Management
Register a Kryptonian
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
