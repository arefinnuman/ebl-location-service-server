import express from 'express';
import validateRequest from '../../middleWares/validateRequest';
import { UserController } from './user.controller';
import { UserValidation } from './user.validation';

const router = express.Router();

router.post(
  '/create-super-admin',
  validateRequest(UserValidation.createSuperAdminZodSchema),
  UserController.createSuperAdmin,
);

router.post(
  '/create-admin',
  validateRequest(UserValidation.createAdminZodSchema),
  UserController.createAdmin,
);

router.post(
  '/create-maker',
  validateRequest(UserValidation.createMakerZodSchema),
  UserController.createMaker,
);

router.post(
  '/create-checker',
  validateRequest(UserValidation.createCheckerZodSchema),
  UserController.createChecker,
);

router.post(
  '/create-viewer',
  validateRequest(UserValidation.createViewerZodSchema),
  UserController.createViewer,
);

router.get('/', UserController.getAllUsers);

export const UserRoutes = router;
