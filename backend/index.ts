import express from "express";

const PORT = 3001;

const app = express();

app.use(express.json());

app.get("/ping", (_req, res) => {
    console.log("pinged");
    res.send("pong");
});

app.listen(PORT, () => {
    console.log(`server is running on PORT ${PORT}.`);
});