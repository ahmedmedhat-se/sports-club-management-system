import express from 'express';
import MemberController from '../controllers/memberController.js';

const memberRouter = express.Router();

memberRouter.get('/', MemberController.index);
memberRouter.post('/', MemberController.create);
memberRouter.post('/update', MemberController.update);
memberRouter.post('/delete', MemberController.delete);

export default memberRouter;