"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCharacterPost = exports.deleteCharacterGet = exports.editCharacterPost = exports.editCharacterGet = exports.addCharacterPost = exports.addCharacterGet = exports.singleCharacterGet = exports.allCharactersGet = void 0;
const characterModel_1 = __importDefault(require("../models/characterModel"));
const express_validator_1 = require("express-validator");
const multer_1 = __importDefault(require("multer"));
const weaponModel_1 = __importDefault(require("../models/weaponModel"));
const visionModel_1 = __importDefault(require("../models/visionModel"));
const promises_1 = __importDefault(require("fs/promises"));
const path_1 = __importDefault(require("path"));
const upload = (0, multer_1.default)({
    storage: multer_1.default.diskStorage({
        destination: (req, file, callback) => {
            callback(null, path_1.default.join(__dirname, '..', '..', 'public', 'images'));
        },
        filename: (req, file, callback) => {
            callback(null, `${new Date().toISOString()}${file.originalname}`);
        },
    }),
});
const deleteImage = (path) => __awaiter(void 0, void 0, void 0, function* () {
    const stat = yield promises_1.default.stat(path);
    if (stat) {
        return yield promises_1.default.rm(path, {
            force: true,
        });
    }
    else {
        return stat;
    }
});
const allCharactersGet = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allCharacters = yield characterModel_1.default.find().exec();
        res.render('allCharacters', {
            title: 'All Characters List',
            characters: allCharacters,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.allCharactersGet = allCharactersGet;
const singleCharacterGet = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const character = yield characterModel_1.default.findById(req.params.id)
            .populate('vision')
            .populate('weapon')
            .orFail(new Error('Character not found!'));
        res.render('characterDetail', {
            title: character.name,
            character,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.singleCharacterGet = singleCharacterGet;
const addCharacterGet = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [allWeapons, allVisions] = yield Promise.all([weaponModel_1.default.find().exec(), visionModel_1.default.find().exec()]);
        res.render('characterForm', {
            title: 'Add Character',
            weapons: allWeapons,
            visions: allVisions,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.addCharacterGet = addCharacterGet;
exports.addCharacterPost = [
    upload.single('charImg'),
    (0, express_validator_1.body)('charName').trim().notEmpty().withMessage('Character name is required.').escape(),
    (0, express_validator_1.body)('description').trim().notEmpty().withMessage('Description is required.').escape(),
    (0, express_validator_1.body)('vision').trim().notEmpty().withMessage('Vision must be selected.').escape(),
    (0, express_validator_1.body)('rarity').trim().notEmpty().withMessage('Character rarity must be selected.').escape(),
    (0, express_validator_1.body)('weapon').trim().notEmpty().withMessage('Weapon must be selected.').escape(),
    (0, express_validator_1.check)('charImg')
        .custom((file, { req }) => req.file.mimetype === 'image/webp')
        .withMessage('Image format must be webp'),
    (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            const errorChar = {
                name: req.body.charName,
                rarity: req.body.rarity,
                description: req.body.description,
                vision: req.body.vision,
                weapon: req.body.weapon,
            };
            const [allWeapons, allVisions] = yield Promise.all([weaponModel_1.default.find().exec(), visionModel_1.default.find().exec()]);
            const selectedWeapon = allWeapons.map((weapon) => ({
                id: weapon.id,
                name: weapon.name,
                selected: weapon.id === errorChar.weapon,
            }));
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
        }
        else {
            const imgPath = (_a = req.file) === null || _a === void 0 ? void 0 : _a.filename;
            const character = new characterModel_1.default({
                _name: req.body.charName,
                rarity: req.body.rarity,
                description: req.body.description,
                vision: req.body.vision,
                weapon: req.body.weapon,
                imgPath,
            });
            try {
                yield character.save();
                res.redirect(character.url);
            }
            catch (error) {
                next(error);
            }
        }
    }),
];
const editCharacterGet = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [character, allWeapons, allVisions] = yield Promise.all([
            characterModel_1.default.findById(req.params.id).orFail(new Error('Character not found.')),
            weaponModel_1.default.find().exec(),
            visionModel_1.default.find().exec(),
        ]);
        res.render('characterForm', {
            title: 'Edit Character',
            character,
            weapons: allWeapons,
            visions: allVisions,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.editCharacterGet = editCharacterGet;
exports.editCharacterPost = [
    upload.single('charImg'),
    (0, express_validator_1.body)('charName').trim().notEmpty().withMessage('Character name is required.').escape(),
    (0, express_validator_1.body)('description').trim().notEmpty().withMessage('Description is required.').escape(),
    (0, express_validator_1.body)('vision').trim().notEmpty().withMessage('Vision must be selected.').escape(),
    (0, express_validator_1.body)('rarity').trim().notEmpty().withMessage('Character rarity must be selected.').escape(),
    (0, express_validator_1.body)('weapon').trim().notEmpty().withMessage('Weapon must be selected.').escape(),
    (0, express_validator_1.check)('charImg')
        .custom((file, { req }) => req.file.mimetype === 'image/webp')
        .withMessage('Image format must be webp'),
    (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        var _b;
        const errors = (0, express_validator_1.validationResult)(req);
        const imgPath = (_b = req.file) === null || _b === void 0 ? void 0 : _b.filename;
        const character = {
            id: req.params.id,
            name: req.body.charName,
            rarity: req.body.rarity,
            description: req.body.description,
            vision: req.body.vision,
            weapon: req.body.weapon,
            imgPath,
        };
        if (!errors.isEmpty()) {
            const [allWeapons, allVisions] = yield Promise.all([weaponModel_1.default.find().exec(), visionModel_1.default.find().exec()]);
            const selectedWeapon = allWeapons.map((weapon) => ({
                id: weapon.id,
                name: weapon.name,
                selected: weapon.id === character.weapon,
            }));
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
        }
        else {
            try {
                const currentCharacter = yield characterModel_1.default.findById(req.params.id).orFail(new Error('Character not found.'));
                if (currentCharacter) {
                    const pathToImg = path_1.default.join(__dirname, '..', '..', 'public', 'images', currentCharacter.imgPath);
                    yield deleteImage(pathToImg);
                }
                currentCharacter._name = req.body.charName;
                currentCharacter.rarity = req.body.rarity;
                currentCharacter.description = req.body.description;
                currentCharacter.vision = req.body.vision;
                currentCharacter.weapon = req.body.weapon;
                currentCharacter.imgPath = req.body.imgPath;
                yield currentCharacter.save();
                res.redirect(currentCharacter.url);
            }
            catch (error) {
                next(error);
            }
        }
    }),
];
const deleteCharacterGet = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const character = yield characterModel_1.default.findById(req.params.id).exec();
        if (character === null)
            res.redirect('/characters');
        res.render('characterDelete', {
            title: 'Delete Character',
            character,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.deleteCharacterGet = deleteCharacterGet;
const deleteCharacterPost = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const currentCharacter = yield characterModel_1.default.findById(req.body.id).select('imgPath').exec();
        if (currentCharacter) {
            const pathToImg = path_1.default.join(__dirname, '..', '..', 'public', 'images', currentCharacter.imgPath);
            yield deleteImage(pathToImg);
        }
        yield characterModel_1.default.findByIdAndDelete(req.body.id).exec();
        res.redirect('/characters');
    }
    catch (error) {
        next(error);
    }
});
exports.deleteCharacterPost = deleteCharacterPost;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhcmFjdGVyQ29udHJvbGxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250cm9sbGVycy9jaGFyYWN0ZXJDb250cm9sbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUNBLDhFQUFpRDtBQUNqRCx5REFBa0U7QUFDbEUsb0RBQTRCO0FBQzVCLHdFQUEyQztBQUMzQyx3RUFBMkM7QUFDM0MsMkRBQTZCO0FBQzdCLGdEQUF3QjtBQUV4QixNQUFNLE1BQU0sR0FBRyxJQUFBLGdCQUFNLEVBQUM7SUFDcEIsT0FBTyxFQUFFLGdCQUFNLENBQUMsV0FBVyxDQUFDO1FBQzFCLFdBQVcsRUFBRSxDQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLEVBQUU7WUFDbkMsUUFBUSxDQUFDLElBQUksRUFBRSxjQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxRQUFRLENBQUMsQ0FBQyxDQUFDO1FBQ3ZFLENBQUM7UUFDRCxRQUFRLEVBQUUsQ0FBQyxHQUFHLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxFQUFFO1lBQ2hDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDLFdBQVcsRUFBRSxHQUFHLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQyxDQUFDO1FBQ3BFLENBQUM7S0FDRixDQUFDO0NBQ0gsQ0FBQyxDQUFDO0FBRUgsTUFBTSxXQUFXLEdBQUcsQ0FBTyxJQUFZLEVBQUUsRUFBRTtJQUN6QyxNQUFNLElBQUksR0FBRyxNQUFNLGtCQUFFLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2pDLElBQUksSUFBSSxFQUFFO1FBQ1IsT0FBTyxNQUFNLGtCQUFFLENBQUMsRUFBRSxDQUFDLElBQUksRUFBRTtZQUN2QixLQUFLLEVBQUUsSUFBSTtTQUNaLENBQUMsQ0FBQztLQUNKO1NBQU07UUFD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