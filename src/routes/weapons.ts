import express from 'express';
import {
  addWeaponGet,
  addWeaponPost,
  allWeaponsGet,
  deleteWeaponGet,
  deleteWeaponPost,
  editWeaponGet,
  editWeaponPost,
  singleWeaponCharactersGet,
} from '../controllers/weaponController';
const router = express.Router();

// GET - A list of all weapon types
router.get('/', allWeaponsGet);

// GET - Create a new weapon type form
router.get('/create', addWeaponGet);

// POST - Create a new weapon type form
router.post('/create', addWeaponPost);

// GET - List of all characters for a single weapon type
router.get('/:id', singleWeaponCharactersGet);

// GET - Edit a particular weapon type form
router.get('/:id/edit', editWeaponGet);

// POST - Edit a particular weapon type form
router.post('/:id/edit', editWeaponPost);

// GET - Delete a particular weapon type form
router.get('/:id/delete', deleteWeaponGet);

// POST - Delete a particular weapon type form
router.post('/:id/delete', deleteWeaponPost);

export default router;
