#! /usr/bin/env node

console.log('This script populates some test books, authors, genres and bookinstances to your database. Specified database as argument - e.g.: populatedb mongodb+srv://cooluser:coolpassword@cluster0.a9azn.mongodb.net/local_library?retryWrites=true');

// Get arguments passed on command line
var userArgs = process.argv.slice(2);
/*
if (!userArgs[0].startsWith('mongodb')) {
    console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
    return
}
*/
var async = require('async')
var Character = require('./models/character')
var Vision = require('./models/vision')

var mongoose = require('mongoose');
var mongoDB = userArgs[0];
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var visions = []
var characters = []
const weapons = [
  'Sword',
  'Claymore',
  'Pole arm',
  'Bow',
  'Catalyst'
]

function visionCreate(name, description, archon, cb) {
  visiondetail = { name, description, archon }

  var vision = new Vision(visiondetail);

  vision.save(function (err) {
    if (err) {
      cb(err, null)
      return
    }
    console.log('New Vision: ' + vision);
    visions.push(vision)
    cb(null, vision)
  });
}

function characterCreate(name, description, vision, rarity, weapon, constellationsOwned, cb) {
  characterdetail = {
    name,
    description,
    vision,
    rarity,
    weapon,
    constellationsOwned
  }

  var character = new Character(characterdetail);
  character.save(function (err) {
    if (err) {
      cb(err, null)
      return
    }
    console.log('New Character: ' + character);
    characters.push(character)
    cb(null, character)
  });
}


function createVisions(cb) {
  async.series([
    function (callback) {
      visionCreate('Pyro', 'The vision that lets the holder manipulate the element of fire.', 'Murata', callback);
    },
    function (callback) {
      visionCreate('Cryo', 'The vision that lets the holder manipulate the element of ice.', 'Tsaritsa', callback);
    },
    function (callback) {
      visionCreate('Hydro', 'The vision that lets the holder manipulate the element of water.', 'Focalors', callback);
    },
    function (callback) {
      visionCreate('Electro', 'The vision that lets the holder manipulate the element of electricity.', 'Raiden Shogun', callback);
    },
    function (callback) {
      visionCreate('Anemo', 'The vision that lets the holder manipulate the element of air.', 'Venti', callback);
    },
    function (callback) {
      visionCreate('Geo', 'The vision that lets the holder manipulate the element of earth.', 'Zhongli', callback);
    },
    function (callback) {
      visionCreate('Dendro', 'The vision that lets the holder manipulate the element of plants.', 'Lesser Lord Kusanali', callback);
    },
  ],
    // optional callback
    cb);
}


