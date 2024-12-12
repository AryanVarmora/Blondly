const express = require ('express');
const app = express();
const router = express.Router();
const bodyParser = require("body-parser");
const User = require('../../schemas/UserSchema');
const Post = require('../../schemas/PostSchema');




app.use(bodyParser.urlencoded({ extended: false }));

router.get("/", (req, res, next ) => {
    Post.find()
    .populate("postedBy")
    // .populate("retweetData")
    .sort({"createdAt": -1})
    .then(results => res.status(200).send(results))
    .catch(error => {
        console.log(error);
        res.sendStatus(400);
    })
    
});
router.post("/", async(req, res, next ) => {

    if (!req.body.content) {
        console.log("content param not set");
        return res.sendStatus(400);
    }

    var postData = {
        content: req.body.content,
        postedBy: req.session.user
    }

    Post.create(postData)
    .then(async newPost => {
        newPost = await User.populate(newPost, { path: "postedBy"})

        res.status(201).send(newPost);
    })

    .catch(error => {
        console.log(error);
        res.sendStatus(400);
        
    })


    
    

});

// router.put("/:id/like", async(req, res, next ) => {


//     var postId = req.params.id;
//     var userId = req.session.user._id;

//     var isLiked = req.session.user.likes && req.session.user.likes.includes(postId);
    


//     var option = isLiked ? "$pull" : "$addToSet";

    
//     // Insert User Like 

//     req.session.user = await User.findByIdAndUpdate(userId,{ [option]: {likes: postId } }, {new: true})
//     .catch(error => {
//         console.log(error);
//         res.sendStatus(400);
//     })

//     // Insert Post like

//     var post  = await Post.findByIdAndUpdate(postId,{ [option]: {likes: userId }}, {new: true})
//     .catch(error => {
//         console.log(error);
//         res.sendStatus(400); 
//     })




//     res.status(200).send("Liked")
   
// });


router.put("/:id/like", async(req, res) => {
    var postId = req.params.id;
    var userId = req.session.user._id;

    // Check if already liked to decide if pulling or adding to the set
    var post = await Post.findById(postId);
    var isLiked = post.likes.includes(userId);
    var option = isLiked ? "$pull" : "$addToSet";

    try {
        // Update user's likes
        await User.findByIdAndUpdate(userId, { [option]: { likes: postId } }, { new: true });

        // Update post's likes and return updated post
        post = await Post.findByIdAndUpdate(postId, { [option]: { likes: userId } }, { new: true }).populate('postedBy');
        res.status(200).send(post);
    } catch (error) {
        console.log(error);
        res.sendStatus(400);
    }
});

// router.post("/:id/retweet", async(req, res) => {


//     var postId = req.params.id;
//     var userId = req.session.user._id;
//     var deletedPost = await Post.findOneAndDelete({postedBy: userId, retweetData: postId })
//     .catch(error => {
//         console.log(error);
//         res.sendStatus(400);
//     })


//     var option = deletedPost != null ? "$pull" : "$addToSet";

//     var repost = deletedPost;

//     if (repost == null) {
//         repost = await Post.create({postedBy: userId, retweetData: postId})
//         .catch(error => {
//             console.log(error);
//             res.sendStatus(400);
//         })
        
//     }
//     // Check if already liked to decide if pulling or adding to the set
//     var post = await Post.findById(postId);
//     var isLiked = post.likes.includes(userId);
//     var option = isLiked ? "$pull" : "$addToSet";

//     try {
//         // Update user's likes
//         await User.findByIdAndUpdate(userId,{ [option]: {retweets: repost._id } }, {new: true});

//         // Update post's likes and return updated post
//         await Post.findByIdAndUpdate(postId,{ [option]: {retweetUsers: userId }}, {new: true})
//         res.status(200).send(post);
//     } catch (error) {
//         console.log(error);
//         res.sendStatus(400);
//     }
// });


router.post("/:id/retweet", async(req, res ) => {



    var postId = req.params.id;
    var userId = req.session.user._id;

    // Delete
    var deletedPost = await Post.findOneAndDelete({postedBy: userId, retweetData: postId })
    .catch(error => {
        console.log(error);
        res.sendStatus(400);
    })


    var option = deletedPost != null ? "$pull" : "$addToSet";

    var repost = deletedPost;

    if (repost == null) {
        repost = await Post.create({postedBy: userId, retweetData: postId})
        .catch(error => {
            console.log(error);
            res.sendStatus(400);
        })
        
    }
    // Insert User Like 

    req.session.user = await User.findByIdAndUpdate(userId,{ [option]: {retweets: repost._id } }, {new: true})
    .catch(error => {
        console.log(error);
        res.sendStatus(400);
    })

    // Insert Post like

    var post  = await Post.findByIdAndUpdate(postId,{ [option]: {retweetUsers: userId }}, {new: true})
    .catch(error => {
        console.log(error);
        res.sendStatus(400); 
    })




//     // res.status(200).send("Liked")
   
});

module.exports = router;
