import express from 'express';
import cors from 'cors';

const app = express();
const cityRoutes = require('./routes/city-routes');
const parkingRoutes = require('./routes/parking-routes');

app.use(express.json());
app.use(cors());

const PORT = 3000;

app.use('/api/city', cityRoutes);
app.use('/api/parking', parkingRoutes);

app.listen(PORT, () => {
    console.log("Listening on port " + PORT);
});