import express from 'express';
import {
  addCharacterGet,
  addCharacterPost,
  allCharactersGet,
  deleteCharacterGet,
  deleteCharacterPost,
  editCharacterGet,
  editCharacterPost,
  singleCharacterGet,
} from '../controllers/characterController';
const router = express.Router();

/* GET home page. */
router.get('/', allCharactersGet);

router.get('/create', addCharacterGet);

router.post('/create', addCharacterPost);

router.get('/:id', singleCharacterGet);

router.get('/:id/edit', editCharacterGet);

router.post('/:id/edit', editCharacterPost);

router.post('/:id/delete', deleteCharacterGet);

router.post('/:id/delete', deleteCharacterPost);

export default router;
