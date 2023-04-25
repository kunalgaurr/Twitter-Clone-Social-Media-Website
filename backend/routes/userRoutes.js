const express = require('express');
const {
  registerUser,
  loginUser,
  getAllUser,
  getSingleUser,
  updateUser,
  deleteUser,
  followUser,
  logoutUser,
  getProfileDetails,
} = require('../controller/userController');
const router = express.Router();

router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/').get(getProfileDetails);
router.route('/all').get(getAllUser);
router.route('/:id').get(getSingleUser).put(updateUser).delete(deleteUser);
router.route('/:id/follow').put(followUser);
router.route('/logout/:id').post(logoutUser);
router.route('/:id/reset');

module.exports = router;
