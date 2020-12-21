const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const GoogleStrategy = require('passport-google-oauth2').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../model/UserSchema');
require('dotenv').config();

passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((user, done) => {
  done(null, user);
});

const googleStrategy = new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: `${process.env.SERVER_API_URL}/auth/google/callback`,
    proxy: true,
  },

  async (request, accessToken, refreshToken, profile, done) => {
    let existingUser = null;
    // console.log(profile);

    User.findOne({ email: profile.email }, function (err, data) {
      // console.log(`This is the found DATA ->`, data);
      if (data !== null) {
        // console.log(`Does Exist.`);
        existingUser = data._id;
        return done(null, existingUser);
      } else {
        User.create(
          {
            googleId: profile.id,
            email: profile.email,
            firstName: profile.given_name,
            lastName: profile.family_name,
            profile,
          },
          function (err, data) {
            // console.log(`Does NOT exist.`);
            // console.log(data);
            return done(err, data);
          }
        );
      }
    });
  }
);

const localStrategy = new LocalStrategy(
  { usernameField: 'email' },
  async (email, password, done) => {
    console.log(email);
    //  Find a user with some given criteria
    // if an error happened when you tried to find that user
    // call done like this done(err, null);
    let user;
    try {
      user = await User.findOneByEmail(email);
      console.log('Line 62', user);
      // user = await fetchUserByUsernameFromDb(username);
    } catch (e) {
      return done(e, null);
    }
    //   if you do find a user, check the users credentials
    //   if the users credentials match, call done like this done(null, userWeFound);
    //   What passport will do if we pass a user as the 2nd param to done
    //   on the next request that the middleware applied
    if (user) {
      console.log('Line 72', user);

      const doesPasswordMatch = await user.comparePassword(password);
      if (doesPasswordMatch) {
        return done(null, user);
      }
      console.log('happening');
      return done(null, false);
    } else {
      console.log('happening');
      return done(null, false);
    }
    // if no user was found call done like return done(null, false);
  }
);
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: process.env.MONGO_SECRET,
};

//jwt strategy
const jwtStrategy = new JwtStrategy(jwtOptions, async (jwtToken, done) => {
  // console.log('SEEE MEEEEE');
  // { sub: idOfTheUser, iat: timeThatThisTokenWasCreated }
  // console.log('THIS ONE!!!', jwtToken);
  let user;
  try {
    user = await User.findById(jwtToken.sub);
    // console.log('leh user', user);
    // user = await fetchUserByIdFromDb(jwtToken.sub);
  } catch (e) {
    return done(e, null);
  }
  if (!user) {
    return done(null, false);
  } else {
    // console.log('JWT ELSE');
    // take the user that is being passed as the 2nd parameter
    // and attach it to req.user on the next request
    return done(null, user);
  }
});
// All of the tokens will be coming in from the header
// Hey passport we have declare a strategy named 'local'
// if we tell you to authenticate using 'local'
// run the localStrategy function that we gave to you
passport.use(localStrategy);
passport.use(jwtStrategy);
passport.use(googleStrategy);

// const passport = require("passport");
// const mongoose = require("mongoose");
// const GoogleStrategy = require("passport-google-oauth2").Strategy;
// const LocalStrategy = require("passport-local").Strategy;
// const JwtStrategy = require("passport-jwt").Strategy;
// const ExtractJwt = require("passport-jwt").ExtractJwt;

// // const User = mongoose.model("users");

// // passport.serializeUser((user, done) => {
// //   done(null, user.id);
// // });
// // passport.deserializeUser((id, done) => {
// //   User.findById(id).then((user) => {
// //     done(null, user);
// //   });
// // });

// const googleStrategy = new GoogleStrategy(
//   {
//     clientID: keys.googleClientId,
//     clientSecret: keys.googleClientSecret,
//     callbackURL: "/auth/google/callback",
//     proxy: true,
//   },
//   async (accessToken, refreshToken, profile, done) => {
//     try {
//       const existingUser = await db.User.findOne({ googleId: profile.id });
//       if (existingUser) {
//         done(null, existingUser);
//       } else {
//         const user = await db.User.create({ googleId: profile.id });
//         done(null, user);
//       }
//     } catch (e) {
//       done(e);
//     }
//   }
// );

// // const googleStrategy = new GoogleStrategy(
// //   {
// //     clientID: GOOGLE_CLIENT_ID,
// //     clientSecret: GOOGLE_CLIENT_SECRET,
// //     callbackURL: "/auth/google/callback",
// //     passReqToCallback: true,
// //   },
// //   function (request, accessToken, refreshToken, profile, done) {
// //     User.findOrCreate({ googleId: profile.id }, function (err, user) {
// //       return done(err, user);
// //     });
// //   }
// // );

// const {
//   comparePassword,
//   fetchUserByUsernameFromDb,
//   fetchUserByIdFromDb,
// } = require("../model/userOrm");
// // Done is similar
// // takes 2 parameters
// // the 1st is an error or an error object
// // the 2nd is the user you found or null if you dont find one
// const localStrategy = new LocalStrategy(async (username, password, done) => {
//   console.log(`Local Strat ${username} & ${password}`);
//   //  Find a user with some given criteria
//   //   if an error happened when you tried to find that user
//   //   call done like this done(err, null);
//   let user;
//   try {
//     user = await User.findByUsername(username);
//   } catch (e) {
//     return done(e, null);
//   }
//   //   if you do find a user, check the users credentials
//   //   if the users credentials match, call done like this done(null, userWeFound);
//   //   What passport will do if we pass a user as the 2nd param to done
//   //   on the next request that the middleware applied
//   if (user) {
//     const doesPasswordMatch = await comparePassword(password, user.password);
//     if (doesPasswordMatch) {
//       console.log(doesPasswordMatch);
//       return done(null, user);
//     }
//     console.log("happening");
//     return done(null, false);
//   } else {
//     console.log("happening");
//     return done(null, false);
//   }
//   //   if no user was found call done like return done(null, false);
// });

// const jwtOptions = {
//   jwtFromRequest: ExtractJwt.fromHeader("authorization"),
//   secretOrKey: process.env.JWT_SECRET,
// };

// const jwtStrategy = new JwtStrategy(jwtOptions, async (jwtToken, done) => {
//   console.log(`jwtStrat`);
//   console.log(jwtToken);
//   // { sub: idOfTheUser, iat: timeThatThisTokenWasCreated }
//   let user;

//   try {
//     user = await fetchUserByIdFromDb(jwtToken.sub);
//   } catch (e) {
//     return done(e, null);
//   }

//   if (!user) {
//     return done(null, false);
//   } else {
//     // take the user that is being passed as the 2nd parameter
//     // and attach it to req.user on the next request
//     return done(null, user);
//   }
// });

// // All of the tokens will be coming in from the header

// // Hey passport we have declare a strategy named 'local'
// // if we tell you to authenticate using 'local'
// // run the localStrategy function that we gave to you
// passport.use(localStrategy);
// passport.use(jwtStrategy);
// passport.use(googleStrategy);
