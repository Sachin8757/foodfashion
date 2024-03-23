var express = require('express');
var router = express.Router();
const userModel = require("./users");
const orderModel = require("./order");
const passport = require('passport');
const localStrategy = require("passport-local");
const { use } = require('passport');
const feedbackModel = require('./feedback');
const contactModel = require('./contact');
passport.use(new localStrategy(userModel.authenticate()));
/* GET home page. */
router.get('/', async function (req, res, next) {
  res.render('index');

});

router.get('/profile', isLoggedIn, async function (req, res, next) {
  const user = await userModel.findOne({ username: req.session.passport.user });
  res.render('profile', { user });
});

// here i difine login router
router.get('/login', async function (req, res, next) {
  res.render('login', { error: req.flash('error') });
});
router.post("/login", passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/login",
  failureFlash: true
}), function (req, res) { })

//  here i difine register router
router.get('/register', function (req, res, next) {
  const finduser = null;
  res.render('register', { finduser });
});
router.post("/register", async function (req, res) {
  const finduser = await userModel.findOne({ username: req.body.username });
  if (finduser != null) {
    if (finduser.username == req.body.username) {
      res.render("register", { finduser });
    }
  }
  else {
    var userdata = new userModel({
      username: req.body.username,
      fullname: req.body.fullname,
      email: req.body.email,
      password: req.body.password,
      phoneno: req.body.phoneno
    });
    userModel.register(userdata, req.body.password).then(function (registereduser) {
      passport.authenticate("local")(req, res, function () {
        res.redirect("/");
      })
    })
  }
});
// here i digine logout router
router.get('/logout', function (req, res, next) {
  req.logout(function (err) {
    if (err) { return next(err); }
    res.redirect("/")
  });
});

// here we difine order router
router.get('/order', isLoggedIn, async function (req, res) {

  res.render("order")
});
// here a function to order food
router.post("/order", async function (req, res, next) {
  const user = await userModel.findOne({ username: req.session.passport.user });
  var orders = await orderModel.create({
    Aalo_pokora: req.body.Aalo_pokora,
    Egg_pokora: req.body.Egg_pokora,
    pokora: req.body.pokora,
    boil_egg: req.body.boil_egg,
    kacha_egg: req.body.kacha_egg,
    Egg_fry: req.body.Egg_fry,
    Egg_omeletee: req.body.Egg_omeletee,
    Egg_coch: req.body.Egg_coch,
    bred_pokora: req.body.bred_pokora,
    user: user._id,
    address:req.body.address,
    mobile_no:req.body.mobile,
    mobile_no2:req.body.mobile2,
    pincode:req.body.pincode,
    name:req.body.name
  });
  user.orders.push(orders._id);
  user.save();
  const total = (orders.Aalo_pokora * 2.5) + (orders.Egg_pokora * 5) + (orders.pokora * 1) + (orders.boil_egg * 8) + (orders.kacha_egg * 7) + (orders.Egg_fry * 10) + (orders.Egg_omeletee * 10) + (orders.Egg_coch * 10) + (orders.bred_pokora * 5);
  req.flash("totalprice",total);
  req.flash("orderid",orders._id);
  res.redirect("/final");
});

// here to difine order2 function
router.get('/final', isLoggedIn, function (req, res) {
  var price = req.flash("totalprice")
  res.render('finalorder', { price })
});

router.post("/final", async function (req, res, next) {
  res.redirect("/")
})

// here i difine my order router
router.get('/myorder', isLoggedIn, async function (req, res) {
  const user = await userModel.findOne({username:req.session.passport.user}).populate('orders');
  res.render('myorder',{user});
});
// here difind to  find allorders route function
router.get('/allorders', isLoggedIn, async function (req, res) {
  const user = await userModel.findOne({ username: req.session.passport.user });
  if (user.password == "Sachin@12345" && user.username == "sachin") {
    const userorder = await orderModel.find().populate('user');
    res.render("allorders", { userorder });
  } else {
    res.redirect("/");
  }

});
// here a function to give feedback
router.get('/feedback', isLoggedIn, function (req, res) {
  res.render("feedback");
});
router.post("/feedback", async function (req, res, next) {
  const feedback = await feedbackModel.create({
    name: req.body.name,
    phone: req.body.phone,
    feed: req.body.feed
  })
  res.redirect('/')
})
// here a function to find all user in website
router.get('/alluser', isLoggedIn, async function (req, res) {
  const user = await userModel.findOne({ username: req.session.passport.user });
  if (user.password == "Sachin@12345" && user.username == "sachin") {
    const users = await userModel.find();
    res.render("alluser", { users });
  } else {
    res.redirect("/");
  }

});
// here a function to find all feedback
router.get('/allfeedback', isLoggedIn, async function (req, res) {
  const user = await userModel.findOne({ username: req.session.passport.user });
  if (user.password == "Sachin@12345" && user.username == "sachin") {
    const feedback = await feedbackModel.find();
    res.render("allfeed", { feedback });
  } else {
    res.redirect("/");
  }

});
// here a function to contact us
router.get('/contact', isLoggedIn, function (req, res) {
  res.render("contact");
});
router.post("/contact", async function (req, res, next) {
  const contact = await contactModel.create({
    name: req.body.name,
    phone: req.body.phone,
    email: req.body.email,
    msg: req.body.msg
  })
  res.redirect('/')
})
// here a function to check all contact 
router.get('/allcontact', isLoggedIn, async function (req, res) {
  const user = await userModel.findOne({ username: req.session.passport.user });
  if (user.password == "Sachin@12345" && user.username == "sachin") {
    const contact = await contactModel.find();
    res.render("allcontact", { contact });
  } else {
    res.redirect("/");
  }

});
// here a functionto send about page
router.get('/about', function (req, res) {
  res.render("about");
});


// here i difine cheching function if user is login or not
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
}
module.exports = router;
