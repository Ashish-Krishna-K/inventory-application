import express from 'express';
import {
  addWeaponGet,
  addWeaponPost,
  allWeaponsGet,
  deleteWeaponGet,
  deleteWeaponPost,
  editWeaponGet,
  editWeaponPost,
} from '../controllers/weaponController';
const router = express.Router();

router.get('/', allWeaponsGet);

router.get('/create', addWeaponGet);

router.post('/create', addWeaponPost);

router.get('/:id/edit', editWeaponGet);

router.post('/:id/edit', editWeaponPost);

router.post('/:id/delete', deleteWeaponGet);

router.post('/:id/delete', deleteWeaponPost);
export default router;
