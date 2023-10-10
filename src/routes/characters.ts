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

// GET - A list of all characters.
router.get('/', allCharactersGet);

// GET - Create a new character form
router.get('/create', addCharacterGet);

// POST - Create a new character form
router.post('/create', addCharacterPost);

// GET - A single character details
router.get('/:id', singleCharacterGet);

// GET - Edit a particular character form
router.get('/:id/edit', editCharacterGet);

// POST - Edit a particular character form
router.post('/:id/edit', editCharacterPost);

// GET - Delete a particular character form
router.get('/:id/delete', deleteCharacterGet);

// POST - Delete a particular character form
router.post('/:id/delete', deleteCharacterPost);

export default router;
