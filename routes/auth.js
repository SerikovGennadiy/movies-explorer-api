const router = require('express').Router();

const { login, logout, createUser } = require('../controllers/users');

router.post('/signin', login);
router.post('/signup', createUser);
router.get('/signout', logout);

module.exports = router;
