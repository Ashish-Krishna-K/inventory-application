const express = require('express');
const router = express.Router();

const character_controller = require('../controllers/characterController');
const vision_controller = require('../controllers/visionController');

// GET home page. 
router.get('/', vision_controller.index);

// VISIONS ROUTES //

router.get('/vision/create', vision_controller.vision_create_get);

router.post('/vision/create', vision_controller.vision_create_post);

router.get('/vision/:id/update', vision_controller.vision_update_get);

router.post('/vision/:id/update', vision_controller.vision_update_post);

router.get('/vision/:id/delete', vision_controller.vision_delete_get);

router.post('/vision/:id/delete', vision_controller.vision_delete_post);

router.get('/vision/:id', vision_controller.vision_detail);

router.get('/visions', vision_controller.vision_list);

// CHARACTER ROUTES //

router.get('/character/create', character_controller.character_create_get);

router.post('/character/create', character_controller.character_create_post);

router.get('/character/:id/update', character_controller.character_update_get);

router.post('/character/:id/update', character_controller.character_update_post);

router.get('/character/:id/delete', character_controller.character_delete_get);

router.post('/character/:id/delete', character_controller.character_delete_post);

router.get('/character/:id', character_controller.character_detail);

router.get('/characters', character_controller.character_list);



module.exports = router;
