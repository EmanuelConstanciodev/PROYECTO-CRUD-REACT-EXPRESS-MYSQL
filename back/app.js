const express = require("express");
var mysql = require("mysql");
var cors = require("cors");
var bodyParser = require("body-parser");
const app = express();
const port = 5050;

var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: null,
  database: "guayerd_materiales",
});
connection.connect();

app.use(express.json());
app.use(cors());
var urlencodedParser = bodyParser.urlencoded({ extended: false });

const corsValues = {
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
  optionsSuccessStatus: 204,
};
app.head("/materiales", cors(corsValues), (req, res) => {
  console.info("HEAD /simple-cors");
  res.sendStatus(204);
});

app.get("/materiales", cors(corsValues), (req, res) => {
  const consulta = "SELECT * FROM materiales";
  connection.query(consulta, function (error, results) {
    if (error) {
      throw error;
    }
    if (results.length > 0) {
      res.json(results);
    } else {
      res.json([]);
    }
  });
});

app.get("/material/:id", cors(corsValues), (req, res) => {
  const { id } = req.params;
  const consulta = `SELECT * FROM materiales WHERE id=${id}`;
  connection.query(consulta, function (error, results) {
    if (error) {
      throw error;
    }
    if (results.length > 0) {
      res.json(results);
    } else {
      res.json({});
    }
  });
});

app.post("/materiales", urlencodedParser, (req, res) => {
  console.log(req.body);
  const consulta = `INSERT INTO materiales SET ?`;
  const customObject = {
    herramienta: req.body.herramienta,
    precio: req.body.precio,
    foto: req.body.foto,
  };

  connection.query(consulta, customObject, (error) => {
    if (error) throw error;
    res.send("Se insertó el registro!");
  });
});

app.delete("/materiales/:id", (req, res) => {
  const { id } = req.params;

  consulta = `DELETE FROM materiales WHERE id=${id}`;
  connection.query(consulta, (error) => {
    if (error) throw error;
    res.send("Se eliminó el registro");
  });
});

app.put("/materiales/:id", cors(corsValues), (req, res) => {
  const { id } = req.params;
  const { herramienta, precio, foto } = req.body;

  const consulta = `UPDATE materiales SET herramienta="${herramienta}" , precio="${precio}", foto="${foto}" WHERE id=${id}`;
  connection.query(consulta, (error, results) => {
    if (error) throw error;
    res.json(results);
    //   res.send("Se actualizó la tabla!");
  });
});

//connection.end();

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
