const Character = require('../models/character');
const Vision = require('../models/vision');
const async = require('async');
const fs = require('fs');
const { body, validationResult } = require("express-validator");
const multer = require('multer');
const whitelist = [
  'image/png',
  'image/jpeg',
  'image/jpg',
  'image/webp',
  'image/gif'
]
const upload = multer({
  storage: multer.diskStorage({
    destination: './public/images',
  }),
  fileFilter: (req, file, cb) => {
    if (!whitelist.includes(file.mimetype)) {
      return cb(new Error("This file type is not allowed. Please choose image type of 'png', 'jpeg', 'jpg', 'webp'"))
    }
    cb(null, true)
  }
})

// Display list of Characters.
exports.character_list = (req, res, next) => {
  Character.find({}, "name vision rarity weapon imageURL")
    .sort({ name: 1 })
    .populate("vision")
    .exec((err, list_characters) => {
      if (err) {
        next(err);
      } else {
        res.render("character_list", {
          title: "All Characters",
          character_list: list_characters
        });
      }
    });
};

// Display a whole character detail page.
exports.character_detail = (req, res, next) => {
  async.parallel(
    {
      character_detailed(callback) {
        Character.findById(req.params.id)
          .populate("vision")
          .exec(callback);
      },
    },
    (err, results) => {
      if (err) {
        return next(err)
      };
      if (results.character_detailed === null) {
        const err = new Error('Character not found');
        err.status = 404;
        return next(err);
      };
      res.render("character_detail", {
        title: results.character_detailed.name,
        character: results.character_detailed,
      });
    }
  );
};

// Display character creation form on GET.
exports.character_create_get = (req, res, next) => {
  async.parallel(
    {
      visions(callback) {
        Vision.find(callback);
      },
    },
    (err, results) => {
      if (err) {
        next(err);
      } else {
        res.render("character_form", {
          title: "Add new Character",
          visions: results.visions
        })
      }
    }
  )
};

// Handles character creation form submission.
exports.character_create_post = [
  upload.single('image'),
  body("name", "Character name is required")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("description")
    .trim()
    .optional({ checkFalsy: true })
    .escape(),
  body("vision").escape(),
  body("rarity").escape(),
  body("weapon").escape(),
  body("constellationsOwned").escape(),

  (req, res, next) => {
    const errors = validationResult(req);
    const path = renameFile(req, req.body.name);
    const character = new Character({
      name: req.body.name,
      description: req.body.description,
      vision: req.body.vision,
      rarity: req.body.rarity,
      weapon: req.body.weapon,
      constellationsOwned: req.body.constellationsOwned,
      imageURL: path,
    });
    if (!errors.isEmpty()) {
      async.parallel(
        {
          visions(callback) {
            Vision.find(callback);
          },
        },
        (err, results) => {
          if (err) {
            next(err);
          } else {
            res.render("character_form", {
              title: "Add new Character",
              visions: results.visions,
              character,
              errors: errors.array(),
            });
          }
        }
      );
      return;
    }
    character.save((err) => {
      if (err) {
        next(err);
      } else {
        res.redirect(character.url)
      }
    })
  }
]

// Display character edit form on GET.
exports.character_update_get = (req, res, next) => {
  async.parallel(
    {
      character(callback) {
        Character.findById(req.params.id)
          .populate("vision")
          .exec(callback)
      },
      visions(callback) {
        Vision.find(callback)
      }
    },
    (err, results) => {
      if (err) {
        return next(err);
      }
      if (results.character === null) {
        const err = new Error("Character not found");
        err.status = 404;
        return next(err);
      }
      res.render("character_form", {
        title: "Edit Character Details",
        visions: results.visions,
        character: results.character,
      });
    }
  );
};

// Handles character edit form submission.
exports.character_update_post = [
  upload.single('image'),
  body("name", "Character name is required")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("description")
    .trim()
    .optional({ checkFalsy: true })
    .escape(),
  body("vision").escape(),
  body("rarity").escape(),
  body("weapon").escape(),
  body("constellationsOwned").escape(),

  (req, res, next) => {
    const errors = validationResult(req);
    const path = renameFile(req, req.body.name);
    const character = new Character({
      name: req.body.name,
      description: req.body.description,
      vision: req.body.vision,
      rarity: req.body.rarity,
      weapon: req.body.weapon,
      constellationsOwned: req.body.constellationsOwned,
      imageURL: path,
      _id: req.params.id
    });
    if (!errors.isEmpty()) {
      async.parallel(
        {
          visions(callback) {
            Vision.find(callback);
          },
        },
        (err, results) => {
          if (err) {
            next(err);
          } else {
            res.render("character_form", {
              title: "Add new Character",
              visions: results.visions,
              character,
              errors: errors.array(),
            });
          }
        }
      );
      return;
    }
    Character.findByIdAndUpdate(req.params.id, character, {}, (err, thechar) => {
      if (err) {
        next(err);
      } else {
        res.redirect(thechar.url);
      }
    })
  }
]

// Display character delete form on GET.
exports.character_delete_get = (req, res, next) => {
  async.parallel(
    {
      character(callback) {
        Character.findById(req.params.id).exec(callback);
      },
    },
    (err, results) => {
      if (err) {
        return next(err)
      }
      if (results.character === null) {
        res.redirect('/visions')
      }
      res.render("character_delete", {
        title: "Delete Character",
        character: results.character,
      })
    }
  )
};

// Handles character delete form submission.
exports.character_delete_post = (req, res, next) => {
  async.parallel(
    {
      character(callback) {
        Character.findById(req.body.characterid).exec(callback);
      }
    },
    (err, results) => {
      if (err) {
        next(err)
      } else {
        Character.findByIdAndRemove(req.body.characterid, (err) => {
          if (err) {
            next(err)
          } else {
            const nameFile = results.character.imageURL.match(/\/[a-z]+.[a-z]+$/);
            fs.rmSync(`./public/images/${nameFile}`)
            res.redirect('/visions');
          };
        });
      };
    }
  );
};


const renameFile = (req, characterName) => {
  const regex = /\.(gif|jpe?g|tiff?|png|webp|bmp)$/i
  const fileExt = req.file.originalname.match(regex);
  const newImageName = characterName.toLowerCase().replace(' ', '_');
  fs.renameSync(req.file.path, `${req.file.destination}/${newImageName}${fileExt[0]}`);
  return `../images/${newImageName}${fileExt[0]}`;
}