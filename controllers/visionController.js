const Vision = require('../models/vision');
const Character = require('../models/character');

const async = require("async");


exports.index = (req, res, next) => {
  async.parallel(
    {
      total_characters(callback) {
        Character.countDocuments({}, callback);
      },
      characters_owned(callback) {
        Character.countDocuments({ constellationsOwned: { $gte: 0 } }, callback);
      }
    },
    (err, results) => {
      res.render("index", {
        title: "Genshin Characters Inventory",
        error: err,
        data: results,
      });
    }
  );
};

// Display list of Visions.
exports.vision_list = (req, res, next) => {
  Vision.find()
    .exec((err, list_visions) => {
      if (err) {
        next(err);
      } else {
        res.render("visions", {
          vision_list: list_visions
        })
      }
    })
};

// Display a whole vision detail page.
exports.vision_detail = (req, res, next) => {
  async.parallel(
    {
      visionInDetail(callback) {
        Vision.findById(req.params.id).exec(callback);
      },
      vision_characters(callback) {
        Character.find({ vision: req.params.id }).exec(callback);
      },
    },
    (err, results) => {
      if (err) {
        return next(err);
      }
      if (results.vision === null) {
        const err = new Error('Vision not found');
        err.status = 404;
        return next(err);
      }
      res.render("vision_detail", {
        title: results.visionInDetail.name,
        vision: results.visionInDetail,
        vision_characters: results.vision_characters
      })
    }
  )
};

// Display vision creation form on GET.
exports.vision_create_get = (req, res, next) => {
  res.send('not yet implemented');
};

// Handles vision creation form submission.
exports.vision_create_post = (req, res, next) => {
  res.send('not yet implemented');
};

// Display vision edit form on GET.
exports.vision_update_get = (req, res, next) => {
  res.send('not yet implemented');
};

// Handles vision edit form submission.
exports.vision_update_post = (req, res, next) => {
  res.send('not yet implemented');
};

// Display vision delete form on GET.
exports.vision_delete_get = (req, res, next) => {
  res.send('not yet implemented');
};

// Handles vision delete form submission.
exports.vision_delete_post = (req, res, next) => {
  res.send('not yet implemented');
};
