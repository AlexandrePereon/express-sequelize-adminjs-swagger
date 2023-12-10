import React, { useEffect, useState } from 'react'
import {
    H1,
    H2,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
} from '@adminjs/design-system'
import { ApiClient, useCurrentAdmin } from 'adminjs'

export default function Dashboard(): any {
    const [resources, setResources] = useState<Record<string, number>>()
    const [currentAdmin] = useCurrentAdmin()

    const api = new ApiClient()

    useEffect(() => {
        fetchDashboardData().catch((e) => {
            console.error(e)
        })
    }, [])

    async function fetchDashboardData(): Promise<void> {
        try {
            const res = await api.getDashboard()
            setResources(res.data)
        } catch (error) {
            console.error('Failed to fetch dashboard data:', error)
        }
    }

    return (
        <section style={{ padding: '1.5rem' }}>
            <H1>Welcome, {currentAdmin?.firstName}</H1>

            <section style={{ backgroundColor: '#FFF', padding: '1.5rem' }}>
                <H2>Summary</H2>
                <Table>
                    <TableHead>
                        <TableRow style={{ backgroundColor: '#FF0043' }}>
                            <TableCell style={{ color: '#FFF' }}>
                                Resource
                            </TableCell>
                            <TableCell style={{ color: '#FFF' }}>
                                Records
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {resources !== null && resources !== undefined ? (
                            Object.entries(resources).map(
                                ([resource, count]) => (
                                    <TableRow key={resource}>
                                        <TableCell>{resource}</TableCell>
                                        <TableCell>{count}</TableCell>
                                    </TableRow>
                                ),
                            )
                        ) : (
                            <></>
                        )}
                    </TableBody>
                </Table>
            </section>
        </section>
    )
}
