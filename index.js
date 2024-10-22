import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;

var userAuthentication = false;

app.use(express.urlencoded({ extended: true }));

function checkPassword(req, res, next){
    const password = req.body["password"];
    if(password === "saktiman"){
        userAuthentication = true;
    }
    next();
}

app.use(checkPassword);


app.get("/", (req, res) => {
res.sendFile(__dirname + "/public/index.html");
});

app.post("/check", (req, res) => {
  if(userAuthentication){
    res.sendFile(__dirname + "/public/secret.html");
  } else{
    res.sendFile(__dirname + "/public/index.html");
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});