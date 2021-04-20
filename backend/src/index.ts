import express from 'express';

const app = express();
app.use(express.json());

const PORT = 3000;

app.get("/", (req, res) => {
    res.status(200).json({ message: "Hello, world!"});
});

app.listen(PORT, () => {
    console.log("Listening on port " + PORT);
});