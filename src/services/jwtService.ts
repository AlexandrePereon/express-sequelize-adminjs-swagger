import jwt from 'jsonwebtoken'

// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config()

const secret = process.env.JWT_SECRET as string
const timeout = process.env.JWT_TIMEOUT as string

export const jwtService = {
    signPayload: (payload: string | object | Buffer) => {
        return jwt.sign(payload, secret, { expiresIn: timeout })
    },

    verifyToken: (token: string, callbackfn: jwt.VerifyCallback) => {
        jwt.verify(token, secret, callbackfn)
    },
}
