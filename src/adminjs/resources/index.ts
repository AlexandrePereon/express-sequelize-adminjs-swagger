import { type ResourceWithOptions } from 'adminjs'
import { User } from '../../models'
import { userResourceOptions } from './user'

export const adminJsResources: ResourceWithOptions[] = [
    {
        resource: User,
        options: userResourceOptions,
    },
]
