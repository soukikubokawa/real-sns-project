const router = require("express").Router();
const User = require("../models/User");

// ユーザ登録する
router.post("/register", async (req, res) => {
    try {
        const newUser = await new User({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        });
        const user = await newUser.save();
        return res.status(200).json(user);
    } catch (err) {
        // 500はサーバ関連エラー
        return res.status(500).json(err);
    }
});

// 全ユーザ情報の取得する
router.get("/get/all", async (req, res) => {
    try {
        const users = await User.find();
        // _docはユーザ情報を含む
        // const {password, updatedAt, ...theOthers} = users._doc;
        return res.status(200).json(users);
    } catch (err) {
        return res.status(500).json(err);
    }
});

// クエリでユーザ情報の取得する
router.get("/get", async (req, res) => {
    const userId = req.query.userId;
    // const username = req.query.username;

    try {
        const user = await User.findById(userId);
        // _docはユーザ情報を含む
        const {password, updatedAt, ...theOthers} = user._doc;
        return res.status(200).json(theOthers);
    } catch (err) {
        return res.status(500).json(err);
    }
});

// ユーザ情報の更新する
router.put("/update/:id", async (req, res) => {
    if (req.body.userId === req.params.id || req.body.isAdmin) {
        try {
            const user = await User.findByIdAndUpdate(req.params.id, {
                $set: req.body
            });
            return res.status(200).json("ユーザ情報が更新されました");
        } catch (err) {
            return res.status(500).json(err);
        }
    } else {
        return res.status(403).json("自分のアカウント情報のみ更新できます");
    }
});

// ユーザ情報の削除する
router.delete("/delete/:id", async (req, res) => {
    if (req.body.userId === req.params.id || req.body.isAdmin) {
        try {
            const user = await User.findByIdAndDelete(req.params.id);
            return res.status(200).json("ユーザが削除されました");
        } catch (err) {
            return res.status(500).json(err);
        }
    } else {
        return res.status(403).json("自分のアカウント情報のみ削除できます");
    }
});

// ユーザをフォローする
router.put("/follow/:id", async (req, res) => {
    if (req.body.userId !== req.params.id) {
        try {
            const user = await User.findById(req.params.id);
            const currentUser = await User.findById(req.body.userId);
            // そのユーザをフォローしていない場合のみ、フォローする
            if (!user.followers.includes(req.body.userId)) {
                await user.updateOne({
                    $push: {
                        followers: req.body.userId
                    }
                });
                await currentUser.updateOne({
                    $push: {
                        followings: req.params.id
                    }
                });
                return res.status(200).json("フォローしました");
            } else {
                await user.updateOne({
                    $pull: {
                        followers: req.body.userId
                    }
                });
                await currentUser.updateOne({
                    $pull: {
                        followings: req.params.id
                    }
                });
                return res.status(200).json("フォローを外しました");
            }
        } catch (err) {
            return res.status(500).json(err);
        }
    } else {
        return res.status(500).json("自分自身をフォローすることはできません");
    }
});

// ユーザのフォローを外す
// router.put("/unfollow/:id", async (req, res) => {
//     if (req.body.userId !== req.params.id) {
//         try {
//             const user = await User.findById(req.params.id);
//             const currentUser = await User.findById(req.body.userId);
//             // そのユーザをフォローしている場合のみ、フォローを外す
//             if (user.followers.includes(req.body.userId)) {
//                 await user.updateOne({
//                     $pull: {
//                         followers: req.body.userId
//                     }
//                 });
//                 await currentUser.updateOne({
//                     $pull: {
//                         followings: req.params.id
//                     }
//                 });
//                 return res.status(200).json("フォローを外しました");
//             } else {
//                 return res.status(403).json("既にフォローを外しているユーザです");
//             }
//         } catch (err) {
//             return res.status(500).json(err);
//         }
//     } else {
//         return res.status(500).json("自分自身のフォローを外すことはできません");
//     }
// });

module.exports = router;