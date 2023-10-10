import express from 'express';
import {
  addVisionGet,
  addVisionPost,
  allVisionsGet,
  deleteVisionGet,
  deleteVisionPost,
  editVisionGet,
  editVisionPost,
  singleVisionCharactersGet,
} from '../controllers/visionController';
const router = express.Router();

// GET - A list of all visions
router.get('/', allVisionsGet);

// GET - Create a new vision form
router.get('/create', addVisionGet);

// POST - Create a new vision form
router.post('/create', addVisionPost);

// GET - All characters with a particular vision
router.get('/:id', singleVisionCharactersGet);

// GET - Edit a particular vision form
router.get('/:id/edit', editVisionGet);

// POST - Edit a particular vision form
router.post('/:id/edit', editVisionPost);

// GET - Delete a particular vision form
router.get('/:id/delete', deleteVisionGet);

// POST - Delete a particular vision form
router.post('/:id/delete', deleteVisionPost);

export default router;
