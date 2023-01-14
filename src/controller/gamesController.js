import Express from "express";
import games from "../model/games.js";
import { auth } from "../../index.js";

const router = Express.Router();

router.get("/games", auth, (req, res) => {

  const links = [
    {
      href: `http://localhost:${process.env.PORT || 3000}/game`,
      method: "POST",
      rel: "post_game",
    }
  ];

  games
    .findAll()
    .then((games) => {
      res.json({ games: games, _links: links });
      res.statusCode = 200;
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get("/game/:id", auth, (req, res) => {
  if (isNaN(req.params.id)) {
    res.sendStatus(400);
  } else {
    var id = parseInt(req.params.id);

    const links = [
      {
        href: `http://localhost:${process.env.PORT || 3000}/games`,
        method: "GET",
        rel: "get_all_games",
      },

      {
        href: `http://localhost:${process.env.PORT || 3000}/game/${id}`,
        method: "PUT",
        rel: "edit_game",
      },
      {
        href: `http://localhost:${process.env.PORT || 3000}/game/${id}`,
        method: "DELETE",
        rel: "delete_game",
      },
    ];

    games
      .findOne({
        where: { id: id },
      })
      .then((game) => {
        if (game != undefined) {
          res.statusCode = 200;
          res.json({ game: game, _links: links });
        } else {
          res.sendStatus(404);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
});

router.post("/game", auth, (req, res) => {
  const { title, year, price } = req.body;

  const links = [
    {
      href: `http://localhost:${process.env.PORT || 3000}/games`,
      method: "GET",
      rel: "get_all_games",
    }
  ];

  const creatGame = games
    .create({
      title,
      year,
      price,
    })
    .then((creatGame) => {
      res.status(200);
      res.json({ game: creatGame, _links: links });
    })
    .catch(() => {
      res.status(400);
      res.json({ err: "Falha na requisição" });
    });
});

router.delete("/game/:id", auth, (req, res) => {
  if (isNaN(req.params.id)) {
    res.sendStatus(400);
  } else {
    var id = parseInt(req.params.id);

    const links = [
      {
        href: `http://localhost:${process.env.PORT || 3000}/games`,
        method: "GET",
        rel: "get_all_games",
      },

      {
        href: `http://localhost:${process.env.PORT || 3000}/game`,
        method: "POST",
        rel: "post_game",
      },
    ];

    games
      .destroy({
        where: { id: id },
      })
      .then(() => {
        res.sendStatus(200);
        res.json({ msg: "Game foi deletado!", _links: links });
      })
      .catch((err) => {
        console.log(err);
      });
  }
});

router.put("/game/:id", auth, (req, res) => {
  if (isNaN(req.params.id)) {
    res.sendStatus(400);
  } else {
    var id = parseInt(req.params.id);
    var { title, year, price } = req.body;

    const links = [
      {
        href: `http://localhost:${process.env.PORT || 3000}/games`,
        method: "GET",
        rel: "get_all_games",
      },

      {
        href: `http://localhost:${process.env.PORT || 3000}/game/${id}`,
        method: "GET",
        rel: "get_game",
      },
    ];

    games
      .update(
        { title, year, price },
        {
          where: {
            id: id,
          },
        }
      )
      .then((game) => {
        if (game != undefined) {
          if (title != undefined) {
            game.title = title;
          }

          if (price != undefined) {
            game.price = price;
          }

          if (year != undefined) {
            game.year = year;
          }

          res.json({ gameUpdate: game.title, _links: links });
        } else {
          res.sendStatus(404);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
});

export default router;
