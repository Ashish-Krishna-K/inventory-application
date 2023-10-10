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
exports.deleteWeaponPost = exports.deleteWeaponGet = exports.editWeaponPost = exports.editWeaponGet = exports.addWeaponPost = exports.addWeaponGet = exports.singleWeaponCharactersGet = exports.allWeaponsGet = void 0;
const weaponModel_1 = __importDefault(require("../models/weaponModel"));
const characterModel_1 = __importDefault(require("../models/characterModel"));
const express_validator_1 = require("express-validator");
const allWeaponsGet = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allWeapons = yield weaponModel_1.default.find().exec();
        // the map() function returns an array of promises, hence using promise.all to wait for it
        // to resolve.
        const characterCounts = yield Promise.all(
        // For each weapon type count the number of characters with that particular weapon type.
        allWeapons.map((weapon) => __awaiter(void 0, void 0, void 0, function* () {
            const count = yield characterModel_1.default.countDocuments({ weapon: weapon.id }).exec();
            // Return an object with only the required elements to display
            return {
                name: weapon.name,
                url: weapon.url,
                characterCount: count,
            };
        })));
        res.render('allWeapons', {
            title: 'Weapons',
            weapons: characterCounts,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.allWeaponsGet = allWeaponsGet;
const singleWeaponCharactersGet = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [weapon, characters] = yield Promise.all([
            weaponModel_1.default.findById(req.params.id).orFail(new Error('Weapon not found.')),
            characterModel_1.default.find({ weapon: req.params.id }).exec(),
        ]);
        res.render('weaponDetail', {
            title: weapon.name,
            weapon,
            characters,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.singleWeaponCharactersGet = singleWeaponCharactersGet;
const addWeaponGet = (req, res) => {
    res.render('weaponForm', {
        title: 'Add Weapon',
    });
};
exports.addWeaponGet = addWeaponGet;
exports.addWeaponPost = [
    (0, express_validator_1.body)('name').trim().notEmpty().withMessage('Weapon name is required').escape(),
    (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            // errors exist return the form to user with errors.
            const errorWeapon = {
                name: req.body.name,
            };
            res.render('weaponForm', {
                title: 'Add Weapon',
                weapon: errorWeapon,
                errors: errors.array(),
            });
        }
        else {
            // No errors, save the details to database and redirect user to newly created
            // weapon's page
            const weapon = new weaponModel_1.default({
                _name: req.body.name,
            });
            try {
                yield weapon.save();
                res.redirect(weapon.url);
            }
            catch (error) {
                next(error);
            }
        }
    }),
];
const editWeaponGet = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // use the id in the request params to look up the weapon in the db or throw error if it's not found
        const weapon = yield weaponModel_1.default.findById(req.params.id).orFail(new Error('Weapon not found.'));
        res.render('weaponForm', {
            title: 'Edit Weapon',
            weapon,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.editWeaponGet = editWeaponGet;
exports.editWeaponPost = [
    (0, express_validator_1.body)('name').trim().notEmpty().withMessage('Weapon name is required').escape(),
    (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            // errors exist return the form to user with errors
            const weapon = {
                id: req.params.id,
                name: req.body.name,
            };
            res.render('weaponForm', {
                title: 'Edit Weapon',
                weapon,
                errors: errors.array(),
            });
        }
        else {
            // errors doesn't exist, pull up the weapon from database and make the changes to the document and
            // finally redirect the user to the weapon detials page.
            try {
                const currentWeapon = yield weaponModel_1.default.findById(req.params.id).orFail(new Error('Weapon not found.'));
                currentWeapon._name = req.body.name;
                yield currentWeapon.save();
                res.redirect(currentWeapon.url);
            }
            catch (error) {
                next(error);
            }
        }
    }),
];
const deleteWeaponGet = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Find the weapon using the id in the request params and all the characters with that weapon type.
        const weapon = yield weaponModel_1.default.findById(req.params.id).exec();
        const characters = yield characterModel_1.default.find({ weapon: req.params.id }).exec();
        // Weapon doesn't exist redirect users back to all weapons page.
        if (weapon === null)
            res.redirect('/weapons');
        res.render('weaponDelete', {
            title: 'Delete Weapon',
            weapon,
            characters,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.deleteWeaponGet = deleteWeaponGet;
const deleteWeaponPost = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const weapon = yield weaponModel_1.default.findById(req.params.id).exec();
        const characters = yield characterModel_1.default.find({ weapon: req.params.id }).exec();
        if (characters.length > 0) {
            // There is still some characters associated with this weapon type re-prompt user to
            // delete/edit those characters.
            res.render('weaponDelete', {
                title: 'Delete Weapon',
                weapon,
                characters,
            });
        }
        // There is no characters associated with the weapon type. Delete the weapon type and
        // redirect user to all weapons page.
        yield weaponModel_1.default.findByIdAndDelete(req.body.id).exec();
        res.redirect('/weapons');
    }
    catch (error) {
        next(error);
    }
});
exports.deleteWeaponPost = deleteWeaponPost;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2VhcG9uQ29udHJvbGxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250cm9sbGVycy93ZWFwb25Db250cm9sbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUNBLHdFQUEyQztBQUMzQyw4RUFBaUQ7QUFDakQseURBQTJEO0FBRXBELE1BQU0sYUFBYSxHQUFHLENBQU8sR0FBWSxFQUFFLEdBQWEsRUFBRSxJQUFrQixFQUFFLEVBQUU7SUFDckYsSUFBSTtRQUNGLE1BQU0sVUFBVSxHQUFHLE1BQU0scUJBQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUM5QywwRkFBMEY7UUFDMUYsY0FBYztRQUNkLE1BQU0sZUFBZSxHQUFHLE1BQU0sT0FBTyxDQUFDLEdBQUc7UUFDdkMsd0ZBQXdGO1FBQ3hGLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBTyxNQUFNLEVBQUUsRUFBRTtZQUM5QixNQUFNLEtBQUssR0FBRyxNQUFNLHdCQUFTLENBQUMsY0FBYyxDQUFDLEVBQUUsTUFBTSxFQUFFLE1BQU0sQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO1lBQzNFLDhEQUE4RDtZQUM5RCxPQUFPO2dCQUNMLElBQUksRUFBRSxNQUFNLENBQUMsSUFBSTtnQkFDakIsR0FBRyxFQUFFLE1BQU0sQ0FBQyxHQUFHO2dCQUNmLGNBQWMsRUFBRSxLQUFLO2FBQ3RCLENBQUM7UUFDSixDQUFDLENBQUEsQ0FBQyxDQUNILENBQUM7UUFDRixHQUFHLENBQUMsTUFBTSxDQUFDLFlBQVksRUFBRTtZQUN2QixLQUFLLEVBQUUsU0FBUztZQUNoQixPQUFPLEVBQUUsZUFBZTtTQUN6QixDQUFDLENBQUM7S0FDSjtJQUFDLE9BQU8sS0FBSyxFQUFFO1FBQ2QsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0tBQ2I7QUFDSCxDQUFDLENBQUEsQ0FBQztBQXhCVyxRQUFBLGFBQWEsaUJB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