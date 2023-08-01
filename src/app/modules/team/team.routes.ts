import express from 'express';
import validateRequest from '../../middleWares/validateRequest';
import { TeamController } from './team.controller';
import { TeamValidation } from './team.validation';

const router = express.Router();

router.post(
  '/create-team',
  validateRequest(TeamValidation.createTeamZodSchema),
  TeamController.createTeam,
);

router.get('/:id', TeamController.getSingleTeam);

router.patch(
  '/:id',
  validateRequest(TeamValidation.updateTeamZodSchema),
  TeamController.updateTeam,
);

router.delete('/:id', TeamController.deleteTeam);

router.get('/', TeamController.getAllTeam);

export const TeamRoutes = router;
