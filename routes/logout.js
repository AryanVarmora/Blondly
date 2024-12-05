const express = require('express');
const app = express();
const router = express.Router();
const bodyParser = require("body-parser");

app.set("views", "views");
app.use(bodyParser.urlencoded({ extended: false }));

router.get("/", (req, res, next) => {
    // Destroy the session and redirect
    req.session.destroy((err) => {
        if (err) {
            console.error("Failed to destroy session:", err);
            return res.status(500).send("Error logging out");
        }
        res.redirect("/login");
    });
});

module.exports = router;
