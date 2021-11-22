import express from 'express';
import log from '@utils/logger';
import config from 'config';
import router from './router';
import validator from './validator';
import { createServer } from 'http';
import mongoose from 'mongoose';

const port = config.get('port') as number | 3000;
const host = config.get('host') as string | "localhost";
const dbUri = config.get('dbUri') as string | "mongodb://localhost:27017/peoplepets";
const env = config.get('env') as string | "src/storage/logs";

const app = express();

// Registering json middleware.
validator(app);

// Initializing server.
const server = createServer(app);

// fix mongoose deprecation warnings
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useNewUrlParser', true);

// Connecting to the database.
mongoose.connect(dbUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    
    log.info("Database connected");
            
    // Starting the server.
    server.listen(port, host, () => {
        
        log.info(`[${env}] Server started @ http://${host}:${port}`);
        
        // Registering routes.
        router(app);
    
    });
        
})
.catch((error) => {
    
    log.error("Unable to connect to the database", error);
    process.exit(1);

});