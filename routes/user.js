const router = require('express').Router();

const { getCurrentUser, updateUserProfile } = require('../controllers/users');
const { updateProfilePostedDataCheck } = require('../middlewares/request-data-checking/user');

router.get('/me', getCurrentUser);
router.patch('/me', updateProfilePostedDataCheck, updateUserProfile);

module.exports = router;
