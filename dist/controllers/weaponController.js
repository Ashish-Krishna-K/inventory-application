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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteWeaponPost = exports.deleteWeaponGet = exports.editWeaponPost = exports.editWeaponGet = exports.addWeaponPost = exports.addWeaponGet = exports.singleWeaponCharactersGet = exports.allWeaponsGet = void 0;
const allWeaponsGet = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // Implement all Weapons get
});
exports.allWeaponsGet = allWeaponsGet;
const singleWeaponCharactersGet = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // Implement single Weapon characters get
});
exports.singleWeaponCharactersGet = singleWeaponCharactersGet;
const addWeaponGet = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // Implement add Weapon get
});
exports.addWeaponGet = addWeaponGet;
const addWeaponPost = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // Implement add Weapon post
});
exports.addWeaponPost = addWeaponPost;
const editWeaponGet = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // Implement edit Weapon get
});
exports.editWeaponGet = editWeaponGet;
const editWeaponPost = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // Implement edit Weapon post
});
exports.editWeaponPost = editWeaponPost;
const deleteWeaponGet = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // Implement delete Weapon get
});
exports.deleteWeaponGet = deleteWeaponGet;
const deleteWeaponPost = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // Implement delete Weapon post
});
exports.deleteWeaponPost = deleteWeaponPost;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2VhcG9uQ29udHJvbGxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250cm9sbGVycy93ZWFwb25Db250cm9sbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUVPLE1BQU0sYUFBYSxHQUFHLENBQU8sR0FBWSxFQUFFLEdBQWEsRUFBRSxJQUFrQixFQUFFLEVBQUU7SUFDckYsNEJBQTRCO0FBQzlCLENBQUMsQ0FBQSxDQUFDO0FBRlcsUUFBQSxhQUFhLGlCQUV4QjtBQUVLLE1BQU0seUJBQXlCLEdBQUcsQ0FBTyxHQUFZLEVBQUUsR0FBYSxFQUFFLElBQWtCLEVBQUUsRUFBRTtJQUNqRyx5Q0FBeUM7QUFDM0MsQ0FBQyxDQUFBLENBQUM7QUFGVyxRQUFBLHlCQUF5Qiw2QkFFcEM7QUFFSyxNQUFNLFlBQVksR0FBRyxDQUFPLEdBQVksRUFBRSxHQUFhLEVBQUUsSUFBa0IsRUFBRSxFQUFFO0lBQ3BGLDJCQUEyQjtBQUM3QixDQUFDLENBQUEsQ0FBQztBQUZXLFFBQUEsWUFBWSxnQkFFdkI7QUFFSyxNQUFNLGFBQWEsR0FBRyxDQUFPLEdBQVksRUFBRSxHQUFhLEVBQUUsSUFBa0IsRUFBRSxFQUFFO0lBQ3JGLDRCQUE0QjtBQUM5QixDQUFDLENBQUEsQ0FBQztBQUZXLFFBQUEsYUFBYSxpQkFFeEI7QUFFSyxNQUFNLGFBQWEsR0FBRyxDQUFPLEdBQVksRUFBRSxHQUFhLEVBQUUsSUFBa0IsRUFBRSxFQUFFO0lBQ3JGLDRCQUE0QjtBQUM5QixDQUFDLENBQUEsQ0FBQztBQUZXLFFBQUEsYUFBYSxpQkFFeEI7QUFFSyxNQUFNLGNBQWMsR0FBRyxDQUFPLEdBQVksRUFBRSxHQUFhLEVBQUUsSUFBa0IsRUFBRSxFQUFFO0lBQ3RGLDZCQUE2QjtBQUMvQixDQUFDLENBQUEsQ0FBQztBQUZXLFFBQUEsY0FBYyxrQkFFekI7QUFFSyxNQUFNLGVBQWUsR0FBRyxDQUFPLEdBQVksRUFBRSxHQUFhLEVBQUUsSUFBa0IsRUFBRSxFQUFFO0lBQ3ZGLDhCQUE4QjtBQUNoQyxDQUFDLENBQUEsQ0FBQztBQUZXLFFBQUEsZUFBZSxtQkFFMUI7QUFFSyxNQUFNLGdCQUFnQixHQUFHLENBQU8sR0FBWSxFQUFFLEdBQWEsRUFBRSxJQUFrQixFQUFFLEVBQUU7SUFDeEYsK0JBQStCO0FBQ2pDLENBQUMsQ0FBQSxDQUFDO0FBRlcsUUFBQSxnQkFBZ0Isb0JBRTNCIn0=