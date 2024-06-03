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
  "email": "ejiofor.obieze@gmail.com"
}
```
* Response:
```json

{
    "message": "Kryptonian registered, check your email for OTP",
    "apiKey": "c7432ef4c58658e32edb2deeeca577ba71db0b25d59bcae381f5cf9fec1f3531"
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
    "email": "ejiofor.obieze@gmail.com",
    "otp": "371278"
}
```
* Response:
```json

{
    "message": "Logged in successfully",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2NWUzMjdmYmJiZjYyMjdiM2VlMWQ5YSIsImlhdCI6MTcxNzQ0OTg0MywiZXhwIjoxNzE3NDUzNDQzfQ.EqIfQESpyazY33oFTMY0spjj3573BIhb9Kr9ZjGw6ek"
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
sample response
```json
{
  "message": "File uploaded successfully",
    "file": {
        "kryptonian": "665e327fbbbf6227b3ee1d9a",
        "filename": "Photo_1512248283765.png",
        "data": "/unW3dETsO5/wf4ph6FGBcpGQAAAABJRU5ErkJggg==....", // data was abridged
        "contentType": "image/png",
        "_id": "665e37e0bbbf6227b3ee1da1",
        "__v": 0
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
sample response
```json
{
  "file": {
    "_id": "665e37e0bbbf6227b3ee1da1",
        "kryptonian": "665e327fbbbf6227b3ee1d9a",
        "filename": "Photo_1512248283765.png",
        "data": "base64_encoded_string",
        "contentType": "image/png",
        "__v": 0
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
