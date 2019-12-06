const router = require('express').Router();
const ctrl = require('./data/ctrls');

// router.all('*', (req, res, next) => {
//   console.log(req.path + ' welcome to api');
//   // 미들웨어가 들어갈 곳
//   next();
// })
router.post('/add', ctrl.add);
router.get('/change', ctrl.change);

router.all('*', (req, res) => {
  res.status(404).send({ success: false, msg: `unknown uri ${req.path}` });
});
module.exports = router;
