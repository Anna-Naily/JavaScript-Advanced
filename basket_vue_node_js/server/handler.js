const fs = require("fs");
const cart = require("./cart");
const moment = require("moment");

const actions = {
  add: cart.add,
  change: cart.change,
  del: cart.del,
};
// тело общей функции для работы с действиями (добавить/удалить)
const handler = (req, res, action, file) => {
  fs.readFile(file, "utf-8", (err, data) => {
    if (err) {
      res.sendStatus(404, JSON.stringify({ result: 0, text: err }));
    } else {
      const newCart = actions[action](JSON.parse(data), req)[1];
      let log =
        actions[action](JSON.parse(data), req)[0] +
        " " +
        moment().format("LTS");

      console.log(log); //лог в консоль

      //логи записываются в файл
      fs.readFile("./server/db/stats.json", "utf-8", (err, outLog) => {
        if (err) {
          console.log(err);
        } else {
          const listLog = JSON.parse(outLog);
          listLog.push({ log });
          fs.writeFile(
            "./server/db/stats.json",
            JSON.stringify(listLog),
            (err) => {}
          );
        }
      });
      //обновление файла корзины
      fs.writeFile(file, newCart, (err) => {
        if (err) {
          res.send('{"result": 0}');
        } else {
          res.send('{"result": 1}');
        }
      });
    }
  });
};

module.exports = handler;
