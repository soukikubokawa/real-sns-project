const router = require("express").Router();
const Post = require("../models/Post");
const User = require("../models/User");

// 投稿を作成する
router.post("/", async (req, res) => {
     const newPost = new Post(req.body);
     try {
        const savedPost = await newPost.save();
        return res.status(200).json(savedPost);
     } catch (err) {
        return res.status(500).json(err);
     }
});

// 投稿を更新する
router.put("/update/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (post.userId === req.body.userId) {
            await post.updateOne({
                $set: req.body
            });
            return res.status(200).json("投稿が更新されました");
        } else {
            return res.status(403).json("自分の投稿のみ更新できます");
        }
    } catch (err) {
        return res.status(500).json(err);
    }
});

// 投稿を削除する
router.put("/delete/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (post.userId === req.body.userId) {
            await post.deleteOne();
            return res.status(200).json("投稿が削除されました");
        } else {
            return res.status(403).json("自分の投稿のみ削除できます");
        }
    } catch (err) {
        return res.status(500).json(err);
    }
});

// 投稿を取得する
router.get("/get/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        return res.status(200).json(post);
    } catch (err) {
        return res.status(500).json(err);
    }
});

// 投稿に「いいね」をする
router.put("/like/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        // その投稿を「いいね」していない場合のみ、「いいね」する
        if (!post.likes.includes(req.body.userId)) {
            await post.updateOne({
                $push: {
                    likes: req.body.userId
                }
            });
            return res.status(200).json("「いいね」をしました");
            // その投稿を「いいね」している場合、「いいね」を外す
        } else {
            await post.updateOne({
                $pull: {
                    likes: req.body.userId
                }
            });
            return res.status(200).json("「いいね」を外しました");
        }
    } catch (err) {
        return res.status(500).json(err);
    }
});

// ログインユーザのタイムライン（投稿）を取得する
router.get("/profile/:id", async (req, res) => {
    try {
        // 自分の投稿を取得する
        const user = await User.findById(req.params.id);
        // const user = await User.findOne({ username: req.params.userId });
        const userPosts = await Post.find({userId: user._id});
        return res.status(200).json(userPosts);
    } catch (err) {
        return res.status(500).json(err);
    }
});

// フォローしているユーザを含むタイムライン（投稿）を取得する
router.get("/timeline/:id", async (req, res) => {
    try {
        // 自分の投稿を取得する
        const currentUser = await User.findById(req.params.id);
        // const currentUser = await User.findOne({ username: req.params.userId });
        const currentUserPosts = await Post.find({userId: currentUser._id});
        // フォローしているユーザの投稿を取得する
        // awaitによって取得した変数を使用する場合、Promise.allが必要らしい
        const followingPosts = await Promise.all(
            currentUser.followings.map((followingId) => {
                return Post.find({userId: followingId});
            })
        );
        return res.status(200).json(currentUserPosts.concat(...followingPosts));
    } catch (err) {
        return res.status(500).json(err);
    }
});

module.exports = router;