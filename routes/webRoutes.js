import express from 'express';

const router = express.Router();


router.get('/', (req, res) => {
    res.render('index.hbs')
});

router.get('/event/:id/:type?', (req, res) => {
    res.render('view.hbs', {id: req.params.id, type: req.params.type ?? 'new'})
});

router.get('/event/create', (req, res) => {
    res.render('view.hbs', {id: null, type: 'new'})
});

export default router;
