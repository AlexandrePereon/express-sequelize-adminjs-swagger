import adminjs, { type PageHandler } from 'adminjs'
import { User } from '../models'

export const dashboardOptions: {
    handler?: PageHandler
    component?: string
} = {
    component: adminjs.bundle('./components/Dashboard'),
    handler: async (req, res, context) => {
        const standardUsers = await User.count({ where: { role: 'user' } })
        res.json({
            'Users: ': standardUsers,
        })
    },
}
