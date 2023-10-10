'use strict';
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.deleteVisionPost =
  exports.deleteVisionGet =
  exports.editVisionPost =
  exports.editVisionGet =
  exports.addVisionPost =
  exports.addVisionGet =
  exports.singleVisionCharactersGet =
  exports.allVisionsGet =
    void 0;
const visionModel_1 = __importDefault(require('../models/visionModel'));
const characterModel_1 = __importDefault(require('../models/characterModel'));
const express_validator_1 = require('express-validator');
const allVisionsGet = (req, res, next) =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      const allVisions = yield visionModel_1.default.find().exec();
      const characterCounts = yield Promise.all(
        allVisions.map((vision) =>
          __awaiter(void 0, void 0, void 0, function* () {
            const count = yield characterModel_1.default.countDocuments({ vision: vision.id }).exec();
            return {
              name: vision.name,
              url: vision.url,
              characterCount: count,
            };
          }),
        ),
      );
      res.render('allVisions', {
        title: 'Visions',
        visions: characterCounts,
      });
    } catch (error) {
      next(error);
    }
  });
exports.allVisionsGet = allVisionsGet;
const singleVisionCharactersGet = (req, res, next) =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      const [vision, characters] = yield Promise.all([
        visionModel_1.default.findById(req.params.id).orFail(new Error('Vision not found.')),
        characterModel_1.default.find({ vision: req.params.id }).exec(),
      ]);
      res.render('visionDetail', {
        title: vision.name,
        vision,
        characters,
      });
    } catch (error) {
      next(error);
    }
  });
exports.singleVisionCharactersGet = singleVisionCharactersGet;
const addVisionGet = (req, res) => {
  res.render('visionForm', {
    title: 'Add Vision',
  });
};
exports.addVisionGet = addVisionGet;
exports.addVisionPost = [
  (0, express_validator_1.body)('name').trim().notEmpty().withMessage('Vision name is required').escape(),
  (0, express_validator_1.body)('description').trim().notEmpty().withMessage('Description is required').escape(),
  (req, res, next) =>
    __awaiter(void 0, void 0, void 0, function* () {
      const errors = (0, express_validator_1.validationResult)(req);
      if (!errors.isEmpty()) {
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
        const vision = new visionModel_1.default({
          _name: req.body.name,
          description: req.body.description,
        });
        try {
          yield vision.save();
          res.redirect(vision.url);
        } catch (error) {
          next(error);
        }
      }
    }),
];
const editVisionGet = (req, res, next) =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      const vision = yield visionModel_1.default.findById(req.params.id).orFail(new Error('Vision not found.'));
      res.render('visionForm', {
        title: 'Edit Vision',
        vision,
      });
    } catch (error) {
      next(error);
    }
  });
exports.editVisionGet = editVisionGet;
exports.editVisionPost = [
  (0, express_validator_1.body)('name').trim().notEmpty().withMessage('Vision name is required').escape(),
  (0, express_validator_1.body)('description').trim().notEmpty().withMessage('Description is required').escape(),
  (req, res, next) =>
    __awaiter(void 0, void 0, void 0, function* () {
      const errors = (0, express_validator_1.validationResult)(req);
      const vision = {
        id: req.params.id,
        name: req.body.name,
        description: req.body.description,
      };
      if (!errors.isEmpty()) {
        res.render('visionForm', {
          title: 'Edit Vision',
          vision,
          errors: errors.array(),
        });
      } else {
        try {
          const currentVision = yield visionModel_1.default
            .findById(req.params.id)
            .orFail(new Error('Vision not found.'));
          currentVision._name = req.body.name;
          currentVision.description = req.body.description;
          yield currentVision.save();
          res.redirect(currentVision.url);
        } catch (error) {
          next(error);
        }
      }
    }),
];
const deleteVisionGet = (req, res, next) =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      const vision = yield visionModel_1.default.findById(req.params.id).exec();
      const characters = yield characterModel_1.default.find({ vision: req.params.id }).exec();
      if (vision === null) res.redirect('/visions');
      res.render('visionDelete', {
        title: 'Delete Vision',
        vision,
        characters,
      });
    } catch (error) {
      next(error);
    }
  });
exports.deleteVisionGet = deleteVisionGet;
const deleteVisionPost = (req, res, next) =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      const vision = yield visionModel_1.default.findById(req.params.id).exec();
      const characters = yield characterModel_1.default.find({ vision: req.params.id }).exec();
      if (characters.length > 0) {
        res.render('visionDelete', {
          title: 'Delete Vision',
          vision,
          characters,
        });
      }
      yield visionModel_1.default.findByIdAndDelete(req.body.id).exec();
      res.redirect('/visions');
    } catch (error) {
      next(error);
    }
  });
exports.deleteVisionPost = deleteVisionPost;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlzaW9uQ29udHJvbGxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250cm9sbGVycy92aXNpb25Db250cm9sbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUNBLHdFQUEyQztBQUMzQyw4RUFBaUQ7QUFDakQseURBQTJEO0FBRXBELE1BQU0sYUFBYSxHQUFHLENBQU8sR0FBWSxFQUFFLEdBQWEsRUFBRSxJQUFrQixFQUFFLEVBQUU7SUFDckYsSUFBSTtRQUNGLE1BQU0sVUFBVSxHQUFHLE1BQU0scUJBQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUM5QyxNQUFNLGVBQWUsR0FBRyxNQUFNLE9BQU8sQ0FBQyxHQUFHLENBQ3ZDLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBTyxNQUFNLEVBQUUsRUFBRTtZQUM5QixNQUFNLEtBQUssR0FBRyxNQUFNLHdCQUFTLENBQUMsY0FBYyxDQUFDLEVBQUUsTUFBTSxFQUFFLE1BQU0sQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO1lBQzNFLE9BQU87Z0JBQ0wsSUFBSSxFQUFFLE1BQU0sQ0FBQyxJQUFJO2dCQUNqQixHQUFHLEVBQUUsTUFBTSxDQUFDLEdBQUc7Z0JBQ2YsY0FBYyxFQUFFLEtBQUs7YUFDdEIsQ0FBQztRQUNKLENBQUMsQ0FBQSxDQUFDLENBQ0gsQ0FBQztRQUNGLEdBQUcsQ0FBQyxNQUFNLENBQUMsWUFBWSxFQUFFO1lBQ3ZCLEtBQUssRUFBRSxTQUFTO1lBQ2hCLE9BQU8sRUFBRSxlQUFlO1NBQ3pCLENBQUMsQ0FBQztLQUNKO0lBQUMsT0FBTyxLQUFLLEVBQUU7UUFDZCxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7S0FDYjtBQUNILENBQUMsQ0FBQSxDQUFDO0FBcEJXLFFBQUEsYUFBYSxpQkFvQnhCO0FBRUssTUFBTSx5QkFBeUIsR0FBRyxDQUFPLEdBQVksRUFBRSxHQUFhLEVB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
