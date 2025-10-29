Postman Request/Response screenshots (text exports)
===============================================

This document contains copy-paste-ready examples that replicate the Postman requests and their expected responses. Use these in your assignment submission if you can't attach live screenshots.

1) Register (POST /api/auth/register)

Request
-------
POST http://localhost:5000/api/auth/register
Content-Type: application/json

Body
----
{
  "name": "Admin",
  "email": "admin@example.com",
  "password": "password123"
}

Expected Response (201/200)
---------------------------
{
  "token": "<JWT_TOKEN>",
  "user": { "id": "<id>", "name": "Admin", "email": "admin@example.com" }
}

2) Login (POST /api/auth/login)

Request
-------
POST http://localhost:5000/api/auth/login
Content-Type: application/json

Body
----
{
  "email": "admin@example.com",
  "password": "password123"
}

Expected Response (200)
-----------------------
{
  "token": "<JWT_TOKEN>",
  "user": { "id": "<id>", "name": "Admin", "email": "admin@example.com" }
}

3) Create Contact (POST /api/contacts)

Request
-------
POST http://localhost:5000/api/contacts
Content-Type: application/json

Body
----
{
  "firstname": "Aditya",
  "lastname": "Shoor",
  "email": "aditya@example.com",
  "message": "Hello from Postman"
}

Expected Response (201)
-----------------------
{
  "_id": "<contact_id>",
  "firstname": "Aditya",
  "lastname": "Shoor",
  "email": "aditya@example.com",
  "message": "Hello from Postman",
  "createdAt": "2025-10-28T...",
  "updatedAt": "2025-10-28T...",
  "__v": 0
}

4) Get Contacts (GET /api/contacts) — requires auth for full list in Admin UI

Request
-------
GET http://localhost:5000/api/contacts
Authorization: Bearer <JWT_TOKEN>

Expected Response (200)
-----------------------
[
  {
    "_id": "<contact_id>",
    "firstname": "Aditya",
    "lastname": "Shoor",
    "email": "aditya@example.com",
    "message": "Hello from Postman",
    "createdAt": "2025-10-28T...",
    "updatedAt": "2025-10-28T...",
    "__v": 0
  }
]

5) Delete All Contacts (DELETE /api/contacts)

Request
-------
DELETE http://localhost:5000/api/contacts
Authorization: Bearer <JWT_TOKEN>

Expected Response (200)
-----------------------
{ "message": "All contacts deleted" }

How to capture real screenshots locally
--------------------------------------
1. Import `docs/postman_collection.json` into Postman.
2. Run Register, then Login. Copy the returned `token`.
3. In Postman, create a new environment variable `token` and set `{{token}}` to the token value.
4. Use the `Authorization: Bearer {{token}}` header for protected requests.
5. Use the Postman UI to take screenshots of the request panels and responses and attach them to your assignment.

If you want, I can generate PNG placeholders showing these request/response examples and commit them into `docs/` — say "generate PNGs" and I'll add them.

Screenshots (placeholders)
--------------------------
I generated simple SVG placeholders that show the request and expected response for the main flows. You can find them here:

- `docs/screenshots/postman_register.svg`
- `docs/screenshots/postman_login.svg`
- `docs/screenshots/postman_get_contacts.svg`

They are SVGs (scalable and viewable in the browser). If you specifically need PNG files I can convert them and add PNGs instead; tell me "create PNGs" and I'll produce PNG files.
