import app from "./app";
const PORT = 3000;

app.get("/ping", (_req, res) => {
  console.log("pinged");
  res.send("pong");
});

app.listen(PORT, () => {
  console.log(`server is running on PORT ${PORT}.`);
});
