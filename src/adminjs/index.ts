import AdminJs from 'adminjs'
import AdminJsExpress from '@adminjs/express'
import AdminJsSequelize from '@adminjs/sequelize'
import { database } from '../database'
import { adminJsResources } from './resources'
import { dashboardOptions } from './dashboard'
import { brandingOptions } from './branding'
import { authenticationOption } from './authentication'

AdminJs.registerAdapter(AdminJsSequelize)

export const adminJs = new AdminJs({
    databases: [database],
    rootPath: '/admin',
    resources: adminJsResources,
    dashboard: dashboardOptions,
    branding: brandingOptions,
})

export const adminJsRouter = AdminJsExpress.buildAuthenticatedRouter(
    adminJs,
    authenticationOption,
    null,
    {
        resave: false,
        saveUninitialized: false,
    },
)
