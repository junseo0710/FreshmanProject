const router = require('express').Router();
const ctrl = require('./ctrls');
const fm = require('./fm');


router.get('/', ctrl.list);
router.get('/w/:id', ctrl.move);
router.patch('/like', ctrl.chlike);
router.get('/view5', ctrl.view);
router.get('/good', ctrl.good);
router.get('/:_id', ctrl.read);
// router.get('/:id', ctrl.move);
router.post('/', ctrl.add);
router.put('/', ctrl.mod);
router.patch('/', ctrl.mod);
router.delete('/', ctrl.del);


router.post('/upload', fm.upfile);
router.delete('/upload', fm.delfile);
router.get('/upload/:folder', fm.downfile);


router.post('/comment', ctrl.addCmt);
router.put('/comment', ctrl.modCmt);
router.delete('/comment', ctrl.delCmt);

router.all('*', (req, res) => {
    res.status(404).send({ success: false, msg: `unknown uri ${req.path}` });
});

module.exports = router;
