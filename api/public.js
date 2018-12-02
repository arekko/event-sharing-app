const isLoggedIn = require("../utils/middleware/isLoggedIn");
const User = require("../models/userModel");
// const upload =  multer({ dest: 'public/uploads'})
const bcrypt = require("bcrypt");
const express = require("express");
const router = express.Router();
const path = require("path");

router.get("/", (req, res) => {
  res.render("homepage", {
    user: req.user
  });
});

// router.get("/", (req, res) => {
//   console.log(req.user)
//   res.sendFile(path.join(__dirname, "..", "public/index.html"));
// });

router.get("/login", (req, res) => {
  if (req.user) {
    res.redirect("/");
  } else {
    res.render("login", {
      message: req.flash("loginMessage")
    });
  }
});

/*
 * @GET /logout
 * @desc logout user route
 *
 *
 **/
router.get("*/logout", async (req, res) => {
  await User.updateCurrentDate(req.user.uId, "last_logout_date");
  req.logout();
  res.redirect("/");
});

/*
 * @GET /registration
 * @desc logout user route
 *
 *
 **/
router.get("/registration", (req, res) => {
  if (req.user) {
    res.redirect("/");
  } else {
    res.render("register", {
      message: req.flash("signupMessage")
    });
  }
});

router.get("/profile/:id", isLoggedIn, async (req, res) => {
  const user = req.user;
  const currentUserId = req.user.uId;
  const profileId = req.params.id;
  const userProfile = await User.getUserById(req.params.id);
  if (!userProfile) {
    res.status(404);
  }
  console.log(userProfile);

  if (currentUserId === profileId) {
    res.render("profile", {
      user: req.user,
      userpr: userProfile[0],
      canUpdate: true
    });
  } else {
    res.render("profile", {
      user: req.user,
      userpr: userProfile[0],
      canUpdate: false
    });
  }
});

router.get("/edit-profile", isLoggedIn, (req, res) => {
  res.render("edit-profile", {
    user: req.user
  });
});
router.get("/change-password", isLoggedIn, (req, res) => {
  res.render("change-password", {
    user: req.user,
    message: req.flash("changepass")
  });
});

router.post("/change-password", isLoggedIn, async (req, res) => {
  const userId = req.user.uId;
  console.log(req.body);
  let hashPassword;
  try {
    hashPassword = await bcrypt.hash(req.body.newpass, 10);
  } catch (e) {
    console.error(e);
  }
  const user = await User.getUserById(userId);
  console.log(user[0].password);
  const match = await bcrypt.compare(req.body.currentpass, user[0].password);
  if (match) {
    await User.updateCurrentUser(userId, {
      password: hashPassword
    });
    res.redirect(`/profile/${userId}`);
  } else {
    req.flash("changepass", "Incorrect old password");
    res.redirect("/change-password");
  }
});

module.exports = router;
