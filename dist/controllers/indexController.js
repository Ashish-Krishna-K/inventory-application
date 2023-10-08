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
exports.indexGet = void 0;
const characterModel_1 = __importDefault(require('../models/characterModel'));
const weaponModel_1 = __importDefault(require('../models/weaponModel'));
const visionModel_1 = __importDefault(require('../models/visionModel'));
const indexGet = (req, res, next) =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      const [allCharactersCount, all5starsCount, all4starsCount, allweapons, allVisions] = yield Promise.all([
        characterModel_1.default.countDocuments({}).exec(),
        characterModel_1.default.countDocuments({ _rarity: '5' }).exec(),
        characterModel_1.default.countDocuments({ _rarity: '4' }).exec(),
        weaponModel_1.default.find().exec(),
        visionModel_1.default.find().exec(),
      ]);
      const charactersByWeapon = allweapons.map((weapon) =>
        __awaiter(void 0, void 0, void 0, function* () {
          const count = yield characterModel_1.default.countDocuments({ weapon: weapon.id });
          return {
            name: weapon.name,
            count,
          };
        }),
      );
      const charactersByVision = allVisions.map((vision) =>
        __awaiter(void 0, void 0, void 0, function* () {
          const count = yield characterModel_1.default.countDocuments({ vision: vision.id });
          return {
            name: vision.name,
            count,
          };
        }),
      );
      res.render('index', {
        title: 'Home',
        allCharactersCount,
        all5starsCount,
        all4starsCount,
        allWeaponsCount: charactersByWeapon,
        allVisionsCount: charactersByVision,
      });
    } catch (error) {
      next(error);
    }
  });
exports.indexGet = indexGet;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXhDb250cm9sbGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvbnRyb2xsZXJzL2luZGV4Q29udHJvbGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFDQSw4RUFBaUQ7QUFDakQsd0VBQTJDO0FBQzNDLHdFQUEyQztBQUVwQyxNQUFNLFFBQVEsR0FBRyxDQUFPLEdBQVksRUFBRSxHQUFhLEVBQUUsSUFBa0IsRUFBRSxFQUFFO0lBQ2hGLElBQUk7UUFDRixNQUFNLENBQUMsa0JBQWtCLEVBQUUsY0FBYyxFQUFFLGNBQWMsRUFBRSxVQUFVLEVBQUUsVUFBVSxDQUFDLEdBQUcsTUFBTSxPQUFPLENBQUMsR0FBRyxDQUFDO1lBQ3JHLHdCQUFTLENBQUMsY0FBYyxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksRUFBRTtZQUNuQyx3QkFBUyxDQUFDLGNBQWMsQ0FBQyxFQUFFLE9BQU8sRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDLElBQUksRUFBRTtZQUNqRCx3QkFBUyxDQUFDLGNBQWMsQ0FBQyxFQUFFLE9BQU8sRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDLElBQUksRUFBRTtZQUNqRCxxQkFBTSxDQUFDLElBQUksRUFBRSxDQUFDLElBQUksRUFBRTtZQUNwQixxQkFBTSxDQUFDLElBQUksRUFBRSxDQUFDLElBQUksRUFBRTtTQUNyQixDQUFDLENBQUM7UUFDSCxNQUFNLGtCQUFrQixHQUFHLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBTyxNQUFNLEVBQUUsRUFBRTtZQUN6RCxNQUFNLEtBQUssR0FBRyxNQUFNLHdCQUFTLENBQUMsY0FBYyxDQUFDLEVBQUUsTUFBTSxFQUFFLE1BQU0sQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1lBQ3BFLE9BQU87Z0JBQ0wsSUFBSSxFQUFFLE1BQU0sQ0FBQyxJQUFJO2dCQUNqQixLQUFLO2FBQ04sQ0FBQztRQUNKLENBQUMsQ0FBQSxDQUFDLENBQUM7UUFDSCxNQUFNLGtCQUFrQixHQUFHLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBTyxNQUFNLEVBQUUsRUFBRTtZQUN6RCxNQUFNLEtBQUssR0FBRyxNQUFNLHdCQUFTLENBQUMsY0FBYyxDQUFDLEVBQUUsTUFBTSxFQUFFLE1BQU0sQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1lBQ3BFLE9BQU87Z0JBQ0wsSUFBSSxFQUFFLE1BQU0sQ0FBQyxJQUFJO2dCQUNqQixLQUFLO2FBQ04sQ0FBQztRQUNKLENBQUMsQ0FBQSxDQUFDLENBQUM7UUFFSCxHQUFHLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRTtZQUNsQixLQUFLLEVBQUUsTUFBTTtZQUNiLGtCQUFrQjtZQUNsQixjQUFjO1lBQ2QsY0FBYztZQUNkLGVBQWUsRUFBRSxrQkFBa0I7WUFDbkMsZUFBZSxFQUFFLGtCQUFrQjtTQUNwQyxDQUFDLENBQUM7S0FDSjtJQUFDLE9BQU8sS0FBSyxFQUFFO1FBQ2QsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0tBQ2I7QUFDSCxDQUFDLENBQUEsQ0FBQztBQW5DVyxRQUFBLFFBQVEsWUFtQ25CIn0=
