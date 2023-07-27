import express from 'express';
import { Ebl365Controller } from './ebl365.controller';

const router = express.Router();

router.get('/', Ebl365Controller.getAllEbl365);

router.get('/:id', Ebl365Controller.getSingleEbl365);

router.patch('/:id', Ebl365Controller.updateEbl365);

router.delete('/:id', Ebl365Controller.deleteEbl365);

export const EBl365Routes = router;
