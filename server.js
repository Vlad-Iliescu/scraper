'use strict';

// Read the .env file.
require('dotenv').config();

// Require the framework
const Fastify = require('fastify');

// Instantiate Fastify with some config
const app = Fastify({
    logger: true,
    pluginTimeout: 10000
});

app.register(require('fastify-cors'), {
    origin: true,
    methods: ['GET', 'PUT', 'POST', 'DELETE']
});

// Register your application as a normal plugin.
const require_esm = require("esm")(module/*, options*/);
app.register(require_esm('./src/index.js').default);

// Start listening.
app.listen(process.env.FASTIFY_PORT || 3000, process.env.FASTIFY_ADDRESS || '0.0.0.0', (err) => {
    if (err) {
        app.log.error(err);
        process.exit(1)
    }
});
