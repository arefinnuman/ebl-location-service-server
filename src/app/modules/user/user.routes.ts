import express from 'express';
import validateRequest from '../../middleWares/validateRequest';
import { UserController } from './user.controller';
import { UserValidation } from './user.validation';

const router = express.Router();

router.post(
  '/',
  validateRequest(UserValidation.createViewerZodSchema),
  UserController.createViewer,
);

router.get('/', UserController.getAllUser);

router.patch('/update-to-admin/:id', UserController.updateToAdmin);

router.patch('/update-to-viewer/:id', UserController.updateToViewer);

router.patch('/approved-by-admin/:id', UserController.approvedByAdmin);

router.patch('/rejected-by-admin/:id', UserController.rejectedByAdmin);

router.get('/:id', UserController.getSingleUser);

router.patch(
  '/:id',
  validateRequest(UserValidation.updateUserZodSchema),
  UserController.updateUser,
);

router.delete('/:id', UserController.deleteUser);

router.post('/create-user-by-admin', UserController.createUserByAdmin);

export const UserRoutes = router;
