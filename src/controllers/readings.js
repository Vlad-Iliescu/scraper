export default class Readings {
    static async index(request, reply) {
        reply.type('application/json').code(200);

        return {
            records: [
                {
                    "id": 1,
                    "device": "Bath hot water",
                    "date": new Date(),
                    "confidence": 0.7,
                    "reading": 123.69,
                    "picture": "/images/reading_1.png"
                },
                {
                    "id": 2,
                    "device": "Bath cold water",
                    "date": new Date(),
                    "confidence": 0.7,
                    "reading": 2123.69,
                    "picture": "/images/reading_2.png"
                }
            ]
        }
    }
}
