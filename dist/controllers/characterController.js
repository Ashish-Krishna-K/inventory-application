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
        // set the save path to the "public/images" folder.
        destination: (req, file, callback) => {
            callback(null, path_1.default.join(__dirname, '..', '..', 'public', 'images'));
        },
        // set a defined filename with the extension.
        filename: (req, file, callback) => {
            callback(null, `${new Date().toISOString()}${file.originalname}`);
        },
    }),
});
const deleteImage = (path) => __awaiter(void 0, void 0, void 0, function* () {
    const stat = yield promises_1.default.stat(path);
    if (stat) {
        // file exists proceed to delete it
        return yield promises_1.default.rm(path, {
            force: true,
        });
    }
    else {
        // file doesn't exist return the error
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
            // errors exist, return the form to user with errors
            const errorChar = {
                name: req.body.charName,
                rarity: req.body.rarity,
                description: req.body.description,
                vision: req.body.vision,
                weapon: req.body.weapon,
            };
            const [allWeapons, allVisions] = yield Promise.all([weaponModel_1.default.find().exec(), visionModel_1.default.find().exec()]);
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
        }
        else {
            // no errors, save the info to db and redirect user to newly created character page
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
            const [allWeapons, allVisions] = yield Promise.all([weaponModel_1.default.find().exec(), visionModel_1.default.find().exec()]);
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
        }
        else {
            // no errors, save the updated info and redirect user to the character details page
            try {
                const currentCharacter = yield characterModel_1.default.findById(req.params.id).orFail(new Error('Character not found.'));
                if (currentCharacter) {
                    // get the path to the image in the "public/images" folder
                    const pathToImg = path_1.default.join(__dirname, '..', '..', 'public', 'images', currentCharacter.imgPath);
                    // delete the current image
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
        // character doesn't exist redirect user to all characters page.
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
            // get path to the image in the "public/images" directory
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhcmFjdGVyQ29udHJvbGxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250cm9sbGVycy9jaGFyYWN0ZXJDb250cm9sbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUNBLDhFQUFpRDtBQUNqRCx5REFBa0U7QUFDbEUsb0RBQTRCO0FBQzVCLHdFQUEyQztBQUMzQyx3RUFBMkM7QUFDM0MsMkRBQTZCO0FBQzdCLGdEQUF3QjtBQUV4QixNQUFNLE1BQU0sR0FBRyxJQUFBLGdCQUFNLEVBQUM7SUFDcEIsT0FBTyxFQUFFLGdCQUFNLENBQUMsV0FBVyxDQUFDO1FBQzFCLG1EQUFtRDtRQUNuRCxXQUFXLEVBQUUsQ0FBQyxHQUFHLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxFQUFFO1lBQ25DLFFBQVEsQ0FBQyxJQUFJLEVBQUUsY0FBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsUUFBUSxDQUFDLENBQUMsQ0FBQztRQUN2RSxDQUFDO1FBQ0QsNkNBQTZDO1FBQzdDLFFBQVEsRUFBRSxDQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLEVBQUU7WUFDaEMsUUFBUSxDQUFDLElBQUksRUFBRSxHQUFHLElBQUksSUFBSSxFQUFFLENBQUMsV0FBVyxFQUFFLEdBQUcsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDLENBQUM7UUFDcEUsQ0FBQztLQUNGLENBQUM7Q0FDSCxDQUFDLENBQUM7QUFFSCxNQUFNLFdBQVcsR0FBRyxDQUFPLElBQVksRUFBRSxFQUFFO0lBQ3pDLE1BQU0sSUFBSSxHQUFHLE1BQU0sa0JBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDakMsSUFBSSxJQUFJLEVBQUU7UUFDUixtQ0FBbUM7UUFDbkMsT0FBTyxNQUFNLGtCQUFFLENBQUMsRUFBRSxDQUFDLElBQUksRUFBRTtZQUN2QixLQUFL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