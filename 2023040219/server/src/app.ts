import express from 'express';
import path from 'path';
import { config } from 'dotenv';
import registrationRoutes from './routes/registrations.route';
import eventRoutes from './routes/events.route';

config({ path: path.resolve(__dirname, '.env') });

const app = express();
app.use(express.json());
app.use(registrationRoutes);
app.use(eventRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on ${port}`));
