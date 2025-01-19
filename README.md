# Blog API Project

This is a simple Blog API application built with Node.js, Express, PostgreSQL, and JWT authentication.

## Features

- User registration and login
- JWT-based authentication for accessing protected routes
- CRUD (Create, Read, Update, Delete) operations for posts
- Pagination support for listing posts

## Tech Stack

- **Node.js**: JavaScript runtime environment
- **Express.js**: Web framework for Node.js
- **PostgreSQL**: Relational database for storing user and post data
- **JWT**: JSON Web Token for authentication
- **Bcrypt.js**: Password hashing
- **Joi**: Data validation

## Setup

### Prerequisites

- Node.js
- PostgreSQL

### Steps

1. Clone the repository:

   ```bash
   git clone https://github.com/alvianainh/blog-api.git   cd blog-api
   ```


2. Install dependencies
    ```bash
    npm install
    ```

3. Set up PostgreSQL database
    - Create a database (e.g., blog_db) and configure it in the .env file.
    - Run migrations to create the necessary tables for users and posts.

4. Create a .env file in the root directory with the following content:
    ```bash
    PG_USER=your_postgresql_user
    PG_HOST=localhost
    PG_DATABASE=blog_db
    PG_PASSWORD=your_postgresql_password
    PG_PORT=5432
    JWT_SECRET=your_jwt_secret_key
    ```

5. Start the server
    ```bash
    npm start
    ```

    And the server will run on http://localhost:5000 by default.

### API Endpoints

1. Authentication Routes 
    ```bash
    POST /auth/register: Register a new user
    POST /auth/login: Log in and receive a JWT token
    GET /auth/profile: Get the authenticated user's profile
    ```

2. Post Routes
    ```bash
    POST /items: Create a new post (protected route)
    GET /items: Get all posts (pagination supported)
    GET /items/:id: Get a single post by ID
    PUT /items/:id: Update a post by ID (protected route)
    DELETE /items/:id: Delete a post by ID (protected route)
    ```

### Example Usage


1. Register a User
    ```bash
    POST /auth/register
    {
    "email": "user@example.com",
    "password": "password123",
    "name": "Taylor Swift"
    }
    ```
    This endpoint is used to register a new user. You need to provide the user's email, password, and name in the request body. Once the registration is successful, the server will typically store the user's information and return a confirmation response, such as a success message or a newly created user ID.

2. Login 

    ```bash
    POST /auth/login
    {
    "email": "user@example.com",
    "password": "password123"
    }
    ```
    This endpoint allows a registered user to log in. By providing their email and password, the server will validate the credentials. If valid, the server returns a JSON Web Token (JWT) or a similar authentication token that the user can use to access protected endpoints.

3. Create a Post (Authenticated)
    ```bash
    POST /items
    Authorization: Bearer <your_jwt_token>
    {
    "title": "New Post",
    "content": "This is a new post"
    }
    ```
    This endpoint is used to create a new post. It requires the user to be authenticated by including a valid JWT in the Authorization header. The request body should contain the title and content of the post. If the token is valid, the server will create the post and respond with its details, such as the post ID or a success message.


4. Get All Post (Pagination)
    ```bash 
    GET /items?page=1&limit=10
    ```
    This endpoint retrieves a paginated list of posts. The query parameters page and limit specify the page number and the number of posts per page, respectively. For example, page=1&limit=10 retrieves the first 10 posts. This is useful for handling large datasets efficiently.

5. Get Post by ID
    ```bash
    GET /items/:id
    ```
    This endpoint fetches the details of a specific post by its unique ID. Replace :id with the actual post ID you want to retrieve. The server responds with the post's data, such as its title, content, and other metadata.


6. Update Post
    ```bash
    PUT /items/:id
    Authorization: Bearer <your_jwt_token>
    {
    "title": "Updated Post",
    "content": "Updated content of the post"
    }
    ```
    This endpoint updates an existing post by its ID. It requires authentication via a JWT token in the Authorization header. The request body should include the updated title and content for the post. If the token is valid and the post exists, the server updates the post and returns the updated information.


7. Delete Post
    ```bash
    DELETE /items/:id
    Authorization: Bearer <your_jwt_token>
    ```
    This endpoint deletes a specific post by its ID. Authentication is required by providing a JWT token in the Authorization header. If the token is valid and the post exists, the server deletes the post and typically responds with a success message or a confirmation of deletion.
