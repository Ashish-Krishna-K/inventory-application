import type { NextFunction, Request, Response } from 'express';
import Character from '../models/characterModel';
import Weapon from '../models/weaponModel';
import Vision from '../models/visionModel';

export const indexGet = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const [allCharactersCount, all5starsCount, all4starsCount, allweapons, allVisions] = await Promise.all([
      Character.countDocuments({}).exec(),
      Character.countDocuments({ _rarity: '5' }).exec(),
      Character.countDocuments({ _rarity: '4' }).exec(),
      Weapon.find().exec(),
      Vision.find().exec(),
    ]);
    // for each weapon type, count the number of characters associated with it
    const charactersByWeapon = await Promise.all(
      allweapons.map(async (weapon) => {
        const count = await Character.countDocuments({ weapon: weapon.id });
        return {
          name: weapon.name,
          count,
        };
      }),
    );
    // for each vision, count the number of characters associated with it
    const charactersByVision = await Promise.all(
      allVisions.map(async (vision) => {
        const count = await Character.countDocuments({ vision: vision.id });
        return {
          name: vision.name,
          count,
        };
      }),
    );
    res.render('index', {
      title: 'Home',
      allCharactersCount,
      all5starsCount,
      all4starsCount,
      allWeaponsCount: charactersByWeapon,
      allVisionsCount: charactersByVision,
    });
  } catch (error) {
    next(error);
  }
};
