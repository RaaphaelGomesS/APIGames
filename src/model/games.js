import Sequelize from "sequelize";
import database from "../db/configdb.js";

const games = database.define("games", {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  year: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  price: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

export default games;