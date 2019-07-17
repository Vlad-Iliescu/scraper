import Default from "../controllers/default"

export default function (fastify) {
    fastify.get('/', (new Default()).handle);
}
