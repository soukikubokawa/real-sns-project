const router = require("express").Router();
const Image = require("../models/Image");
const multer = require("multer");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/images");
    },
    filename: (req, file, cb) => {
        cb(null, req.body.name);
    },
})


const upload = multer({ storage: storage });

// 画像をvscode内に保存する
router.post("/", upload.single("file"), (req, res) => {
    try {
        return res.status(200).json("画像をアップロードしました")
    } catch (err) {
        return res.status(500).json(err);
    }
});

module.exports = router;