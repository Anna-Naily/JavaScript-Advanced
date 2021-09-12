const express = require("express"); //подключается фраймворк експресс
const fs = require("fs"); //подключается модуль для работы с файлами
const cartRouter = require("./cartRouter"); //подключается експресс модуль картРоутера
const loader = require("./loaderId");
const app = express();

app.use(express.json()); //мидлвар для работы с JSON
app.use("/", express.static("./build"));
app.use("/api/cart", cartRouter); //задается адрес роутеру
app.use("/api/open", loader);

//функция читает данные из файла и транслирует их через ячейку локалХоста
app.get("/api/products", (req, res) => {
  fs.readFile("build/server/db/catalogData.json", "utf-8", (err, data) => {
    if (err) {
      res.send(JSON.stringify({ result: 0, text: err }));
      // res.sendStatus(404, JSON.stringify({result: 0, text: err}));
    } else {
      res.send(data);
    }
  });
});

//cartRouter();
//const port = process.env.PORT || 3000;
//подключение к порту
const port = 8080;
app.listen(port, () => {
  console.log(`Listening ${port} port`);
});
// CRUD
// app.get(); // READ
// app.post(); // CREATE
// app.put(); // UPDATE
// app.delete(); // DELETE
