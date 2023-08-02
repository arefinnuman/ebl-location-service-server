import express from 'express';
import { EblAgentController } from './eblAgent.controller';

const router = express.Router();

router.post('/', EblAgentController.createEblAgent);

router.get('/', EblAgentController.getAllAgent);

router.get('/:id', EblAgentController.getSingleAgent);

router.patch('/:id', EblAgentController.updateAgent);

router.delete('/:id', EblAgentController.deleteAgent);

export const EblAgentRoutes = router;
