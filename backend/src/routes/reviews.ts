import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import * as fs from 'fs';

// Define the structure of a review
interface Review {
    id: number;
    user_id: string;
    restaurants: string[];
}

// Define the structure of the request parameters
interface Params {
    id: string;
}

// Define the structure of the request body
interface Body {
    user_id: string;
    restaurants: string[];
}

async function routes(server: FastifyInstance) {
    // Handle GET requests to the root path
    server.get('/', async (req: FastifyRequest, res: FastifyReply) => {
        // Read the JSON file from disk
        const rawData = fs.readFileSync('./dummy_data/reviews.json', 'utf-8');
        let jsonData: Review[];
        try {
            // Parse the JSON data
            jsonData = JSON.parse(rawData);
        } catch (error) {
            console.error('Error parsing JSON:', error);
            // Send a 500 Internal Server Error response if parsing fails
            res.code(500).send({
                error: "Internal Server Error",
                message: "Could not parse JSON data",
                statusCode: "500"
            });
            return;
        }
        // Return the parsed JSON data
        return jsonData;
    });

    // Handle GET requests to the path with an ID parameter
    server.get('/:id', async (req: FastifyRequest<{ Params: Params }>, res: FastifyReply) => {
        // Read the JSON file from disk
        const rawData = fs.readFileSync('./dummy_data/reviews.json', 'utf-8');
        let jsonData: Review[];
        try {
            // Parse the JSON data
            jsonData = JSON.parse(rawData);
        } catch (error) {
            console.error('Error parsing JSON:', error);
            // Send a 500 Internal Server Error response if parsing fails
            res.code(500).send({
                error: "Internal Server Error",
                message: "Could not parse JSON data",
                statusCode: "500"
            });
            return;
        }
        // Parse the ID parameter from the request
        const id: number = parseInt((req.params as Params).id);
        if (isNaN(id)) {
            // Send a 400 Bad Request response if the ID is not a valid number
            res.code(400).send({
                error: "Bad Request",
                message: "Request parameter must be an integer",
                statusCode: "400"
            });
            return;
        }
        // Filter the reviews to find the one with the matching ID
        return jsonData.filter((review: Review) => review.id == id);
    });

    // Handle POST requests to the root path
    server.post('/', async (req: FastifyRequest<{ Body: Body }>, res: FastifyReply) => {
        // Read the JSON file from disk
        const rawData = fs.readFileSync('./dummy_data/reviews.json', 'utf-8');
        let jsonData: Review[];
        try {
            // Parse the JSON data
            jsonData = JSON.parse(rawData);
        } catch (error) {
            console.error('Error parsing JSON:', error);
            // Send a 500 Internal Server Error response if parsing fails
            res.code(500).send({
                error: "Internal Server Error",
                message: "Could not parse JSON data",
                statusCode: "500"
            });
            return;
        }
        // Get the new review from the request body
        const newReview: Review = req.body as Review;
        // Assign a new ID to the new review
        newReview.id = jsonData.length ? jsonData[jsonData.length - 1].id + 1 : 1;
        // Add the new review to the JSON data
        jsonData.push(newReview);
        try {
            // Write the updated JSON data back to the file
            fs.writeFileSync('./dummy_data/reviews.json', JSON.stringify(jsonData, null, 2));
            // Send a 201 Created response with the new review
            res.code(201).send(newReview);
        } catch (error) {
            console.error('Error writing JSON:', error);
            // Send a 500 Internal Server Error response if writing fails
            res.code(500).send({
                error: "Internal Server Error",
                message: "Could not save the review",
                statusCode: "500"
            });
        }
    });
}

export default routes;