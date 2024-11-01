const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const brcrypt = require("bcryptjs");
const { check, validationResult } = require("express-validator");

const User = require("../../models/user");

router.post(
  "/",
  [
    check("name", "name is required").not().isEmpty(),
    check("email", "email is required").isEmail(),
    check(
      "password",
      "Please enter a password with 6 or more characters"
    ).isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
      let user = await User.findOne({ email });

      if (user) {
        res.status(400).json({ errors: [{ msg: "User already exist" }] });
      }

      const avatar = gravatar.url(email, {
        s: "200", //size
        r: "pg",
        d: "mm",
      });

      user = new User({
        name,
        email,
        avatar,
        password,
      });

      const salt = await brcrypt.genSalt(10);

      user.password = await brcrypt.hash(password, salt);

      await user.save();

      res.send("User Route");
    } catch (err) {
      console.error(err.message);
      res.status(500).send("server error");
    }
  }
);

module.exports = router;
