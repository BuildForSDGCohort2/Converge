
const router = require('express').Router();
//import User model
const User = require("../model/User");
const { body, validationResult } = require('express-validator');
const bcrypt = require("bcrypt");


//register
router.post("/register", [
    //name
    body('name').isLength({ min: 6 }).notEmpty(),
  // username must be an email
  body('email').isEmail().normalizeEmail(),
  // password must be at least 5 chars long
  body('password').isLength({ min: 6 })
],async (req, res) => {
  // Finds the validation errors in this request and wraps them in an object with handy functions
  const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        } else {
            //check is user email already exists
            const emailExist = await User.findOne({ email: req.body.email });
            if (emailExist) { return res.send("User email exists"); }
            else {
                const salt = await bcrypt.genSalt(10);
                const hashedPassword = await bcrypt.hash(req.body.password, salt);
                const user = new User({
                    name: req.body.username,
                    email: req.body.email,
                    password: hashedPassword,
                });
                try {
                    //save new user 
                    const savedUser = await user.save();
                    res.send(savedUser);
                } catch (error) {
                    console.log(error);
                }
            }
        }
});
//login
router.post(
  "/login",
  [
 
    // username must be an email
    body("email").isEmail().normalizeEmail(),
    // password must be at least 5 chars long
    body("password").isLength({ min: 6 }),
  ],
  async (req, res) => {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
      if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
      }
      else {
          const salt = await bcrypt.genSalt(10);
          const hashedPassword = await bcrypt.hash(req.body.password, salt);
          const user = new User({

              email: req.body.email,
              password: hashedPassword,
          });
     
          //check is user email already exists
          const userExists = await User.findOne({ email: req.body.email });
          if (!userExists) {
              return res.send("You need to register");
          }
          //Check password
          const validPassword = await bcrypt.compare(
              req.body.password,
              user.password
          );
          if (!validPassword) {
              res.send("Wrong password");
          }
          else {
              res.send("Logged in");
          }
      }
  }
);

module.exports = router;