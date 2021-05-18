const router = require('express').Router();

const { login, logout, createUser } = require('../controllers/users');
const { signInPostedDataCheck, signUpPostedDataCheck } = require('../middlewares/request-data-checking/user');

router.post('/signin', signInPostedDataCheck, login);
router.post('/signup', signUpPostedDataCheck, createUser);
router.get('/signout', logout);

module.exports = router;
