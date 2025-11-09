export const healthCheck = {
    status: "ok",
    timestamp: new Date().toISOString(),
    services: {
        graphql: "running",
        database: "connected",
        oddEngine: "available",
    },
    uptime: process.uptime(),
}
