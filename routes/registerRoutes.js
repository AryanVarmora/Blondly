const express = require('express');
const app = express();
const router = express.Router();
const bodyParser = require("body-parser");
const User = require('../schemas/UserSchema');
const bcrypt = require("bcrypt");
app.set("view engine", "pug");
app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: false }));

router.get("/", (req, res, next) => {
    res.status(200).render("register");
});

router.post("/", async (req, res, next) => {
    // Ensure all fields are retrieved from req.body and validate them
    var firstName = req.body.firstName ? req.body.firstName.trim() : "";
    var lastName = req.body.lastName ? req.body.lastName.trim() : "";
    var username = req.body.username ? req.body.username.trim() : "";
    var email = req.body.email ? req.body.email.trim() : "";
    var password = req.body.password || "";

    // Create a payload to send back in case of error
    var payload = req.body;

    // Validate all fields
    if (firstName && lastName && username && email && password) {
       var user = await User.findOne({
            $or: [
                { username: username },
                { email: email }
            ]
        })
       .catch((err) => {
        console.log(error);
        payload.errorMessage = "Something went Worng.";
        res.status(200).render("register", payload);
        })
       
       
    } if ( user == null){
        //User Not Found
        var data = req.body;

        data.password = await bcrypt.hash(password, 10);

        User.create(data)
        .then((user) => {
            req.session.user = user;
            return res.redirect("/")
        })
    }
    else{
        if (email == user.email){
            payload.errorMessage = "Email already in use.";
        }
        else{
            payload.errorMessage = "Username already in use.";
        }
        res.status(200).render("register", payload);
    }
});

module.exports = router;
