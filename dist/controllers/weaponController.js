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
        const characterCounts = yield Promise.all(allWeapons.map((weapon) => __awaiter(void 0, void 0, void 0, function* () {
            const count = yield characterModel_1.default.countDocuments({ weapon: weapon.id }).exec();
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
        const errorWeapon = {
            name: req.body.name,
        };
        if (!errors.isEmpty()) {
            res.render('weaponForm', {
                title: 'Add Weapon',
                weapon: errorWeapon,
                errors: errors.array(),
            });
        }
        else {
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
        const weapon = yield weaponModel_1.default.findById(req.params.id).orFail(new Error('Weapon not found.'));
        console.log(weapon.name);
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
        const weapon = {
            id: req.params.id,
            name: req.body.name,
        };
        if (!errors.isEmpty()) {
            res.render('weaponForm', {
                title: 'Edit Weapon',
                weapon,
                errors: errors.array(),
            });
        }
        else {
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
        const weapon = yield weaponModel_1.default.findById(req.params.id).exec();
        const characters = yield characterModel_1.default.find({ weapon: req.params.id }).exec();
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
            res.render('weaponDelete', {
                title: 'Delete Weapon',
                weapon,
                characters,
            });
        }
        yield weaponModel_1.default.findByIdAndDelete(req.body.id).exec();
        res.redirect('/weapons');
    }
    catch (error) {
        next(error);
    }
});
exports.deleteWeaponPost = deleteWeaponPost;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2VhcG9uQ29udHJvbGxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250cm9sbGVycy93ZWFwb25Db250cm9sbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUNBLHdFQUEyQztBQUMzQyw4RUFBaUQ7QUFDakQseURBQTJEO0FBRXBELE1BQU0sYUFBYSxHQUFHLENBQU8sR0FBWSxFQUFFLEdBQWEsRUFBRSxJQUFrQixFQUFFLEVBQUU7SUFDckYsSUFBSTtRQUNGLE1BQU0sVUFBVSxHQUFHLE1BQU0scUJBQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUM5QyxNQUFNLGVBQWUsR0FBRyxNQUFNLE9BQU8sQ0FBQyxHQUFHLENBQ3ZDLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBTyxNQUFNLEVBQUUsRUFBRTtZQUM5QixNQUFNLEtBQUssR0FBRyxNQUFNLHdCQUFTLENBQUMsY0FBYyxDQUFDLEVBQUUsTUFBTSxFQUFFLE1BQU0sQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO1lBQzNFLE9BQU87Z0JBQ0wsSUFBSSxFQUFFLE1BQU0sQ0FBQyxJQUFJO2dCQUNqQixHQUFHLEVBQUUsTUFBTSxDQUFDLEdBQUc7Z0JBQ2YsY0FBYyxFQUFFLEtBQUs7YUFDdEIsQ0FBQztRQUNKLENBQUMsQ0FBQSxDQUFDLENBQ0gsQ0FBQztRQUNGLEdBQUcsQ0FBQyxNQUFNLENBQUMsWUFBWSxFQUFFO1lBQ3ZCLEtBQUssRUFBRSxTQUFTO1lBQ2hCLE9BQU8sRUFBRSxlQUFlO1NBQ3pCLENBQUMsQ0FBQztLQUNKO0lBQUMsT0FBTyxLQUFLLEVBQUU7UUFDZCxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7S0FDYjtBQUNILENBQUMsQ0FBQSxDQUFDO0FBcEJXLFFBQUEsYUFBYSxpQkFvQnhCO0FBRUssTUFBTSx5QkFBeUIsR0FBRyxDQUFPLEdBQVksRUFBRSxHQUFhLEVBQUUsSUFBa0IsRUFBRSxFQUFFO0lBQ2pHLElBQUk7UUFDRixNQUFNLENBQUMsTUFBTSxFQUFFLFVBQVUsQ0FBQyxHQUFHLE1BQU0sT0FBTyxDQUFDLEdBQUcsQ0FBQztZQUM3QyxxQkFBTSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLEtBQUssQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO1lBQ3JFLHdCQUFTLENBQUMsSUFBSSxDQUFDLEVBQUUsTUFBTSxFQUFFLEdBQUcsQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxJQUFJLEVBQUU7U0FDakQsQ0FBQyxDQUFDO1FBQ0gsR0FBRyxDQUFDLE1BQU0sQ0FBQyxjQUFjLEVBQUU7WUFDekIsS0FBSyxFQUFFLE1BQU0sQ0FBQyxJQUFJO1lBQ2xCLE1BQU07WUFDTixVQUFVO1NBQ1gsQ0FBQyxDQUFDO0tBQ0o7SUFBQyxPQUFPLEtBQUssRUFBRTtRQUNkLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztLQUNiO0FBQ0gsQ0FBQyxDQUFBLENBQUM7QUFkVyxRQUFBLHlCQUF5Qiw2QkFjcEM7QUFFSyxNQUFNLFlBQVksR0FBRyxDQUFDLEdBQVksRUFBRSxHQUFhLEVBQUUsRUFBRTtJQUMxRCxHQUFHLENBQUMsTUFBTSxDQUFDLFlBQVksRUFBRTtRQUN2QixLQUFLLEVBQUUsWUFBWTtLQUNwQixDQUFDLENBQUM7QUFDTCxDQUFDLENBQUM7QUFKVyxRQUFBLFlBQVksZ0JBSXZCO0FBRVcsUUFBQSxhQUFhLEdBQUc7SUFDM0IsSUFBQSx3QkFBSSxFQUFDLE1BQU0sQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFDLFdBQVcsQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDLE1BQU0sRUFBRTtJQUM5RSxDQUFPLEdBQVksRUFBRSxHQUFhLEVBQUUsSUFBa0IsRUFBRSxFQUFFO1FBQ3hELE1BQU0sTUFBTSxHQUFHLElBQUEsb0NBQWdCLEVBQUMsR0FBRyxDQUFDLENBQUM7UUFDckMsTUFBTSxXQUFXLEdBQUc7WUFDbEIsSUFBSSxFQUFFLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSTtTQUNwQixDQUFDO1FBQ0YsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsRUFBRTtZQUNyQixHQUFHLENBQUMsTUFBTSxDQUFDLFlBQVksRUFBRTtnQkFDdkIsS0FBSyxFQUFFLFlBQVk7Z0JBQ25CLE1BQU0sRUFBRSxXQUFXO2dCQUNuQixNQUFNLEVBQUUsTUFBTSxDQUFDLEtBQUssRUFBRTthQUN2QixDQUFDLENBQUM7U0FDSjthQUFNO1lBQ0wsTUFBTSxNQUFNLEdBQUcsSUFBSSxxQkFBTSxDQUFDO2dCQUN4QixLQUFLLEVBQUUsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJO2FBQ3JCLENBQUMsQ0FBQztZQUNILElBQUk7Z0JBQ0YsTUFBTSxNQUFNLENBQUMsSUFBSSxFQUFFLENBQUM7Z0JBQ3BCLEdBQUcsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2FBQzFCO1lBQUMsT0FBTyxLQUFLLEVBQUU7Z0JBQ2QsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO2FBQ2I7U0FDRjtJQUNILENBQUMsQ0FBQTtDQUNGLENBQUM7QUFFSyxNQUFNLGFBQWEsR0FBRyxDQUFPLEdBQVksRUFBRSxHQUFhLEVBQUUsSUFBa0IsRUFBRSxFQUFFO0lBQ3JGLElBQUk7UUFDRixNQUFNLE1BQU0sR0FBRyxNQUFNLHFCQUFNLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksS0FBSyxDQUFDLG1CQUFtQixDQUFDLENBQUMsQ0FBQztRQUMzRixPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN6QixHQUFHLENBQUMsTUFBTSxDQUFDLFlBQVksRUFBRTtZQUN2QixLQUFLLEVBQUUsYUFBYTtZQUNwQixNQUFNO1NBQ1AsQ0FBQyxDQUFDO0tBQ0o7SUFBQyxPQUFPLEtBQUssRUFBRTtRQUNkLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztLQUNiO0FBQ0gsQ0FBQyxDQUFBLENBQUM7QUFYVyxRQUFBLGFBQWEsaUJBV3hCO0FBRVcsUUFBQSxjQUFjLEdBQUc7SUFDNUIsSUFBQSx3QkFBSSxFQUFDLE1BQU0sQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFDLFdBQVcsQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDLE1BQU0sRUFBRTtJQUM5RSxDQUFPLEdBQVksRUFBRSxHQUFhLEVBQUUsSUFBa0IsRUFBRSxFQUFFO1FBQ3hELE1BQU0sTUFBTSxHQUFHLElBQUEsb0NBQWdCLEVBQUMsR0FBRyxDQUFDLENBQUM7UUFDckMsTUFBTSxNQUFNLEdBQUc7WUFDYixFQUFFLEVBQUUsR0FBRyxDQUFDLE1BQU0sQ0FBQyxFQUFFO1lBQ2pCLElBQUksRUFBRSxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUk7U0FDcEIsQ0FBQztRQUNGLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLEVBQUU7WUFDckIsR0FBRyxDQUFDLE1BQU0sQ0FBQyxZQUFZLEVBQUU7Z0JBQ3ZCLEtBQUssRUFBRSxhQUFhO2dCQUNwQixNQUFNO2dCQUNOLE1BQU0sRUFBRSxNQUFNLENBQUMsS0FBSyxFQUFFO2FBQ3ZCLENBQUMsQ0FBQztTQUNKO2FBQU07WUFDTCxJQUFJO2dCQUNGLE1BQU0sYUFBYSxHQUFHLE1BQU0scUJBQU0sQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxLQUFLLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxDQUFDO2dCQUNsRyxhQUFhLENBQUMsS0FBSyxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO2dCQUNwQyxNQUFNLGFBQWEsQ0FBQyxJQUFJLEVBQUUsQ0FBQztnQkFDM0IsR0FBRyxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLENBQUM7YUFDakM7WUFBQyxPQUFPLEtBQUssRUFBRTtnQkFDZCxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7YUFDYjtTQUNGO0lBQ0gsQ0FBQyxDQUFBO0NBQ0YsQ0FBQztBQUVLLE1BQU0sZUFBZSxHQUFHLENBQU8sR0FBWSxFQUFFLEdBQWEsRUFBRSxJQUFrQixFQUFFLEVBQUU7SUFDdkYsSUFBSTtRQUNGLE1BQU0sTUFBTSxHQUFHLE1BQU0scUJBQU0sQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUMzRCxNQUFNLFVBQVUsR0FBRyxNQUFNLHdCQUFTLENBQUMsSUFBSSxDQUFDLEVBQUUsTUFBTSxFQUFFLEdBQUcsQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUMxRSxJQUFJLE1BQU0sS0FBSyxJQUFJO1lBQUUsR0FBRyxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUM5QyxHQUFHLENBQUMsTUFBTSxDQUFDLGNBQWMsRUFBRTtZQUN6QixLQUFLLEVBQUUsZUFBZTtZQUN0QixNQUFNO1lBQ04sVUFBVTtTQUNYLENBQUMsQ0FBQztLQUNKO0lBQUMsT0FBTyxLQUFLLEVBQUU7UUFDZCxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7S0FDYjtBQUNILENBQUMsQ0FBQSxDQUFDO0FBYlcsUUFBQSxlQUFlLG1CQWExQjtBQUVLLE1BQU0sZ0JBQWdCLEdBQUcsQ0FBTyxHQUFZLEVBQUUsR0FBYSxFQUFFLElBQWtCLEVBQUUsRUFBRTtJQUN4RixJQUFJO1FBQ0YsTUFBTSxNQUFNLEdBQUcsTUFBTSxxQkFBTSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO1FBQzNELE1BQU0sVUFBVSxHQUFHLE1BQU0sd0JBQVMsQ0FBQyxJQUFJLENBQUMsRUFBRSxNQUFNLEVBQUUsR0FBRyxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO1FBQzFFLElBQUksVUFBVSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7WUFDekIsR0FBRyxDQUFDLE1BQU0sQ0FBQyxjQUFjLEVBQUU7Z0JBQ3pCLEtBQUssRUFBRSxlQUFlO2dCQUN0QixNQUFNO2dCQUNOLFVBQVU7YUFDWCxDQUFDLENBQUM7U0FDSjtRQUNELE1BQU0scUJBQU0sQ0FBQyxpQkFBaUIsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ25ELEdBQUcsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLENBQUM7S0FDMUI7SUFBQyxPQUFPLEtBQUssRUFBRTtRQUNkLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztLQUNiO0FBQ0gsQ0FBQyxDQUFBLENBQUM7QUFoQlcsUUFBQSxnQkFBZ0Isb0JBZ0IzQiJ9