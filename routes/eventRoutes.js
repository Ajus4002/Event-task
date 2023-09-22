import express from 'express';
import { create, list, detail, update, remove } from '../controllers/eventController.js';


const router = express.Router();


router.post('/', create);
router.get('/', list);
router.get('/:id', detail);
router.put('/:id', update);
router.delete('/:id', remove);

export default router;
