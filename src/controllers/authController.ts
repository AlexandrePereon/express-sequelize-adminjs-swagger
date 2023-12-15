import { type Request, type Response } from 'express'
import { jwtService } from '../services/jwtService'
import { userService } from '../services/userService'

export const authController = {
    // POST /auth/register
    register: async (req: Request, res: Response) => {
        const { firstName, lastName, phone, birth, email, password } = req.body

        try {
            const userAlreadyExists = await userService.findByEmail(email)

            if (userAlreadyExists !== null && userAlreadyExists !== undefined) {
                return res
                    .status(409)
                    .json({ message: 'This e-mail is already registered.' })
            }

            const user = await userService.create({
                firstName,
                lastName,
                phone,
                birth,
                email,
                password,
                role: 'user',
            })

            return res.status(201).json(user)
        } catch (err) {
            if (err instanceof Error) {
                return res.status(400).json({ message: err.message })
            }
        }
    },

    // POST /auth/login
    login: async (req: Request, res: Response) => {
        const { email, password } = req.body

        try {
            const user = await userService.findByEmail(email)

            if (user === null || user === undefined)
                return res
                    .status(404)
                    .json({ message: 'E-mail not registered.' })

            user.checkPassword(password, (err, isSame) => {
                if (err instanceof Error)
                    return res.status(400).json({ message: err?.message })

                if (isSame === null || isSame === undefined)
                    return res
                        .status(401)
                        .json({ message: 'Incorrect password' })

                const payload = {
                    id: user.id,
                    firstName: user.firstName,
                    email: user.email,
                }

                const token = jwtService.signPayload(payload)

                return res.json({ authenticated: true, ...payload, token })
            })
        } catch (err) {
            if (err instanceof Error) {
                return res.status(400).json({ message: err.message })
            }
        }
    },
}
