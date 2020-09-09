
const router = require('express').Router();
//import User model
const User = require("../model/User");
const { body, validationResult } = require('express-validator');

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
            if (emailExist) { return res.send("User email exists"); } else {
                const user = new User({
                    name: req.body.username,
                    email: req.body.email,
                    password: req.body.password,
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
module.exports = router;