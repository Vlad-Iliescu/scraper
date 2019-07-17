export default class Default {
    constructor() {
    }

    async handle(request, reply) {
        reply.type('application/json').code(200);
        return { hello: 'world' }
    }
}
