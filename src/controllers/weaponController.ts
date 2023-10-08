import { NextFunction, Request, Response } from 'express';
import Weapon from '../models/weaponModel';
import Character from '../models/characterModel';
import { body, validationResult } from 'express-validator';

export const allWeaponsGet = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const allWeapons = await Weapon.find().exec();
    const characterCounts = allWeapons.map(async (weapon) => {
      const count = await Character.countDocuments({ weapon: weapon.id }).exec();
      return {
        name: weapon.name,
        url: weapon.url,
        characterCount: count,
      };
    });
    res.render('allWeapons', {
      title: 'Weapons',
      weapons: characterCounts,
    });
  } catch (error) {
    next(error);
  }
};

export const singleWeaponCharactersGet = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const [weapon, characters] = await Promise.all([
      Weapon.findById(req.params.id).orFail(new Error('Weapon not found.')),
      Character.find({ weapon: req.params.id }).exec(),
    ]);
    res.render('weaponDetail', {
      title: weapon.name,
      weapon,
      characters,
    });
  } catch (error) {
    next(error);
  }
};

export const addWeaponGet = (req: Request, res: Response) => {
  res.render('weaponForm', {
    title: 'Add Weapon',
  });
};

export const addWeaponPost = [
  body('name').trim().notEmpty().withMessage('Weapon name is required').escape(),
  async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    const weapon = new Weapon({
      _name: req.body.name,
    });
    if (!errors.isEmpty()) {
      res.render('weaponForm', {
        title: 'Add Weapon',
        weapon,
        errors: errors.array(),
      });
    } else {
      try {
        await weapon.save();
        res.render(weapon.url);
      } catch (error) {
        next(error);
      }
    }
  },
];

export const editWeaponGet = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const weapon = await Weapon.findById(req.params.id).orFail(new Error('Weapon not found.'));
    res.render('weaponForm', {
      title: 'Edit Weapon',
      weapon,
    });
  } catch (error) {
    next(error);
  }
};

export const editWeaponPost = [
  body('name').trim().notEmpty().withMessage('Weapon name is required').escape(),
  async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    const weapon = new Weapon({
      _id: req.params.id,
      _name: req.body.name,
    });
    if (!errors.isEmpty()) {
      res.render('weaponForm', {
        title: 'Edit Weapon',
        weapon,
        errors: errors.array(),
      });
    } else {
      try {
        await weapon.save();
        res.render(weapon.url);
      } catch (error) {
        next(error);
      }
    }
  },
];

export const deleteWeaponGet = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const weapon = await Weapon.findById(req.params.id).exec();
    const characters = await Character.find({ weapon: req.params.id }).exec();
    if (weapon === null) res.redirect('/weapons');
    res.render('weaponDelete', {
      title: 'Delete Weapon',
      weapon,
      characters,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteWeaponPost = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const weapon = await Weapon.findById(req.params.id).exec();
    const characters = await Character.find({ vision: req.params.id }).exec();
    if (characters.length > 0) {
      res.render('visionDelete', {
        title: 'Delete Vision',
        weapon,
        characters,
      });
    }
    await Weapon.findByIdAndDelete(req.body.id).exec();
    res.redirect('/weapons');
  } catch (error) {
    next(error);
  }
};
