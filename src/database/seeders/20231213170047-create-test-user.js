'use strict'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const bcrypt = require('bcrypt')
const email = 'testuser@email.com'

module.exports = {
    async up(queryInterface, Sequelize) {
        const hashedPassword = await bcrypt.hash('123456', 10)

        await queryInterface.bulkInsert('users', [
            {
                first_name: 'Test',
                last_name: 'User',
                phone: '000-0000',
                birth: '1990-01-01',
                email,
                password: hashedPassword,
                role: 'user',
                created_at: new Date(),
                updated_at: new Date(),
            },
        ])
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('users', null, {
            where: { email },
        })
    },
}
