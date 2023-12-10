import express from 'express'
import { adminJs, adminJsRouter } from './adminjs'
import { database } from './database'
import { router } from './routes'
import cors from 'cors'

const app = express()

app.use(express.static('public'))
app.use(express.json())

app.use(adminJs.options.rootPath, adminJsRouter)

app.use(cors())
app.use(router)

const PORT = process.env.SERVER_PORT

app.listen(PORT, () => {
    console.log('Starting database connection...')
    database
        .authenticate()
        .then(() => {
            console.log('DB connection successful.')
        })
        .catch((error) => {
            console.error('DB connection failed.', error)
        })

    console.log(`Server started successfuly at port ${PORT}.`)
    console.log(`Swagger docs available at http://localhost:${PORT}/api-docs`)
    console.log(`Admin panel available at http://localhost:${PORT}/admin`)
})
