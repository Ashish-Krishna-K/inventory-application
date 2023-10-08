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
exports.deleteVisionPost = exports.deleteVisionGet = exports.editVisionPost = exports.editVisionGet = exports.addVisionPost = exports.addVisionGet = exports.singleVisionCharactersGet = exports.allVisionsGet = void 0;
const visionModel_1 = __importDefault(require("../models/visionModel"));
const characterModel_1 = __importDefault(require("../models/characterModel"));
const express_validator_1 = require("express-validator");
const allVisionsGet = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allVisions = yield visionModel_1.default.find().exec();
        const characterCounts = allVisions.map((vision) => __awaiter(void 0, void 0, void 0, function* () {
            const count = yield characterModel_1.default.countDocuments({ vision: vision.id }).exec();
            return {
                name: vision.name,
                url: vision.url,
                characterCount: count,
            };
        }));
        res.render('allVisions', {
            title: 'Visions',
            visions: characterCounts,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.allVisionsGet = allVisionsGet;
const singleVisionCharactersGet = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
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
    }
    catch (error) {
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
    (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const errors = (0, express_validator_1.validationResult)(req);
        const vision = new visionModel_1.default({
            _name: req.body.name,
            description: req.body.description,
        });
        if (!errors.isEmpty()) {
            res.render('visionForm', {
                title: 'Add Vision',
                vision,
                errors: errors.array(),
            });
        }
        else {
            try {
                yield vision.save();
                res.render(vision.url);
            }
            catch (error) {
                next(error);
            }
        }
    }),
];
const editVisionGet = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // Implement edit Vision get
});
exports.editVisionGet = editVisionGet;
const editVisionPost = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // Implement edit Vision post
});
exports.editVisionPost = editVisionPost;
const deleteVisionGet = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // Implement delete Vision get
});
exports.deleteVisionGet = deleteVisionGet;
const deleteVisionPost = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // Implement delete Vision post
});
exports.deleteVisionPost = deleteVisionPost;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlzaW9uQ29udHJvbGxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250cm9sbGVycy92aXNpb25Db250cm9sbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUNBLHdFQUEyQztBQUMzQyw4RUFBaUQ7QUFDakQseURBQTJEO0FBRXBELE1BQU0sYUFBYSxHQUFHLENBQU8sR0FBWSxFQUFFLEdBQWEsRUFBRSxJQUFrQixFQUFFLEVBQUU7SUFDckYsSUFBSTtRQUNGLE1BQU0sVUFBVSxHQUFHLE1BQU0scUJBQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUM5QyxNQUFNLGVBQWUsR0FBRyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQU8sTUFBTSxFQUFFLEVBQUU7WUFDdEQsTUFBTSxLQUFLLEdBQUcsTUFBTSx3QkFBUyxDQUFDLGNBQWMsQ0FBQyxFQUFFLE1BQU0sRUFBRSxNQUFNLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUMzRSxPQUFPO2dCQUNMLElBQUksRUFBRSxNQUFNLENBQUMsSUFBSTtnQkFDakIsR0FBRyxFQUFFLE1BQU0sQ0FBQyxHQUFHO2dCQUNmLGNBQWMsRUFBRSxLQUFLO2FBQ3RCLENBQUM7UUFDSixDQUFDLENBQUEsQ0FBQyxDQUFDO1FBQ0gsR0FBRyxDQUFDLE1BQU0sQ0FBQyxZQUFZLEVBQUU7WUFDdkIsS0FBSyxFQUFFLFNBQVM7WUFDaEIsT0FBTyxFQUFFLGVBQWU7U0FDekIsQ0FBQyxDQUFDO0tBQ0o7SUFBQyxPQUFPLEtBQUssRUFBRTtRQUNkLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztLQUNiO0FBQ0gsQ0FBQyxDQUFBLENBQUM7QUFsQlcsUUFBQSxhQUFhLGlCQWtCeEI7QUFFSyxNQUFNLHlCQUF5QixHQUFHLENBQU8sR0FBWSxFQUFFLEdBQWEsRUFBRSxJQUFrQixFQUFFLEVBQUU7SUFDakcsSUFBSTtR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