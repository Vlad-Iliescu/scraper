import Default from "../controllers/default"
import Readings from "../controllers/readings";

export default function (fastify) {
    // fastify.get('/', Default.index);
    fastify.get('/readings', Readings.index);
}
