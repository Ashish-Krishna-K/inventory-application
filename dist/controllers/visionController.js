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
        // map() function returns an array of promises, hence using Promie.all to await the
        // resolution of the promises.
        const characterCounts = yield Promise.all(
        // Get the count of characters for each vision.
        allVisions.map((vision) => __awaiter(void 0, void 0, void 0, function* () {
            const count = yield characterModel_1.default.countDocuments({ vision: vision.id }).exec();
            // return an object with only the required elements for displaying
            return {
                name: vision.name,
                url: vision.url,
                characterCount: count,
            };
        })));
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
        }
        else {
            // no errors, save the vision and redirect user to newly created vision details.
            const vision = new visionModel_1.default({
                _name: req.body.name,
                description: req.body.description,
            });
            try {
                yield vision.save();
                res.redirect(vision.url);
            }
            catch (error) {
                next(error);
            }
        }
    }),
];
const editVisionGet = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // pull up the vision using the id in the request params or throw error if it's not found.
        const vision = yield visionModel_1.default.findById(req.params.id).orFail(new Error('Vision not found.'));
        res.render('visionForm', {
            title: 'Edit Vision',
            vision,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.editVisionGet = editVisionGet;
exports.editVisionPost = [
    (0, express_validator_1.body)('name').trim().notEmpty().withMessage('Vision name is required').escape(),
    (0, express_validator_1.body)('description').trim().notEmpty().withMessage('Description is required').escape(),
    (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const errors = (0, express_validator_1.validationResult)(req);
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
        }
        else {
            // no errors, pull up the vision using the id in the request params, save the updated info and
            // redirect user to vision detail page.
            try {
                const currentVision = yield visionModel_1.default.findById(req.params.id).orFail(new Error('Vision not found.'));
                currentVision._name = req.body.name;
                currentVision.description = req.body.description;
                yield currentVision.save();
                res.redirect(currentVision.url);
            }
            catch (error) {
                next(error);
            }
        }
    }),
];
const deleteVisionGet = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // get the vision and all associated characters from the id in the req params
        const vision = yield visionModel_1.default.findById(req.params.id).exec();
        const characters = yield characterModel_1.default.find({ vision: req.params.id }).exec();
        // vision doesn't exist, redirect user to all visions page
        if (vision === null)
            res.redirect('/visions');
        res.render('visionDelete', {
            title: 'Delete Vision',
            vision,
            characters,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.deleteVisionGet = deleteVisionGet;
const deleteVisionPost = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const vision = yield visionModel_1.default.findById(req.params.id).exec();
        const characters = yield characterModel_1.default.find({ vision: req.params.id }).exec();
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
        yield visionModel_1.default.findByIdAndDelete(req.body.id).exec();
        res.redirect('/visions');
    }
    catch (error) {
        next(error);
    }
});
exports.deleteVisionPost = deleteVisionPost;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlzaW9uQ29udHJvbGxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250cm9sbGVycy92aXNpb25Db250cm9sbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUNBLHdFQUEyQztBQUMzQyw4RUFBaUQ7QUFDakQseURBQTJEO0FBRXBELE1BQU0sYUFBYSxHQUFHLENBQU8sR0FBWSxFQUFFLEdBQWEsRUFBRSxJQUFrQixFQUFFLEVBQUU7SUFDckYsSUFBSTtRQUNGLE1BQU0sVUFBVSxHQUFHLE1BQU0scUJBQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUM5QyxtRkFBbUY7UUFDbkYsOEJBQThCO1FBQzlCLE1BQU0sZUFBZSxHQUFHLE1BQU0sT0FBTyxDQUFDLEdBQUc7UUFDdkMsK0NBQStDO1FBQy9DLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBTyxNQUFNLEVBQUUsRUFBRTtZQUM5QixNQUFNLEtBQUssR0FBRyxNQUFNLHdCQUFTLENBQUMsY0FBYyxDQUFDLEVBQUUsTUFBTSxFQUFFLE1BQU0sQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO1lBQzNFLGtFQUFrRTtZQUNsRSxPQUFPO2dCQUNMLElBQUksRUFBRSxNQUFNLENBQUMsSUFBSTtnQkFDakIsR0FBRyxFQUFFLE1BQU0sQ0FBQyxHQUFHO2dCQUNmLGNBQWMsRUFBRSxLQUFLO2FBQ3RCLENBQUM7UUFDSixDQUFDLENBQUEsQ0FBQyxDQUNILENBQUM7UUFDRixHQUFHLENBQUMsTUFBTSxDQUFDLFlBQVksRUFBRTtZQUN2QixLQUFLLEVBQUUsU0FBUztZQUNoQixPQUFPLEVBQUUsZUFBZTtTQUN6QixDQUFDLENBQUM7S0FDSjtJQUFDLE9BQU8sS0FBSyxFQUFFO1FBQ2QsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0tBQ2I7QUFDSCxDQUFDLENBQUEsQ0FBQztBQXhCVyxRQUFBLGFBQWEs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