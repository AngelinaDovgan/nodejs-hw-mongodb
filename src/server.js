import express from 'express';
import cors from 'cors';
import pino from 'pino-http';
import { env } from './utils/env';

const PORT = Number(env('PORT', '3000'));

const setupServer = () => {
    const app = express();

    app.use(express.json());
    app.use(cors());
    
    app.use(
        pino({
            transport: {
                target: 'pino-pretty',
            },
        }),
    );

    app.get('/', (req, res) => {
        res.json({
            message: 'Hello World!',
        });
    });

    app.use('*', (req, res) => {
        res.status(404).json({
            message: 'Not found',
        });
    });

    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });

}; 

export default setupServer
