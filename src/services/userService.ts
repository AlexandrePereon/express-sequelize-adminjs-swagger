import { User } from '../models'
import { type UserCreationAttributes } from '../models/User'

export const userService = {
    findByEmail: async (email: string) => {
        const user = await User.findOne({
            where: {
                email,
            },
        })
        return user
    },

    create: async (attributes: UserCreationAttributes) => {
        const user = await User.create(attributes)

        return user
    },

    update: async (
        id: number,
        attributes: {
            firstName: string
            lastName: string
            phone: string
            birth: Date
            email: string
        },
    ) => {
        const [, updatedUsers] = await User.update(attributes, {
            where: { id },
            returning: true,
            fields: ['firstName', 'lastName', 'phone', 'birth', 'email'],
        })

        return updatedUsers[0]
    },

    updatePassword: async (id: number, password: string) => {
        const [, updatedUsers] = await User.update(
            { password },
            {
                where: { id },
                returning: true,
                individualHooks: true,
                fields: ['password'],
            },
        )

        return updatedUsers[0]
    },
}
