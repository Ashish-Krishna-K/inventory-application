import { NextFunction, Request, Response } from 'express';
import Weapon from '../models/weaponModel';
import Character from '../models/characterModel';
import { body, validationResult } from 'express-validator';

export const allWeaponsGet = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const allWeapons = await Weapon.find().exec();
    // the map() function returns an array of promises, hence using promise.all to wait for it
    // to resolve.
    const characterCounts = await Promise.all(
      // For each weapon type count the number of characters with that particular weapon type.
      allWeapons.map(async (weapon) => {
        const count = await Character.countDocuments({ weapon: weapon.id }).exec();
        // Return an object with only the required elements to display
        return {
          name: weapon.name,
          url: weapon.url,
          characterCount: count,
        };
      }),
    );
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
    if (!errors.isEmpty()) {
      // errors exist return the form to user with errors.
      const errorWeapon = {
        name: req.body.name,
      };
      res.render('weaponForm', {
        title: 'Add Weapon',
        weapon: errorWeapon,
        errors: errors.array(),
      });
    } else {
      // No errors, save the details to database and redirect user to newly created
      // weapon's page
      const weapon = new Weapon({
        _name: req.body.name,
      });
      try {
        await weapon.save();
        res.redirect(weapon.url);
      } catch (error) {
        next(error);
      }
    }
  },
];

export const editWeaponGet = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // use the id in the request params to look up the weapon in the db or throw error if it's not found
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
    if (!errors.isEmpty()) {
      // errors exist return the form to user with errors
      const weapon = {
        id: req.params.id,
        name: req.body.name,
      };
      res.render('weaponForm', {
        title: 'Edit Weapon',
        weapon,
        errors: errors.array(),
      });
    } else {
      // errors doesn't exist, pull up the weapon from database and make the changes to the document and
      // finally redirect the user to the weapon detials page.
      try {
        const currentWeapon = await Weapon.findById(req.params.id).orFail(new Error('Weapon not found.'));
        currentWeapon._name = req.body.name;
        await currentWeapon.save();
        res.redirect(currentWeapon.url);
      } catch (error) {
        next(error);
      }
    }
  },
];

export const deleteWeaponGet = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Find the weapon using the id in the request params and all the characters with that weapon type.
    const weapon = await Weapon.findById(req.params.id).exec();
    const characters = await Character.find({ weapon: req.params.id }).exec();
    // Weapon doesn't exist redirect users back to all weapons page.
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
    const characters = await Character.find({ weapon: req.params.id }).exec();
    if (characters.length > 0) {
      // There is still some characters associated with this weapon type re-prompt user to
      // delete/edit those characters.
      res.render('weaponDelete', {
        title: 'Delete Weapon',
        weapon,
        characters,
      });
    }
    // There is no characters associated with the weapon type. Delete the weapon type and
    // redirect user to all weapons page.
    await Weapon.findByIdAndDelete(req.body.id).exec();
    res.redirect('/weapons');
  } catch (error) {
    next(error);
  }
};
