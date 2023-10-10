import { NextFunction, Request, Response } from 'express';
import Vision from '../models/visionModel';
import Character from '../models/characterModel';
import { body, validationResult } from 'express-validator';

export const allVisionsGet = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const allVisions = await Vision.find().exec();
    // map() function returns an array of promises, hence using Promie.all to await the
    // resolution of the promises.
    const characterCounts = await Promise.all(
      // Get the count of characters for each vision.
      allVisions.map(async (vision) => {
        const count = await Character.countDocuments({ vision: vision.id }).exec();
        // return an object with only the required elements for displaying
        return {
          name: vision.name,
          url: vision.url,
          characterCount: count,
        };
      }),
    );
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
    if (!errors.isEmpty()) {
      // Errors exist, return form to user with errors.
      const errorVision = {
        name: req.body.name,
        description: req.body.description,
      };
      res.render('visionForm', {
        title: 'Add Vision',
        vision: errorVision,
        errors: errors.array(),
      });
    } else {
      // no errors, save the vision and redirect user to newly created vision details.
      const vision = new Vision({
        _name: req.body.name,
        description: req.body.description,
      });
      try {
        await vision.save();
        res.redirect(vision.url);
      } catch (error) {
        next(error);
      }
    }
  },
];

export const editVisionGet = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // pull up the vision using the id in the request params or throw error if it's not found.
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
    if (!errors.isEmpty()) {
      // errors exist, return form to user with the errors.
      const vision = {
        id: req.params.id,
        name: req.body.name,
        description: req.body.description,
      };
      res.render('visionForm', {
        title: 'Edit Vision',
        vision,
        errors: errors.array(),
      });
    } else {
      // no errors, pull up the vision using the id in the request params, save the updated info and
      // redirect user to vision detail page.
      try {
        const currentVision = await Vision.findById(req.params.id).orFail(new Error('Vision not found.'));
        currentVision._name = req.body.name;
        currentVision.description = req.body.description;
        await currentVision.save();
        res.redirect(currentVision.url);
      } catch (error) {
        next(error);
      }
    }
  },
];

export const deleteVisionGet = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // get the vision and all associated characters from the id in the req params
    const vision = await Vision.findById(req.params.id).exec();
    const characters = await Character.find({ vision: req.params.id }).exec();
    // vision doesn't exist, redirect user to all visions page
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
      // There is still some characters associated with the vision, re-prompt user to
      // edit/delete the characters
      res.render('visionDelete', {
        title: 'Delete Vision',
        vision,
        characters,
      });
    }
    // No characters are associated with the vision, delete the vision and redirect
    // user to all visions page.
    await Vision.findByIdAndDelete(req.body.id).exec();
    res.redirect('/visions');
  } catch (error) {
    next(error);
  }
};
