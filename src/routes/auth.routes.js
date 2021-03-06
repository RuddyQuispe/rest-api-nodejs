import { Router } from "express";
import { AuthController } from '../controllers/auth.controller';

const router = Router();

router.post('/signup/:type_user', AuthController.signUp);

router.get('/signup/photographer', AuthController.getCreateAccount);

router.post('/signin', AuthController.signIn);

router.post('/restore_account', AuthController.restoreAccount);

router.post('/confirm_key', AuthController.postConfirmKey);

router.put('/verify_password', AuthController.postVerifyPasswd);

router.post('/signin_guest', AuthController.signInGuest);

router.post('/sign_up_guest', AuthController.signUpGuest);

export default router;