function createCharacters(cb) {
  async.parallel([
    function (callback) {
      characterCreate('Albedo', 'chalk prince', visions[5], '5 star', weapons[0], -1, callback);
    },
    function (callback) {
      characterCreate('Aloy', 'unfortunate', visions[1], '5 star', weapons[3], 0, callback);
    },
    function (callback) {
      characterCreate('Amber', 'bunny', visions[0], '4 star', weapons[3], 2, callback);
    },
    function (callback) {
      characterCreate('Arataki Itto', 'Oni', visions[5], '5 star', weapons[1], -1, callback);
    },
    function (callback) {
      characterCreate('Barbara', 'idolu', visions[2], '4 star', weapons[4], 1, callback);
    },
    function (callback) {
      characterCreate('Beidou', 'pirate queen', visions[3], '4 star', weapons[1], 6, callback);
    },
    function (callback) {
      characterCreate('Bennett', 'badluck god', visions[0], '4 star', weapons[0], 6, callback);
    },
    function (callback) {
      characterCreate('Candace', 'deez nuts', visions[2], '4 star', weapons[2], -1, callback);
    },
    function (callback) {
      characterCreate('Chongyun', 'popsickle', visions[1], '4 star', weapons[1], 6, callback);
    },
    function (callback) {
      characterCreate('Collei', 'victim', visions[5], '4 star', weapons[3], 0, callback);
    },
    function (callback) {
      characterCreate('Cyno', 'badass', visions[3], '5 star', weapons[2], -1, callback);
    },
    function (callback) {
      characterCreate('Diluc', 'rich wine guy', visions[0], '5 star', weapons[1], -1, callback);
    },
    function (callback) {
      characterCreate('Diona', 'tsundere cat girl', visions[1], '4 star', weapons[3], 5, callback);
    },
    function (callback) {
      characterCreate('Dori', 'greedy merchant girl', visions[3], '4 star', weapons[1], -1, callback);
    },
    function (callback) {
      characterCreate('Eula', 'tsundere noble', visions[1], '5 star', weapons[1], -1, callback);
    },
    function (callback) {
      characterCreate('Faruzan', 'old young lady', visions[4], '4 star', weapons[3], -1, callback);
    },
    function (callback) {
      characterCreate('Fischl', 'chunbinyou', visions[3], '4 star', weapons[3], 4, callback);
    },
    function (callback) {
      characterCreate('Ganyu', 'cocogoat', visions[1], '5 star', weapons[3], -1, callback);
    },
    function (callback) {
      characterCreate('Gorou', 'dog boy', visions[5], '4 star', weapons[3], 1, callback);
    },
    function (callback) {
      characterCreate('Hu Tao', 'yahoo', visions[0], '5 star', weapons[2], 0, callback);
    },
    function (callback) {
      characterCreate('Jean', 'Captain lady', visions[4], '5 star', weapons[0], 0, callback);
    },
    function (callback) {
      characterCreate('Kazuha', 'best buffer', visions[4], '5 star', weapons[0], 0, callback);
    },
    function (callback) {
      characterCreate('Kaeya', 'eyepatch', visions[1], '4 star', weapons[0], 0, callback);
    },
    function (callback) {
      characterCreate('Kamisato Ayaka', 'princess', visions[1], '5 star', weapons[0], 0, callback);
    },
    function (callback) {
      characterCreate('Kamisato Ayato', 'horse', visions[2], '5 star', weapons[0], -1, callback);
    },
    function (callback) {
      characterCreate('Keqing', 'not a cat-cat lady', visions[3], '5 star', weapons[0], -1, callback);
    },
    function (callback) {
      characterCreate('Klee', 'serial bomber', visions[0], '5 star', weapons[4], -1, callback);
    },
    function (callback) {
      characterCreate('Kujou Sara', 'tengu', visions[3], '4 star', weapons[3], -1, callback);
    },
    function (callback) {
      characterCreate('Kuki Shinobu', 'cookie?', visions[3], '4 star', weapons[0], 0, callback);
    },
    function (callback) {
      characterCreate('Layla', 'sleepy elfu', visions[1], '4 star', weapons[0], -1, callback);
    },
    function (callback) {
      characterCreate('Lisa', 'scary librarian', visions[3], '4 star', weapons[4], 0, callback);
    },
    function (callback) {
      characterCreate('Mona', 'astrologer', visions[2], '5 star', weapons[4], 1, callback);
    },
    function (callback) {
      characterCreate('Nahida', 'best archon', visions[6], '5 star', weapons[4], 0, callback);
    },
    function (callback) {
      characterCreate('Nilou', 'dancer', visions[2], '5 star', weapons[0], 0, callback);
    },
    function (callback) {
      characterCreate('Ningguang', 'rich lady', visions[5], '4 star', weapons[4], 4, callback);
    },
    function (callback) {
      characterCreate('Noelle', 'maid', visions[5], '4 star', weapons[1], 6, callback);
    },
    function (callback) {
      characterCreate('QiQi', 'cursed zombie', visions[1], '5 star', weapons[0], 2, callback);
    },
    function (callback) {
      characterCreate('Raiden Shogun', 'umm... sword?', visions[3], '5 star', weapons[2], 0, callback);
    },
    function (callback) {
      characterCreate('Razor', 'wolf boi', visions[3], '4 star', weapons[1], 6, callback);
    },
    function (callback) {
      characterCreate('Rosaria', 'nun', visions[1], '4 star', weapons[2], 1, callback);
    },
    function (callback) {
      characterCreate('Sangonomiya Kokomi', 'fish?', visions[2], '5 star', weapons[4], -1, callback);
    },
    function (callback) {
      characterCreate('Sayu', 'sleepy child', visions[4], '4 star', weapons[1], 3, callback);
    },
    function (callback) {
      characterCreate('Shenhe', 'scary lady', visions[1], '5 star', weapons[2], -1, callback);
    },
    function (callback) {
      characterCreate('Shikanoin Heizou', 'detective boi', visions[4], '4 star', weapons[4], 0, callback);
    },
    function (callback) {
      characterCreate('Sucrose', 'research elfu', visions[4], '4 star', weapons[4], 5, callback);
    },
    function (callback) {
      characterCreate('Tartaglia', 'Fatui shit', visions[2], '5 star', weapons[3], -1, callback);
    },
    function (callback) {
      characterCreate('Thoma', 'maid boi', visions[0], '4 star', weapons[3], 1, callback);
    },
    function (callback) {
      characterCreate('Tighnari', 'strict boi', visions[6], '5 star', weapons[3], -1, callback);
    },
    function (callback) {
      characterCreate('Venti', 'drunk god', visions[4], '5 star', weapons[3], 0, callback);
    },
    function (callback) {
      characterCreate('Wanderer', 'fatui shit also discarded puppet', visions[4], '5 star', weapons[4], -1, callback);
    },
    function (callback) {
      characterCreate('Xiangling', 'chef lady', visions[0], '4 star', weapons[2], 6, callback);
    },
    function (callback) {
      characterCreate('Xiao', 'edgy boi', visions[4], '5 star', weapons[2], -1, callback);
    },
    function (callback) {
      characterCreate('Xingqui', 'book geek', visions[2], '4 star', weapons[0], 6, callback);
    },
    function (callback) {
      characterCreate('Xinyan', 'rock and roll', visions[0], '4 star', weapons[1], 6, callback);
    },
    function (callback) {
      characterCreate('Yae Miko', 'fox lady shrine maiden', visions[3], '5 star', weapons[4], -1, callback);
    },
    function (callback) {
      characterCreate('Yanfei', 'lawyer lady', visions[0], '4 star', weapons[4], 6, callback);
    },
    function (callback) {
      characterCreate('Yelan', 'spy lady', visions[2], '5 star', weapons[3], -1, callback);
    },
    function (callback) {
      characterCreate('Yoimiya', 'fireworks', visions[0], '5 star', weapons[3], -1, callback);
    },
    function (callback) {
      characterCreate('Yun Jin', 'chinese opera', visions[5], '4 star', weapons[2], 1, callback);
    },
    function (callback) {
      characterCreate('Zhongli', 'osmanthus wine...', visions[5], '5 star', weapons[2], 0, callback);
    }
  ],
    // optional callback
    cb);
}

async.series([
  createVisions,
  createCharacters,
],
  // Optional callback
  function (err, results) {
    if (err) {
      console.log('FINAL ERR: ' + err);
    }
    else {
      console.log('Characters: ' + characters);

    }
    // All done, disconnect from database
    mongoose.connection.close();
  });



