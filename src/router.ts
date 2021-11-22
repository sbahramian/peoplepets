import { Express, Request, Response } from 'express';
import peopleRouter from '@routes/people.routes';
import petRouter from '@routes/pet.routes';
import translate from '@resources/translate';

const router = (app: Express) => {

    // Health check to see whether it's running or not.
    app.get("/api-test", (req: Request, res: Response) => res.sendStatus(200));

    // Registering the routes
    app.use('/peoples', peopleRouter);
    app.use('/pets', petRouter);

    // Always keep this at the end of routes
    app.use((req: Request, res: Response) => {
        res.status(404).json({ error: translate.__('error.ERROR_404') });
    });

};

export default router;