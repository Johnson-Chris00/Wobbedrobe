const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const router = express.Router();
const userController = require('../controllers/userController.js');
const cookieController = require('../controllers/cookieController.js');
const sessionController = require('../controllers/sessionController.js');
const wobbedrobeController = require('../controllers/wobbedrobeController.js');
const ootdController = require('../controllers/ootdController.js');

router.post(
  '/login',
  userController.verifyUser,
  cookieController.setCookie,
  cookieController.setSSIDCookie,
  // sessionController.isLoggedIn,
  // sessionController.startSession,
  wobbedrobeController.getTopsForUser,
  wobbedrobeController.getBottomsForUser,
  wobbedrobeController.getOverallsForUser,
  wobbedrobeController.getShoesForUser,
  ootdController.getOutfitsForUser,
  (req, res) => {
    console.log('POST /user/login route hit');
    const { user_id, username } = res.locals.userData;
    res.status(200).json({
      user_id,
      username,
      wardrobe: {
        top: res.locals.tops,
        bottom: res.locals.bottoms,
        overall: res.locals.overalls,
        shoes: res.locals.shoes,
      },
      outfit: res.locals.outfits,
    });
  }
);

router.post(
  '/signup',
  userController.createUser,
  // sessionController.startSession,
  // cookieController.setSSIDCookie,
  // cookieController.setSSIDCookie,
  // sessionController.startSession,
  (req, res) => {
    console.log('POST /user/signup route hit');
    console.log(process.env.PG_URI);
    const { user_id, username } = res.locals.userData;
    res.status(200).json({
      user_id,
      username,
      wardrobe: {
        top: [],
        bottom: [],
        overall: [],
        shoes: [],
      },
      outfit: [],
    });
  }
);

router.delete('/delete', (req, res) => {
  console.log('DELETE /user/delete route hit');
  res.status(200).json({});
});

router.get('/all', userController.getAllUsers, (req, res) => {
  res.status(200).json({});
});

router.get(
  '/get/:id',
  userController.getUserById,
  wobbedrobeController.getTopsForUser,
  wobbedrobeController.getBottomsForUser,
  wobbedrobeController.getOverallsForUser,
  wobbedrobeController.getShoesForUser,
  ootdController.getOutfitsForUser,
  (req, res) => {
    console.log('GET /user/get/:id route hit');
    const { user_id, username } = res.locals.userData;
    res.status(200).json({
      user_id,
      username,
      wardrobe: {
        top: res.locals.tops,
        bottom: res.locals.bottoms,
        overall: res.locals.overalls,
        shoes: res.locals.shoes,
      },
      outfit: res.locals.outfits,
    });
  }
);

// Unknown route handler
router.use('*', (req, res) => {
  res.status(404).send('Not Found');
});

// Global error handler
router.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

module.exports = router;
