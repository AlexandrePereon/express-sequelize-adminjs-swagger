/* eslint-disable @typescript-eslint/no-misused-promises */
import { type NextFunction, type Request, type Response } from 'express'
import { type JwtPayload } from 'jsonwebtoken'
import { type UserInstance } from '../models/User'
import { jwtService } from '../services/jwtService'
import { userService } from '../services/userService'

export interface AuthenticatedRequest extends Request {
    user?: UserInstance | null
}

export function ensureAuth(
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction,
): any {
    const authorizationHeader = req.headers.authorization

    if (authorizationHeader === null || authorizationHeader === undefined) {
        return res.status(401).json({ message: 'Unauthorized: no token found' })
    }

    const token = authorizationHeader.replace(/Bearer /, '')

    jwtService.verifyToken(token, async (err, decoded) => {
        if (err instanceof Error || typeof decoded === 'undefined') {
            return res
                .status(401)
                .json({ message: 'Unauthorized: invalid token' })
        }

        const user = await userService.findByEmail(
            (decoded as JwtPayload).email,
        )
        req.user = user
        next()
    })
}

export function ensureAuthViaQuery(
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction,
): any {
    const { token } = req.query

    if (token === null || token === undefined) {
        return res.status(401).json({ message: 'Unauthorized: no token found' })
    }

    if (typeof token !== 'string') {
        return res
            .status(401)
            .json({ message: 'Unauthorized: token must be a string' })
    }

    jwtService.verifyToken(token, async (err, decoded) => {
        if (err instanceof Error || typeof decoded === 'undefined')
            return res.status(401).json({
                message: 'Unauthorized: invalid token',
            })

        const user = await userService.findByEmail(
            (decoded as JwtPayload).email,
        )
        req.user = user
        next()
    })
}
