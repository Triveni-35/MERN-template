const express = require("express");
const router = express.Router();
const authControllers = require("../controllers/auth-controller");
const signupSchema = require("../validators/auth-validator")
const validate = require("../middleware/validate-middleware")

router.route('/').get(authControllers.home);
router.route('/register').post(validate(signupSchema),authControllers.register);
router.route('/login').post(authControllers.login)
module.exports = router;
