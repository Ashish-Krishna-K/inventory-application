const Vision = require('../models/vision');
const Character = require('../models/character');

const async = require("async");
const { body, validationResult } = require("express-validator");


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
      characters_in_vision(callback) {
        Character.countDocuments({ vision: req.params.id }, callback);
      },
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
        count_of_characters: results.characters_in_vision,
        vision_characters: results.vision_characters
      })
    }
  )
};

// Display vision creation form on GET.
exports.vision_create_get = (req, res, next) => {
  res.render("vision_form", { title: "Create Vision" });
};

// Handles vision creation form submission.
exports.vision_create_post = [
  body("name")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("Name is required")
    .isAlpha()
    .withMessage("Vision name must be letters"),
  body("description")
    .trim()
    .optional({ checkFalsy: true }),
  body("archon")
    .trim()
    .isAlpha()
    .withMessage("Archon name must be letters")
    .optional({ checkFalsy: true }),
  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.render("vision_form", {
        title: "Create Vision",
        vison: req.body,
        errors: errors.array(),
      });
      return;
    }
    const vision = new Vision({
      name: req.body.name,
      description: req.body.description,
      archon: req.body.archon,
    });
    vision.save((err) => {
      if (err) {
        next(err);
      } else {
        res.redirect(vision.url);
      };
    });
  },
];

// Display vision edit form on GET.
exports.vision_update_get = (req, res, next) => {
  async.parallel(
    {
      vision(callback) {
        Vision.findById(req.params.id).exec(callback)
      }
    },
    (err, results) => {
      if (err) {
        return next(err)
      }
      if (results.vision === null) {
        const err = new Error("Vision not found")
        err.status = 404;
        return next(err);
      }
      res.render("vision_form", {
        title: "Edit Vision Details",
        vision: results.vision,
      })
    }
  )
};

// Handles vision edit form submission.
exports.vision_update_post = [
  body("name")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("Name is required")
    .isAlpha()
    .withMessage("Vision name must be letters"),
  body("description")
    .trim()
    .optional({ checkFalsy: true }),
  body("archon")
    .trim()
    .isAlpha()
    .withMessage("Archon name must be letters")
    .optional({ checkFalsy: true }),
  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.render("vision_form", {
        title: "Create Vision",
        vison: req.body,
        errors: errors.array(),
      });
      return;
    }
    const vision = new Vision({
      name: req.body.name,
      description: req.body.description,
      archon: req.body.archon,
      _id: req.params.id
    });
    Vision.findByIdAndUpdate(req.params.id, vision, {}, (err, thevision) => {
      if (err) {
        next(err);
      } else {
        res.redirect(thevision.url);
      }
    })
  },
]

// Display vision delete form on GET.
exports.vision_delete_get = (req, res, next) => {
  async.parallel(
    {
      vision(callback) {
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
        res.redirect('/visions')
      }
      res.render("vision_delete", {
        title: "Delete Vision",
        vision: results.vision,
        vision_characters: results.vision_characters,
      })
    }
  )
};

// Handles vision delete form submission.
exports.vision_delete_post = (req, res, next) => {
  async.parallel(
    {
      vision(callback) {
        Vision.findById(req.body.visionid).exec(callback);
      },
      vision_characters(callback) {
        Character.find({ vision: req.body.visionid }).exec(callback);
      }
    },
    (err, results) => {
      if (err) {
        return next(err);
      }
      if (results.vision_characters.length > 0) {
        res.render("vision_delete", {
          title: "Delete Vision",
          vision: results.vision,
          vision_characters: results.vision_characters,
        });
        return;
      }
      Vision.findByIdAndRemove(req.body.visionid, (err) => {
        if (err) {
          next(err);
        } else {
          res.redirect("/visions");
        }
      })
    }
  )
};
