
const router = require('express').Router();
//import User model
const User = require("../model/User");
const { body, validationResult } = require('express-validator');

router.post("/register", [
    //name
    body('name').isLength({ min: 6 }),
  // username must be an email
  body('email').isEmail(),
  // password must be at least 5 chars long
  body('password').isLength({ min: 6 })
],async (req, res) => {
  // Finds the validation errors in this request and wraps them in an object with handy functions
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  } 
        const User = new User({
            name: req.body.username,
            email: req.body.email,
            password: req.body.password,
        });
          try {
        const savedUser = await User.save();
        res.send(savedUser);
    } catch (error) {
        console.log(error);
    }
});



module.exports = router;