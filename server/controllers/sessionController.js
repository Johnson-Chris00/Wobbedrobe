const mongoose = require('mongoose');
const Session = require('../models/sessionModel');
const mongoose = require('mongoose');
const Session = require('../models/sessionModel');

const sessionController = {};

sessionController.isLoggedIn = async (req, res, next) => {
  if (req.cookies.ssid === undefined) {
    return res.redirect('/signup');
  }

  const sessionId = await Session.find({ cookieId: req.cookies.ssid });

  console.log('SESSIONID!!:', sessionId);
  if (sessionId.length === 0) {
    return res.redirect('/signup');
  }

  return next();
};

sessionController.startSession = async (req, res, next) => {
  const userId = res.locals.user;
  console.log('userId!!', userId);

  if (userId === undefined) {
    console.log('res.locals.user!!!', res.locals.user);
    return next('ERROR in sessionController.isLoggedIn: No user_id');
  }

  // example from notes
  const checkForSession = await Session.findOne({ cookieId: res.locals.user });
  if (checkForSession) return next();

  coonsole.log('checkForSession!!!', checkForSession);
  Session.create({ cookieId: userId }),
    (err, sessionInfo) => {
      if (err) {
        return next('ERROR in sessionController.isLoggedIn' + err);
      } else {
        return next();
      }
    };
};

module.exports = sessionController;
