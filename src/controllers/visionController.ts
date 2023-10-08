import { NextFunction, Request, Response } from 'express';
import Vision from '../models/visionModel';
import Character from '../models/characterModel';
import { body, validationResult } from 'express-validator';

export const allVisionsGet = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const allVisions = await Vision.find().exec();
    const characterCounts = allVisions.map(async (vision) => {
      const count = await Character.countDocuments({ vision: vision.id }).exec();
      return {
        name: vision.name,
        url: vision.url,
        characterCount: count,
      };
    });
    res.render('allVisions', {
      title: 'Visions',
      visions: characterCounts,
    });
  } catch (error) {
    next(error);
  }
};

export const singleVisionCharactersGet = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const [vision, characters] = await Promise.all([
      Vision.findById(req.params.id).orFail(new Error('Vision not found.')),
      Character.find({ vision: req.params.id }).exec(),
    ]);
    res.render('visionDetail', {
      title: vision.name,
      vision,
      characters,
    });
  } catch (error) {
    next(error);
  }
};

export const addVisionGet = (req: Request, res: Response) => {
  res.render('visionForm', {
    title: 'Add Vision',
  });
};

export const addVisionPost = [
  body('name').trim().notEmpty().withMessage('Vision name is required').escape(),
  body('description').trim().notEmpty().withMessage('Description is required').escape(),
  async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    const vision = new Vision({
      _name: req.body.name,
      description: req.body.description,
    });
    if (!errors.isEmpty()) {
      res.render('visionForm', {
        title: 'Add Vision',
        vision,
        errors: errors.array(),
      });
    } else {
      try {
        await vision.save();
        res.render(vision.url);
      } catch (error) {
        next(error);
      }
    }
  },
];

export const editVisionGet = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const vision = await Vision.findById(req.params.id).orFail(new Error('Vision not found.'));
    res.render('visionForm', {
      title: 'Edit Vision',
      vision,
    });
  } catch (error) {
    next(error);
  }
};

export const editVisionPost = [
  body('name').trim().notEmpty().withMessage('Vision name is required').escape(),
  body('description').trim().notEmpty().withMessage('Description is required').escape(),
  async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    const vision = new Vision({
      _id: req.params.id,
      _name: req.body.name,
      description: req.body.description,
    });
    if (!errors.isEmpty()) {
      res.render('visionForm', {
        title: 'Edit Vision',
        vision,
        errors: errors.array(),
      });
    } else {
      try {
        await vision.save();
        res.render(vision.url);
      } catch (error) {
        next(error);
      }
    }
  },
];

export const deleteVisionGet = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const vision = await Vision.findById(req.params.id).exec();
    const characters = await Character.find({ vision: req.params.id }).exec();
    if (vision === null) res.redirect('/visions');
    res.render('visionDelete', {
      title: 'Delete Vision',
      vision,
      characters,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteVisionPost = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const vision = await Vision.findById(req.params.id).exec();
    const characters = await Character.find({ vision: req.params.id }).exec();
    if (characters.length > 0) {
      res.render('visionDelete', {
        title: 'Delete Vision',
        vision,
        characters,
      });
    }
    await Vision.findByIdAndDelete(req.body.id).exec();
    res.redirect('/visions');
  } catch (error) {
    next(error);
  }
};
