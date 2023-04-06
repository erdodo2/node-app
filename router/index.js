const router = require('express').Router();
const {user , db} = require('../db');




router.get('/', async (req, res) => {
    let list = await db.getList();
    res.json(list);
});

router.post('/', async (req, res) => {
    let add= await db.addList(JSON.stringify(req.body));
    res.json(add);
})
router.get('/:id', async (req, res) => {
    let getOne = await db.getOne(req.params.id);
    res.json(getOne);
})
router.delete('/:id', async (req, res) => {
    let deleteOne = await db.deleteOne(req.params.id);
    res.json(deleteOne);
})
router.put('/:id', async (req, res) => {
    let updateOne = await db.updateOne(req.params.id,JSON.stringify(req.body));
    res.json(updateOne);
})

module.exports = router;
