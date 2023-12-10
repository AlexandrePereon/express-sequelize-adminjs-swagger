/* eslint-disable @typescript-eslint/no-misused-promises */
import express from 'express'
import swaggerJsdoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'
import { authController } from './controllers/authController'
import { usersController } from './controllers/userController'
import { ensureAuth } from './middlewares/auth'

const router = express.Router()
const serverUrl = process.env.API_HOST
const serverPort = process.env.API_PORT

// Swagger definition
const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Express API with Swagger',
            version: '1.0.0',
            description: 'A sample API',
        },
        servers: [
            {
                url: `http://${serverUrl}:${serverPort}`,
            },
        ],
    },
    // Path to the API docs
    apis: ['./src/routes.ts'],
}
const swaggerSpec = swaggerJsdoc(swaggerOptions)
router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     BearerAuth:
 *       type: apiKey
 *       in: header
 *       name: Authorization
 *       description: Use a valid JWT token with the 'Bearer' prefix for authentication.
 */

// Routes

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     description: Endpoint to register a new user.
 *     tags:
 *       - Authentication
 *     requestBody:
 *       description: User registration data
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               phone:
 *                 type: string
 *               birth:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             required:
 *               - firstName
 *               - lastName
 *               - phone
 *               - birth
 *               - email
 *               - password
 *     responses:
 *       '201':
 *         description: User successfully registered
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 firstName:
 *                   type: string
 *                 lastName:
 *                   type: string
 *                 phone:
 *                   type: string
 *                 birth:
 *                   type: string
 *                 email:
 *                   type: string
 *                 role:
 *                   type: string
 *               required:
 *                 - id
 *                 - firstName
 *                 - lastName
 *                 - phone
 *                 - birth
 *                 - email
 *                 - role
 *       '400':
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *               required:
 *                 - message
 */
router.post('/auth/register', authController.register)

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login and get authentication token
 *     description: Endpoint to authenticate a user and obtain a token.
 *     tags:
 *       - Authentication
 *     requestBody:
 *       description: User login credentials
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             required:
 *               - email
 *               - password
 *     responses:
 *       '200':
 *         description: User successfully authenticated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 authenticated:
 *                   type: boolean
 *                 id:
 *                   type: string
 *                 firstName:
 *                   type: string
 *                 email:
 *                   type: string
 *                 token:
 *                   type: string
 *               required:
 *                 - authenticated
 *                 - id
 *                 - firstName
 *                 - email
 *                 - token
 *       '400':
 *         description: Bad request or validation error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *               required:
 *                 - message
 *       '401':
 *         description: Unauthorized - Incorrect password or user not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *               required:
 *                 - message
 *       '404':
 *         description: Not Found - E-mail not registered
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *               required:
 *                 - message
 */
router.post('/auth/login', authController.login)

/**
 * @swagger
 * /users/current:
 *   put:
 *     summary: Update current user profile
 *     description: Endpoint to update the profile of the currently authenticated user.
 *     tags:
 *       - Users
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       description: User profile update data
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               phone:
 *                 type: string
 *               email:
 *                 type: string
 *               birth:
 *                 type: string
 *             required:
 *               - firstName
 *               - lastName
 *               - phone
 *               - email
 *               - birth
 *     responses:
 *       '200':
 *         description: User profile successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 firstName:
 *                   type: string
 *                 lastName:
 *                   type: string
 *                 phone:
 *                   type: string
 *                 email:
 *                   type: string
 *                 birth:
 *                   type: string
 *               required:
 *                 - id
 *                 - firstName
 *                 - lastName
 *                 - phone
 *                 - email
 *                 - birth
 *       '400':
 *         description: Bad request or validation error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *               required:
 *                 - message
 *       '401':
 *         description: Unauthorized - Authentication token missing or invalid
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *               required:
 *                 - message
 */
router.put('/users/current', ensureAuth, usersController.update)
/**
 * @swagger
 * /users/current/password:
 *   put:
 *     summary: Update current user password
 *     description: Endpoint to update the password of the currently authenticated user.
 *     tags:
 *       - Users
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       description: User password update data
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               currentPassword:
 *                 type: string
 *               newPassword:
 *                 type: string
 *             required:
 *               - currentPassword
 *               - newPassword
 *     responses:
 *       '204':
 *         description: Password successfully updated
 *       '400':
 *         description: Bad request or validation error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *               required:
 *                 - message
 *       '401':
 *         description: Unauthorized - Authentication token missing or invalid
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *               required:
 *                 - message
 */
router.put(
    '/users/current/password',
    ensureAuth,
    usersController.updatePassword,
)

/**
 * @swagger
 * /users/current:
 *   get:
 *     summary: Get current user profile
 *     description: Endpoint to retrieve the profile of the currently authenticated user.
 *     tags:
 *       - Users
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       '200':
 *         description: Current user profile successfully retrieved
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 firstName:
 *                   type: string
 *                 lastName:
 *                   type: string
 *                 phone:
 *                   type: string
 *                 email:
 *                   type: string
 *                 birth:
 *                   type: string
 *               required:
 *                 - id
 *                 - firstName
 *                 - lastName
 *                 - phone
 *                 - email
 *                 - birth
 *       '400':
 *         description: Bad request or validation error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *               required:
 *                 - message
 *       '401':
 *         description: Unauthorized - Authentication token missing or invalid
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *               required:
 *                 - message
 */
router.get('/users/current', ensureAuth, usersController.show)

export { router }
