const Character = require('../models/character');
const async = require('async');

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
  res.send('not yet implemented');
};

// Handles character creation form submission.
exports.character_create_post = (req, res, next) => {
  res.send('not yet implemented');
};

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
