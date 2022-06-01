const UserModel = require("../models/user")
let express = require('express');
const app = require('../app');
let router = express.Router();
const cors = require("cors");
const { nanoid } = require("nanoid");
router.use(cors());



/* GET users listing. */
router.get('/', function(req, res, next) {

  req.app.locals.db.collection("users").find().toArray()
  .then(results => {
    console.log(results);
  })

  res.send('respond with a resource');
});



router.post("/", async (req, res) => {
  try {
    let user = {
      email: req.body.email,
      pw: req.body.pw,
      subscription: req.body.subscription,
    };
    const newUser = new UserModel(user);
    await newUser.save();
    res.status(201).json(user);
  } catch (err) {
    console.error(err);
  }
});



router.post("/login", async (req, res) => {
  const email = req.body.email;
  const pw = req.body.pw;

  UserModel.findOne({ email: email, pw: pw }, (err, user) => {
      
  if (!user) {
    return res.status(404).send();
  }

  return res.status(200).send(user);
});
});


router.put("/editSubscription", (req, res) => {
  try {
    res.send(req.body);
    UserModel.findOneAndUpdate(
      { email: req.body.email },
      { subscription: req.body.subscription },
      () => {}
    );
  } catch (err) {
    console.error(err);
  }
});

module.exports = router;
