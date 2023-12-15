// FILEPATH: /c:/Users/alexa/Documents/Alexandre/Code/express-sequelize-adminjs-swagger/tests/routes.spec.ts
import request from 'supertest'
import { expect } from 'chai'
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

let token: string

describe('GET /users/current', () => {
    before(async () => {
        const res = await request(app).post('/auth/login').send({
            email: testUser.email,
            password: testUser.password,
        })
        token = res.body.token
    })

    it('should return current user', async () => {
        const res = await request(app)
            .get('/users/current')
            .set('Authorization', `Bearer ${token}`)

        expect(res.statusCode).equal(200)
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
        expect(res.body).to.have.property('deletedAt')
    })

    it('should return 401', async () => {
        const res = await request(app).get('/users/current')

        expect(res.statusCode).equal(401)
    })
})
