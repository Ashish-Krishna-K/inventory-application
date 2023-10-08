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
const upload = (0, multer_1.default)({
    storage: multer_1.default.diskStorage({
        destination: (req, file, callback) => {
            callback(null, './dist/public/images');
        },
    }),
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
            .populate('Vision')
            .populate('Weapon')
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
        const { name, description, vision, rarity, weapon } = req.body;
        const imgPath = (_a = req.file) === null || _a === void 0 ? void 0 : _a.path;
        const character = new characterModel_1.default({
            _name: name,
            _rarity: rarity,
            description,
            vision,
            weapon,
            imgPath,
        });
        if (!errors.isEmpty()) {
            const [allWeapons, allVisions] = yield Promise.all([weaponModel_1.default.find().exec(), visionModel_1.default.find().exec()]);
            const selectedWeapon = allWeapons.map((weapon) => (Object.assign(Object.assign({}, weapon.toObject()), { selected: weapon.id === character.weapon })));
            const selectedVision = allVisions.map((vision) => (Object.assign(Object.assign({}, vision.toObject()), { selected: vision.id === character.vision })));
            res.render('characterForm', {
                title: 'Add Character',
                character,
                weapons: selectedWeapon,
                visions: selectedVision,
                errors: errors.array(),
            });
        }
        else {
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
        const { name, description, vision, rarity, weapon } = req.body;
        const imgPath = (_b = req.file) === null || _b === void 0 ? void 0 : _b.path;
        const character = new characterModel_1.default({
            _id: req.params.id,
            _name: name,
            _rarity: rarity,
            description,
            vision,
            weapon,
            imgPath,
        });
        if (!errors.isEmpty()) {
            const [allWeapons, allVisions] = yield Promise.all([weaponModel_1.default.find().exec(), visionModel_1.default.find().exec()]);
            const selectedWeapon = allWeapons.map((weapon) => (Object.assign(Object.assign({}, weapon.toObject()), { selected: weapon.id === character.weapon })));
            const selectedVision = allVisions.map((vision) => (Object.assign(Object.assign({}, vision.toObject()), { selected: vision.id === character.vision })));
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
                const currentDetails = yield characterModel_1.default.findById(req.params.id)
                    .select('imgPath')
                    .orFail(new Error('Character not found.'));
                if (currentDetails) {
                    yield promises_1.default.rm(currentDetails.imgPath, {
                        force: true,
                    });
                }
                yield character.save();
                res.redirect(character.url);
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
        yield characterModel_1.default.findByIdAndDelete(req.body.id);
        res.redirect('/characters');
    }
    catch (error) {
        next(error);
    }
});
exports.deleteCharacterPost = deleteCharacterPost;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhcmFjdGVyQ29udHJvbGxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250cm9sbGVycy9jaGFyYWN0ZXJDb250cm9sbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUNBLDhFQUFpRDtBQUNqRCx5REFBa0U7QUFDbEUsb0RBQTRCO0FBQzVCLHdFQUEyQztBQUMzQyx3RUFBMkM7QUFDM0MsMkRBQTZCO0FBRTdCLE1BQU0sTUFBTSxHQUFHLElBQUEsZ0JBQU0sRUFBQztJQUNwQixPQUFPLEVBQUUsZ0JBQU0sQ0FBQyxXQUFXLENBQUM7UUFDMUIsV0FBVyxFQUFFLENBQUMsR0FBRyxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsRUFBRTtZQUNuQyxRQUFRLENBQUMsSUFBSSxFQUFFLHNCQUFzQixDQUFDLENBQUM7UUFDekMsQ0FBQztLQUNGLENBQUM7Q0FDSCxDQUFDLENBQUM7QUFFSSxNQUFNLGdCQUFnQixHQUFHLENBQU8sR0FBWSxFQUFFLEdBQWEsRUFBRSxJQUFrQixFQUFFLEVBQUU7SUFDeEYsSUFBSTtRQUNGLE1BQU0sYUFBYSxHQUFHLE1BQU0sd0JBQVMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNwRCxHQUFHLENBQUMsTUFBTSxDQUFDLGVBQWUsRUFBRTtZQUMxQixLQUFLLEVBQUUscUJBQXFCO1lBQzVCLFVBQVUsRUFBRSxhQUFhO1NBQzFCLENBQUMsQ0FBQztLQUNKO0lBQUMsT0FBTyxLQUFLLEVBQUU7UUFDZCxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7S0FDYjtBQUNILENBQUMsQ0FBQSxDQUFDO0FBVlcsUUFBQSxnQkFBZ0Isb0JBVTNCO0FBRUssTUFBTSxrQkFBa0IsR0FBRyxDQUFPLEdBQVksRUFBRSxHQUFhLEVBQUUsSUFBa0IsRUFBRSxFQUFFO0lBQzFGLElBQUk7UUFDRixNQUFNLFNBQVMsR0FBRyxNQUFNLHdCQUFTLENBQUMsUUFBUSxD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