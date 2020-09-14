import passport from "passport";
import passportLocal from "passport-local";
import { Request, Response, NextFunction } from "express";

const LocalStrategy = passportLocal.Strategy;

passport.serializeUser<any, any>((user, done) => {
    done(undefined, user);
});

passport.deserializeUser((id, done) => {
  //find the user by ID.
  if (id == process.env.username) {
    done(null, id);
  } else {
    done(new Error("Invalid ID."), false);
  }
});


/**
 * Sign in using Email and Password.
 */
passport.use(new LocalStrategy((username, password, done) => {
  if (username == process.env.USERNAME
    && password == process.env.PASSWORD) {
    return done(undefined, username);
  } else {
    return done(undefined, false, {message: "Invalid Info."});
  }
}));

/**
 * Login Required middleware.
 */
export const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/");
};

/**
 * Authorization Required middleware.
 */
export const isAuthorized = (req: Request, res: Response, next: NextFunction) => {

    const user = req.user;
    if (user == process.env.username) {
      next();
    } else {
      res.redirect("/");
    }
};
