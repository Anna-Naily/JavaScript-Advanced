//функция для добавления новых товаров
const add = (cart, req) => {
  cart.contents.push(req.body);
  let log = "Добавление товара: " + req.body.product_name; //имя товара
  let data = JSON.stringify(cart, null, 4); //содержание товара
  return [log, data];
};
//функция для изменения количества товаров, при их наличии
const change = (cart, req) => {
  const find = cart.contents.find((el) => el.id_product === +req.params.id);
  find.count += req.body.count;
  // return JSON.stringify(cart, null, 4);
  let log = "Изменение количества товара: " + find.product_name; //имя товара
  let data = JSON.stringify(cart, null, 4); //содержание товара
  return [log, data];
};
//функция для удаления товаров
const del = (cart, req) => {
  const find = cart.contents.find((el) => el.id_product === +req.params.id);
  cart.contents.splice(cart.contents.indexOf(find), 1);
  let log = "Удаление товара: " + find.product_name; //имя товара
  let data = JSON.stringify(cart, null, 4); //содержание товара
  return [log, data];
  //return JSON.stringify(cart, null, 4);
};

module.exports = {
  add,
  change,
  del,
};
