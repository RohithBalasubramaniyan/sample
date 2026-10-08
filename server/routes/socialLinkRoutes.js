const express = require('express');
const router = express.Router();
const {
  getSocialLinks,
  createSocialLink,
  updateSocialLink,
  deleteSocialLink,
} = require('../controllers/socialLinkController');
const { protect } = require('../middleware/authMiddleware');

router.route('/')
  .get(getSocialLinks)
  .post(protect, createSocialLink);

router.route('/:id')
  .put(protect, updateSocialLink)
  .delete(protect, deleteSocialLink);

module.exports = router;
