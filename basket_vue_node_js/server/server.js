const express = require("express"); //подключается фраймворк експресс
const fs = require("fs"); //подключается модуль для работы с файлами
const cartRouter = require("./cartRouter"); //подключается експресс модуль картРоутера
const app = express();

app.use(express.json()); //мидлвар для работы с JSON
app.use("/", express.static("./public"));
app.use("/api/cart", cartRouter); //задается адрес роутеру

//функция читает данные из файла и транслирует их через ячейку локалХоста
app.get("/api/products", (req, res) => {
  fs.readFile("./server/db/catalogData.json", "utf-8", (err, data) => {
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
const port = 5000;
app.listen(port, () => {
  console.log(`Listening ${port} port`);
});
// CRUD
// app.get(); // READ
// app.post(); // CREATE
// app.put(); // UPDATE
// app.delete(); // DELETE
