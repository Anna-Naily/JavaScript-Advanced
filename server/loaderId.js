const express = require("express");
const fs = require("fs");
const handlerId = require("./handler").handlerId;
const router = express.Router();

//работает
router.get("/", (req, res) => {
  fs.readFile("./build/server/db/openPage.json", "utf-8", (err, data) => {
    if (err) {
      res.sendStatus(404, JSON.stringify({ result: 0, text: err }));
    } else {
      res.send(data);
    }
  });
});

router.put("/", (req, res) => {
  handlerId(req, res, "./build/server/db/openPage.json");
});
// app.put(); // UPDATE

module.exports = router;
