const express = require("express");
const router = express.Router();
const UserModel = require("../models/user")
const cors = require("cors");
router.use(cors());

let isLoggedIn = false;

router.get("/", (req, res) => {
  
  let loginForm = 
  `<form action="admin/login" method="post">
    <h2>Log in as an admin</h2>
    
    <input type="text" name="adminUsername" placeholder="Username">

    <input type="password" name="adminPassword" placeholder="Password">

    <button id="submit">Log in</button>

  </form>`;

  res.send(loginForm);
});

router.post("/login", (req, res) => {
    if (req.body.adminUsername == "admin" && req.body.adminPassword == "admin") {
        isLoggedIn = true;
        res.redirect("/admin/isLoggedIn");
    } else {
        res.send("Invalid credentials");
    }
});

router.get("/isLoggedIn", async (req, res) => {
    if (isLoggedIn) {
        const registeredUser = await UserModel.find();
        let logout = `<a href="/admin">Log out</a>`;
        let userList;       

        let subscribed = "<h1>Subscribed users</h1>";
        let nonSubscribed = "<h1>Non-subscribed users</h1>";
        subscribedUsers = [];
        nonSubscribedUsers = [];

        for (let i = 0; i < registeredUser.length; i++) {

            if (registeredUser[i].subscription) {
                subscribedUsers.push(" " + registeredUser[i].email);
            } else {
                nonSubscribedUsers.push (" " + registeredUser[i].email); 
            }  
        }
        res.send(logout + `</br>` + subscribed + subscribedUsers + `</br>` + nonSubscribed + nonSubscribedUsers );
        }  else {
        res.redirect("/admin");
    }
});


module.exports = router;