import type { NextFunction, Request, Response } from 'express';
import Character from '../models/characterModel';
import { body, check, validationResult } from 'express-validator';
import multer from 'multer';
import Weapon from '../models/weaponModel';
import Vision from '../models/visionModel';
import fs from 'fs/promises';
import path from 'path';

const upload = multer({
  storage: multer.diskStorage({
    // set the save path to the "public/images" folder.
    destination: (req, file, callback) => {
      callback(null, path.join(__dirname, '..', '..', 'public', 'images'));
    },
    // set a defined filename with the extension.
    filename: (req, file, callback) => {
      callback(null, `${new Date().toISOString()}${file.originalname}`);
    },
  }),
});

const deleteImage = async (path: string) => {
  const stat = await fs.stat(path);
  if (stat) {
    // file exists proceed to delete it
    return await fs.rm(path, {
      force: true,
    });
  } else {
    // file doesn't exist return the error
    return stat;
  }
};

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
      .populate('vision')
      .populate('weapon')
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
    if (!errors.isEmpty()) {
      // errors exist, return the form to user with errors
      const errorChar = {
        name: req.body.charName,
        rarity: req.body.rarity,
        description: req.body.description,
        vision: req.body.vision,
        weapon: req.body.weapon,
      };
      const [allWeapons, allVisions] = await Promise.all([Weapon.find().exec(), Vision.find().exec()]);
      // create a new object for the weapon indicating if the weapon was selected by the user,
      // return only the fields required for displaying.
      const selectedWeapon = allWeapons.map((weapon) => ({
        id: weapon.id,
        name: weapon.name,
        selected: weapon.id === errorChar.weapon,
      }));
      // create a new object for the vision indicating if the vision was selected by the user,
      // return only the fields required for displaying.
      const selectedVision = allVisions.map((vision) => ({
        id: vision.id,
        name: vision.name,
        selected: vision.id === errorChar.vision,
      }));
      res.render('characterForm', {
        title: 'Add Character',
        character: errorChar,
        weapons: selectedWeapon,
        visions: selectedVision,
        errors: errors.array(),
      });
    } else {
      // no errors, save the info to db and redirect user to newly created character page
      const imgPath = req.file?.filename;
      const character = new Character({
        _name: req.body.charName,
        rarity: req.body.rarity,
        description: req.body.description,
        vision: req.body.vision,
        weapon: req.body.weapon,
        imgPath,
      });
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
      title: 'Edit Character',
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
    const imgPath = req.file?.filename;

    if (!errors.isEmpty()) {
      // errors exist, return the form to user with errors
      const character = {
        id: req.params.id,
        name: req.body.charName,
        rarity: req.body.rarity,
        description: req.body.description,
        vision: req.body.vision,
        weapon: req.body.weapon,
        imgPath,
      };
      const [allWeapons, allVisions] = await Promise.all([Weapon.find().exec(), Vision.find().exec()]);
      // create a new object for the weapon indicating if the weapon was selected by the user,
      // return only the fields required for displaying.
      const selectedWeapon = allWeapons.map((weapon) => ({
        id: weapon.id,
        name: weapon.name,
        selected: weapon.id === character.weapon,
      }));
      // create a new object for the vision indicating if the vision was selected by the user,
      // return only the fields required for displaying.
      const selectedVision = allVisions.map((vision) => ({
        id: vision.id,
        name: vision.name,
        selected: vision.id === character.vision,
      }));
      res.render('characterForm', {
        title: 'Edit Character',
        character,
        weapons: selectedWeapon,
        visions: selectedVision,
        errors: errors.array(),
      });
    } else {
      // no errors, save the updated info and redirect user to the character details page
      try {
        const currentCharacter = await Character.findById(req.params.id).orFail(new Error('Character not found.'));
        if (currentCharacter) {
          // get the path to the image in the "public/images" folder
          const pathToImg = path.join(__dirname, '..', '..', 'public', 'images', currentCharacter.imgPath);
          // delete the current image
          await deleteImage(pathToImg);
        }
        currentCharacter._name = req.body.charName;
        currentCharacter.rarity = req.body.rarity;
        currentCharacter.description = req.body.description;
        currentCharacter.vision = req.body.vision;
        currentCharacter.weapon = req.body.weapon;
        currentCharacter.imgPath = req.body.imgPath!;
        await currentCharacter.save();
        res.redirect(currentCharacter.url);
      } catch (error) {
        next(error);
      }
    }
  },
];

export const deleteCharacterGet = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const character = await Character.findById(req.params.id).exec();
    // character doesn't exist redirect user to all characters page.
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
    const currentCharacter = await Character.findById(req.body.id).select('imgPath').exec();
    if (currentCharacter) {
      // get path to the image in the "public/images" directory
      const pathToImg = path.join(__dirname, '..', '..', 'public', 'images', currentCharacter.imgPath);
      await deleteImage(pathToImg);
    }
    await Character.findByIdAndDelete(req.body.id).exec();
    res.redirect('/characters');
  } catch (error) {
    next(error);
  }
};
