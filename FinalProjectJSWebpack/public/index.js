import images from './images';
import { app } from './basket_vue';
import { style } from './style.css';
const appMain = new Vue(app);
const PORT = process.env.PORT || 80;
app.get('/', (req, res) => {
  //   res.end();
});
app.listen(PORT, () => {
  console.log('Server has been started...');
});
