const express = require('express');

const router = express.Router();

const friendsController = require('../controllers/friends_controller');

router.get('/add_friend/',friendsController.addFriend);

router.get('/remove_friend/',friendsController.removeFriend);

module.exports = router;