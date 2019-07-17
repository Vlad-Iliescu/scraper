import routes from "./routes"

export default async function (fastify, options) {
    routes(fastify);
}
