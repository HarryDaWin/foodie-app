
import * as fs from 'fs';

const rawData = fs.readFileSync('./dummy_data/reviews.json', 'utf-8');
let jsonData: any;
try {
    jsonData = JSON.parse(rawData);
} catch (error) {
  console.error('Error parsing JSON:', error);
}

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
}

export default routes;