/* eslint-disable @typescript-eslint/no-misused-promises */
import { type Response } from 'express'
import { type AuthenticatedRequest } from '../middlewares/auth'
import { userService } from '../services/userService'

export const usersController = {
    // GET / users/current
    show: async (req: AuthenticatedRequest, res: Response) => {
        const currentUser = req.user!

        try {
            return res.json(currentUser)
        } catch (err) {
            if (err instanceof Error) {
                return res.status(400).json({ message: err.message })
            }
        }
    },

    // PUT / users/current
    update: async (req: AuthenticatedRequest, res: Response) => {
        const { id } = req.user!

        try {
            const updatedUser = await userService.update(id, req.body)

            return res.json(updatedUser)
        } catch (err) {
            if (err instanceof Error) {
                return res.status(400).json({ message: err.message })
            }
        }
    },

    // PUT / users/current/password
    updatePassword: async (req: AuthenticatedRequest, res: Response) => {
        const user = req.user
        const { currentPassword, newPassword } = req.body

        if (user === undefined || user === null) {
            return res.status(401).json({ message: 'Unauthorized!' })
        }

        try {
            user.checkPassword(currentPassword, async (err, isSame) => {
                if (err instanceof Error) {
                    return res.status(400).json({ message: err.message })
                }

                if (isSame === undefined || isSame === null || false) {
                    return res
                        .status(400)
                        .json({ message: 'Incorrect password' })
                }

                await userService.updatePassword(user.id, newPassword)
                return res.status(204).send()
            })
        } catch (err) {
            if (err instanceof Error) {
                return res.status(400).json({ message: err.message })
            }
        }
    },
}
