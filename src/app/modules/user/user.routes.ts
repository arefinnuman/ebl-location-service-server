import express from 'express';
import validateRequest from '../../middleWares/validateRequest';
import { UserController } from './user.controller';
import { UserValidation } from './user.validation';

const router = express.Router();

router.post(
  '/create-admin',
  validateRequest(UserValidation.createAdminZodSchema),
  UserController.createAdmin,
);

router.post(
  '/create-viewer',
  validateRequest(UserValidation.createViewerZodSchema),
  UserController.createViewer,
);

router.get('/', UserController.getAllUser);

router.get('/:id', UserController.getSingleUser);

router.patch(
  '/:id',
  validateRequest(UserValidation.updateUserZodSchema),
  UserController.updateUser,
);

router.delete('/:id', UserController.deleteUser);

export const UserRoutes = router;
