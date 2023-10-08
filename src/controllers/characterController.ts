import type { NextFunction, Request, Response } from 'express';
import Character from '../models/characterModel';
import { body, check, validationResult } from 'express-validator';
import multer from 'multer';
import Weapon from '../models/weaponModel';
import Vision from '../models/visionModel';
import fs from 'fs/promises';

const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, callback) => {
      callback(null, './dist/public/images');
    },
  }),
});

export const allCharactersGet = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const allCharacters = await Character.find().exec();
    res.render('allCharacters', {
      title: 'All Characters List',
      characters: allCharacters,
    });
  } catch (error) {
    next(error);
  }
};

export const singleCharacterGet = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const character = await Character.findById(req.params.id)
      .populate('Vision')
      .populate('Weapon')
      .orFail(new Error('Character not found!'));
    res.render('characterDetail', {
      title: character.name,
      character,
    });
  } catch (error) {
    next(error);
  }
};

export const addCharacterGet = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const [allWeapons, allVisions] = await Promise.all([Weapon.find().exec(), Vision.find().exec()]);
    res.render('characterForm', {
      title: 'Add Character',
      weapons: allWeapons,
      visions: allVisions,
    });
  } catch (error) {
    next(error);
  }
};

export const addCharacterPost = [
  upload.single('charImg'),
  body('charName').trim().notEmpty().withMessage('Character name is required.').escape(),
  body('description').trim().notEmpty().withMessage('Description is required.').escape(),
  body('vision').trim().notEmpty().withMessage('Vision must be selected.').escape(),
  body('rarity').trim().notEmpty().withMessage('Character rarity must be selected.').escape(),
  body('weapon').trim().notEmpty().withMessage('Weapon must be selected.').escape(),
  check('charImg')
    .custom((file, { req }) => req.file.mimetype === 'image/webp')
    .withMessage('Image format must be webp'),
  async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    const { name, description, vision, rarity, weapon } = req.body;
    const imgPath = req.file?.path;
    const character = new Character({
      name,
      description,
      vision,
      rarity,
      weapon,
      imgPath,
    });

    if (!errors.isEmpty()) {
      console.log(errors.array());
      const [allWeapons, allVisions] = await Promise.all([Weapon.find().exec(), Vision.find().exec()]);
      const selectedWeapon = allWeapons.map((weapon) => ({
        ...weapon.toObject(),
        selected: weapon.id === character.weapon,
      }));
      const selectedVision = allVisions.map((vision) => ({
        ...vision.toObject(),
        selected: vision.id === character.vision,
      }));
      res.render('characterForm', {
        title: 'Add Character',
        character,
        weapons: selectedWeapon,
        visions: selectedVision,
        errors: errors.array(),
      });
    } else {
      try {
        await character.save();
        res.redirect(character.url);
      } catch (error) {
        next(error);
      }
    }
  },
];

export const editCharacterGet = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const [character, allWeapons, allVisions] = await Promise.all([
      Character.findById(req.params.id).orFail(new Error('Character not found.')),
      Weapon.find().exec(),
      Vision.find().exec(),
    ]);
    res.render('characterForm', {
      title: 'Add Character',
      character,
      weapons: allWeapons,
      visions: allVisions,
    });
  } catch (error) {
    next(error);
  }
};

export const editCharacterPost = [
  upload.single('charImg'),
  body('charName').trim().notEmpty().withMessage('Character name is required.').escape(),
  body('description').trim().notEmpty().withMessage('Description is required.').escape(),
  body('vision').trim().notEmpty().withMessage('Vision must be selected.').escape(),
  body('rarity').trim().notEmpty().withMessage('Character rarity must be selected.').escape(),
  body('weapon').trim().notEmpty().withMessage('Weapon must be selected.').escape(),
  check('charImg')
    .custom((file, { req }) => req.file.mimetype === 'image/webp')
    .withMessage('Image format must be webp'),
  async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    const { name, description, vision, rarity, weapon } = req.body;
    const imgPath = req.file?.path;
    const character = new Character({
      name,
      description,
      vision,
      rarity,
      weapon,
      imgPath,
      _id: req.params.id,
    });

    if (!errors.isEmpty()) {
      console.log(errors.array());
      const [allWeapons, allVisions] = await Promise.all([Weapon.find().exec(), Vision.find().exec()]);
      const selectedWeapon = allWeapons.map((weapon) => ({
        ...weapon.toObject(),
        selected: weapon.id === character.weapon,
      }));
      const selectedVision = allVisions.map((vision) => ({
        ...vision.toObject(),
        selected: vision.id === character.vision,
      }));
      res.render('characterForm', {
        title: 'Add Character',
        character,
        weapons: selectedWeapon,
        visions: selectedVision,
        errors: errors.array(),
      });
    } else {
      try {
        const currentDetails = await Character.findById(req.params.id)
          .select('imgPath')
          .orFail(new Error('Character not found.'));
        if (currentDetails) {
          await fs.rm(currentDetails.imgPath, {
            force: true,
          });
        }
        await character.save();
        res.redirect(character.url);
      } catch (error) {
        next(error);
      }
    }
  },
];

export const deleteCharacterGet = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const character = await Character.findById(req.params.id).exec();
    if (character === null) res.redirect('/characters');
    res.render('characterDelete', {
      title: 'Delete Character',
      character,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteCharacterPost = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await Character.findByIdAndDelete(req.body.id);
    res.redirect('/characters');
  } catch (error) {
    next(error);
  }
};
