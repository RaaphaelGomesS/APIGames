import Express, { Router } from "express";
import users from "../model/users.js";
import Jwt from "jsonwebtoken";
import * as dotenv from 'dotenv';

dotenv.config();

const JWTSecret = process.env.KEY_JWS;

const links = [
  {
    href: `http://localhost:${process.env.PORT || 3000}/auth`,
    method: "POST",
    rel: "login",
  },
];

const router = Express.Router();

router.post("/auth", (req, res) => {
  const { email, password } = req.body;

  if (email != undefined) {
    users
      .findOne({
        where: {
          email: email,
        },
      })
      .then((user) => {
        if (user != undefined) {
          if (user.password == password) {
            Jwt.sign(
              { id: user.id, email: user.email },
              JWTSecret,
              (err, token) => {
                if (err) {
                  res.status(400);
                  res.json({ err: "falha interna" });
                } else {
                  res.status(200);
                  res.json({ token: token });
                }
              }
            );
          } else {
            res.status(401);
            res.json({ err: "senha inválida!" });
          }
        } else {
          res.status(404);
          res.json({ err: "usuário não encontrado!" });
        }
      });
  } else {
    res.status(400);
    res.json({ err: "email ou senha inválido!" });
  }
});

router.post("/register", (req, res) => {
  const { name, email, password } = req.body;

  const creatUser = users
    .create({
      name,
      email,
      password,
    })
    .then((creatUser) => {
      res.status(200);
      res.json({ UserCreated: creatUser, _links: links });
    })
    .catch(() => {
      res.status(400);
      res.json({ err: "Falha na requisição" });
    });
});

export default router;
