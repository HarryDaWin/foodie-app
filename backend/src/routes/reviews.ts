
import * as fs from 'fs';

const rawData = fs.readFileSync('./dummy_data/reviews.json', 'utf-8');
let jsonData: any;
try {
    jsonData = JSON.parse(rawData);
} catch (error) {
  console.error('Error parsing JSON:', error);
}

//Second part of the data being processed 

async function routes(server: any) {
    server.get('/', async(req: any, res: any) => {
        return jsonData
    })

    server.get('/:id', async (req: any, res: any) => {
        let id: number = parseInt(req.params.id);
        
        if (isNaN(id)) {
            res.code(400)
            res.send({ 
                error: "Bad Request", 
                message: "Request parameter must be an integer", 
                statusCode: "400" 
            })
            return 
        }

        return jsonData.filter((review: any) => review.id == id)
    })

    server.post('/', async (req: any, res: any) => {
        const newReview = req.body;
        newReview.id = jsonData.length ? jsonData[jsonData.length - 1].id + 1 : 1;
        jsonData.push(newReview);

        try {
            fs.writeFileSync('./dummy_data/reviews.json', JSON.stringify(jsonData, null, 2));
            res.code(201).send(newReview);
        } catch (error) {
            console.error('Error writing JSON:', error);
            res.code(500).send({
                error: "Internal Server Error",
                message: "Could not save the review",
                statusCode: "500"
            });
        }
    })
}

export default routes;