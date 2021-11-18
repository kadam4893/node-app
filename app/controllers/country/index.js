import { Router } from 'express';

import Controller from './country.controller';

const router = Router();

router.post('/add', Controller.add);
router.post('/list', Controller.list);
router.get('/:id', Controller.getById);
router.put('/:id', Controller.update);
router.delete('/:id', Controller.delete);

export default router;
