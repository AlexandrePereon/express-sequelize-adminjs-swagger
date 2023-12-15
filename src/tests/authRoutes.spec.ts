// FILEPATH: /c:/Users/alexa/Documents/Alexandre/Code/express-sequelize-adminjs-swagger/tests/routes.spec.ts
import request from 'supertest'
import { expect } from 'chai'
import { User } from '../models'
import { before } from 'mocha'
import { app } from '../server'

const testUser = {
    firstName: 'Test',
    lastName: 'User',
    phone: '000-0000',
    birth: '1990-01-01',
    email: 'testuser@email.com',
    password: '123456',
}

describe('POST /auth/register', () => {
    // delete test user
    before(async () => {
        await User.destroy({
            where: { email: testUser.email },
            force: true,
        })
    })

    it('should register a new user', async () => {
        const res = await request(app).post('/auth/register').send(testUser)

        expect(res.statusCode).equal(201)
        expect(res.body).to.have.property('id')
        expect(res.body).to.have.property('firstName')
        expect(res.body).to.have.property('lastName')
        expect(res.body).to.have.property('phone')
        expect(res.body).to.have.property('birth')
        expect(res.body).to.have.property('email')
        expect(res.body).to.have.property('password')
        expect(res.body).to.have.property('role')
        expect(res.body).to.have.property('updatedAt')
        expect(res.body).to.have.property('createdAt')
    })

    it('should return 409 if email already exists', async () => {
        const res = await request(app).post('/auth/register').send(testUser)

        expect(res.statusCode).equal(409)
    })
})

describe('POST /auth/login', () => {
    it('should authenticate a user and return a token', async () => {
        const res = await request(app).post('/auth/login').send({
            email: testUser.email,
            password: testUser.password,
        })

        expect(res.statusCode).equal(200)
        expect(res.body).to.have.property('authenticated')
        expect(res.body).to.have.property('id')
        expect(res.body).to.have.property('firstName')
        expect(res.body).to.have.property('email')
        expect(res.body).to.have.property('token')
    })

    it('should return 404 if email is not found', async () => {
        const res = await request(app).post('/auth/login').send({
            email: 'fake@email.com',
            password: testUser.password,
        })

        expect(res.statusCode).equal(404)
    })
})
