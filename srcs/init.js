import regeneratorRuntime from "regenerator-runtime";
import "dotenv/config";
import "./db";
import app from "./server.js"

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`)
});