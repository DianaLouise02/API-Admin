require('dotenv').config();
const express = require("express");
const router = require("./router/router");
const sequelize = require("./config/config");
const cors  =require('cors');

const Admin = require("./models/Admin");

const app = express();

// * -> Tudo
app.use(cors());
// modelo da API JSON
app.use(express.json());
app.use("/api", router);
// REQ -> Requisição
// RES -> Response
app.get("/healthcheck", (req, res) => {
  // 200 -> Ok
  return res.status(200).json({
    msg: "O site está no ar!",
    alive: true,
  });
});

// listen -> ( 8080 )
sequelize
  .authenticate()
  .then(async () => {
    console.log("Conexão estabelecida com sucesso");
    await sequelize.sync();
    console.log("####### Rodando na Porta 8080 #######");
  })
  .catch((error) => {
    console.error("Erro ao se conectar com o banco:", error);
  });
