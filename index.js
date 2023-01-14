import * as dotenv from 'dotenv';
import Express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import gamesController from "./src/controller/gamesController.js";
import usersController from "./src/controller/usersController.js";
import database from "./src/db/configdb.js";
import Jwt from "jsonwebtoken";

dotenv.config();

const app = Express();

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

export function auth(req, res, next) {
  var authToken = req.headers["authorization"];

  if (authToken != undefined) {
    var tokenFull = authToken.split(" ");
    var token = tokenFull[1];

    Jwt.verify(token, process.env.KEY_JWS, (err, data) => {
      if (err) {
        res.status(401);
        res.json({ err: "token inválido!" });
      } else {
        req.token = token;
        req.loggedUser = { id: data.id, email: data.email };
        next();
      }
    });
  } else {
    res.status(401);
    res.json({ err: "Token inválido!" });
  }
}

database
  .authenticate()
  .then(() => {
    console.log("Conectado ao banco de dados!");
  })
  .catch((erro) => {
    console.log(erro);
  });

app.use("/", gamesController);
app.use("/", usersController);

app.listen(process.env.PORT || 3000, () => {
  console.log("aplicação rodando!");
});
