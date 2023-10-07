import express from 'express';
import {
  addVisionGet,
  addVisionPost,
  allVisionsGet,
  deleteVisionGet,
  deleteVisionPost,
  editVisionGet,
  editVisionPost,
} from '../controllers/visionController';
const router = express.Router();

router.get('/', allVisionsGet);

router.get('/create', addVisionGet);

router.post('/create', addVisionPost);

router.get('/:id/edit', editVisionGet);

router.post('/:id/edit', editVisionPost);

router.post('/:id/delete', deleteVisionGet);

router.post('/:id/delete', deleteVisionPost);

export default router;
