import fastify from 'fastify';
import cors from '@fastify/cors'
import * as dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 3000;

const server = fastify()

server.register(cors, {
    origin:'*',
    methods:['GET'],
})

server.get('/ping', async (req, res) => {
    return 'pong\n'
})

/* register routes */ // This is first part of where the data get processed 
server.register(require('./routes/reviews.js'), { prefix: '/reviews' }) // Goes to /routes/review.ts

server.listen({ port: PORT }, (err, address) => {
    if (err) {
        console.log(err)
        process.exit(1)
    }

    console.log(`Server listening at ${address}`)
})
