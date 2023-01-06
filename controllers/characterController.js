const Character = require('../models/character');
const Vision = require('../models/vision');
const async = require('async');
const fs = require('fs');
const { body, validationResult } = require("express-validator");
const multer = require('multer');
const upload = multer({ dest: './public/images' })

// Display list of Characters.
exports.character_list = (req, res, next) => {
  Character.find({}, "name vision rarity weapon")
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
    console.log(91, req.file);
    const errors = validationResult(req);
    const character = new Character({
      name: req.body.name,
      description: req.body.description,
      vision: req.body.vision,
      rarity: req.body.rarity,
      weapon: req.body.weapon,
      constellationsOwned: req.body.constellationsOwned,
    });
    const newImageName = character.name.toLowerCase().replace(' ', '_');
    fs.renameSync(req.file.path, `${req.file.destination}/${newImageName}.webp`);
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
  res.send('not yet implemented');
};

// Handles character edit form submission.
exports.character_update_post = (req, res, next) => {
  res.send('not yet implemented');
};

// Display character delete form on GET.
exports.character_delete_get = (req, res, next) => {
  res.send('not yet implemented');
};

// Handles character delete form submission.
exports.character_delete_post = (req, res, next) => {
  res.send('not yet implemented');
};
