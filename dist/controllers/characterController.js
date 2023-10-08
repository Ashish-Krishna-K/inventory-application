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
exports.deleteCharacterPost =
  exports.deleteCharacterGet =
  exports.editCharacterPost =
  exports.editCharacterGet =
  exports.addCharacterPost =
  exports.addCharacterGet =
  exports.singleCharacterGet =
  exports.allCharactersGet =
    void 0;
const characterModel_1 = __importDefault(require('../models/characterModel'));
const express_validator_1 = require('express-validator');
const multer_1 = __importDefault(require('multer'));
const weaponModel_1 = __importDefault(require('../models/weaponModel'));
const visionModel_1 = __importDefault(require('../models/visionModel'));
const promises_1 = __importDefault(require('fs/promises'));
const storage = multer_1.default.diskStorage({
  destination: (req, file, callback) => {
    callback(null, './dist/public/images/');
  },
  filename: (req, file, callback) => {
    callback(null, 'uploadedImg.webp');
  },
});
const upload = (0, multer_1.default)({
  storage: storage,
  fileFilter: (req, file, callback) => {
    if (file.mimetype !== 'image/webp') {
      callback(new Error('Image format must be webp'));
    } else {
      callback(null, true);
    }
  },
});
const getImgName = (name) => {
  let url = '';
  const nameArray = name.split(' ');
  if (nameArray.length < 2) url = name.toLowerCase();
  url = nameArray.map((word) => word.toLowerCase()).join('_');
  return url;
};
const allCharactersGet = (req, res, next) =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      const allCharacters = yield characterModel_1.default.find().exec();
      res.render('allCharacters', {
        title: 'All Characters List',
        characters: allCharacters,
      });
    } catch (error) {
      next(error);
    }
  });
exports.allCharactersGet = allCharactersGet;
const singleCharacterGet = (req, res, next) =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      const character = yield characterModel_1.default
        .findById(req.params.id)
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
  });
exports.singleCharacterGet = singleCharacterGet;
const addCharacterGet = (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const [allWeapons, allVisions] = yield Promise.all([
      weaponModel_1.default.find().exec(),
      visionModel_1.default.find().exec(),
    ]);
    res.render('addCharacterForm', {
      title: 'Add Character',
      weapons: allWeapons,
      visions: allVisions,
    });
  });
exports.addCharacterGet = addCharacterGet;
exports.addCharacterPost = [
  upload.single('charImg'),
  (0, express_validator_1.body)('charName').trim().notEmpty().withMessage('Character name is required.').escape(),
  (0, express_validator_1.body)('description').trim().notEmpty().withMessage('Description is required.').escape(),
  (0, express_validator_1.body)('vision').trim().notEmpty().withMessage('Vision must be selected.').escape(),
  (0, express_validator_1.body)('rarity').trim().notEmpty().withMessage('Character rarity must be selected.').escape(),
  (0, express_validator_1.body)('weapon').trim().notEmpty().withMessage('Weapon must be selected.').escape(),
  (req, res, next) =>
    __awaiter(void 0, void 0, void 0, function* () {
      const errors = (0, express_validator_1.validationResult)(req);
      const { name, description, vision, rarity, weapon } = req.body;
      const character = new characterModel_1.default({
        name,
        description,
        vision,
        rarity,
        weapon,
      });
      if (!errors.isEmpty()) {
        console.log(errors.array());
        const [allWeapons, allVisions] = yield Promise.all([
          weaponModel_1.default.find().exec(),
          visionModel_1.default.find().exec(),
        ]);
        const selectedWeapon = allWeapons.map((weapon) =>
          Object.assign(Object.assign({}, weapon.toObject()), { selected: weapon.id === character.weapon }),
        );
        const selectedVision = allVisions.map((vision) =>
          Object.assign(Object.assign({}, vision.toObject()), { selected: vision.id === character.vision }),
        );
        res.render('addCharacterForm', {
          title: 'Add Character',
          character,
          weapons: selectedWeapon,
          visions: selectedVision,
          errors: errors.array(),
        });
      } else {
        try {
          yield promises_1.default.rename(
            '../public/images/uploadedImg.webp',
            `../public/images/${getImgName(name)}.webp`,
          );
          yield character.save();
          res.redirect(character.url);
        } catch (error) {
          next(error);
        }
      }
    }),
];
const editCharacterGet = (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    // Implement edit character get
  });
exports.editCharacterGet = editCharacterGet;
const editCharacterPost = (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    // Implement edit character post
  });
exports.editCharacterPost = editCharacterPost;
const deleteCharacterGet = (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    // Implement delete character get
  });
exports.deleteCharacterGet = deleteCharacterGet;
const deleteCharacterPost = (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    // Implement delete character post
  });
exports.deleteCharacterPost = deleteCharacterPost;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhcmFjdGVyQ29udHJvbGxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250cm9sbGVycy9jaGFyYWN0ZXJDb250cm9sbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUNBLDhFQUFpRDtBQUNqRCx5REFBMkQ7QUFDM0Qsb0RBQTRCO0FBQzVCLHdFQUEyQztBQUMzQyx3RUFBMkM7QUFDM0MsMkRBQTZCO0FBRTdCLE1BQU0sT0FBTyxHQUFHLGdCQUFNLENBQUMsV0FBVyxDQUFDO0lBQ2pDLFdBQVcsRUFBRSxDQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLEVBQUU7UUFDbkMsUUFBUSxDQUFDLElBQUksRUFBRSx1QkFBdUIsQ0FBQyxDQUFDO0lBQzFDLENBQUM7SUFDRCxRQUFRLEVBQUUsQ0FBQyxHQUFHLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxFQUFFO1FBQ2hDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsa0JBQWtCLENBQUMsQ0FBQztJQUNyQyxDQUFDO0NBQ0YsQ0FBQyxDQUFDO0FBRUgsTUFBTSxNQUFNLEdBQUcsSUFBQSxnQkFBTSxFQUFDO0lBQ3BCLE9BQU8sRUFBRSxPQUFPO0lBQ2hCLFVBQVUsRUFBRSxDQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLEVBQUU7UUFDbEMsSUFBSSxJQUFJLENBQUMsUUFBUSxLQUFLLFlBQVksRUFBRTtZQUNsQyxRQUFRLENBQUMsSUFBSSxLQUFLLENBQUMsMkJBQTJCLENBQUMsQ0FBQyxDQUFDO1NBQ2xEO2FBQU07WUFDTCxRQUFRLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO1NBQ3RCO0lBQ0gsQ0FBQztDQUNGLENBQUMsQ0FBQztBQUVILE1BQU0sVUFBVSxHQUFHLENBQUMsSUFBWSxFQUFFLEVBQUU7SUFDbEMsSUFBSSxHQUFHLEdBQUcsRUFBRSxDQUFDO0lBRWIsTUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFD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
