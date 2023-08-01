import express from 'express';
import validateRequest from '../../middleWares/validateRequest';
import { ViewerController } from './viewer.controller';
import { ViewerValidation } from './viewer.validation';

const router = express.Router();

router.get('/:id', ViewerController.getSingleViewer);

router.patch(
  '/:id',
  validateRequest(ViewerValidation.updateViewer),
  ViewerController.updateViewer,
);

router.delete('/:id', ViewerController.deleteViewer);

router.get('/', ViewerController.getAllViewers);

export const ViewerRoutes = router;
