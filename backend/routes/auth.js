const router = require("express").Router();
const User = require("../models/User");

router.get("/", (req, res) => {
    res.send("auth router");
});

router.post("/login", async (req, res) => {
    try {
        const user = await User.findOne({email: req.body.email});
        if (!user) {
            return res.status(404).send("ユーザが見つかりません");
        }

        const vailedPassword = req.body.password === user.password;
        if (!vailedPassword) {
            return res.status(400).json("パスワードが違います");
        }
        return res.status(200).json(user);
    } catch (err) {
        return res.status(500).json(err);
    }
});

module.exports = router;