$("#postTextArea").keyup(event => {
    var textbox = $(event.target); 
    var value = textbox.val().trim();

    var submitbutton = $("#submitPostButton");
    
    if(submitbutton.length == 0) return alert("no submitbutton found");

    if (value == "") {
        submitbutton.prop("disabled", true);
        return;
    }
    submitbutton.prop("disabled", false);
})

$("#submitPostButton").click(() => {
    var button = $(event.target);
    var textbox = $("#postTextArea");

    var data = {
        content: textbox.val()
    }

    $.post("/api/posts", data, postData => {
        var html = createPostHtml(postData);
        $(".postContainer").prepend(html);
        textbox.val("");
        button.prop("disabled", true);
    })
})



$(document).on("click", ".likeButton", (event) => {
    var button = $(event.target);
    var postId = getPostIdFromElement(button);

    if (postId === undefined) return;

    $.ajax({
        url: `/api/posts/${postId}/like`,
        type: "PUT",
        success: (postData) => {
            var likesCount = postData.likes.length || 0;
            button.find("span").text(likesCount.toString());
        
            if (postData.likes.includes(userLoggedIn._id)) {
                button.addClass("active");
            } else {
                button.removeClass("active");
            }
        },
        
        error: (error) => {
            console.log("Error liking the post:", error);
        }
    });
});

$(document).on("click", ".retweetButton", (event) => {
    var button = $(event.target);
    var postId = getPostIdFromElement(button);

    if (postId === undefined) return;

    $.ajax({
        url: `/api/posts/${postId}/retweet`,
        type: "POST",
        success: (postData) => {

            var retweetCount = postData.likes.length || "";
            button.find("span").text(retweetUsers.toString());
        
            if (postData.retweetUsers.includes(userLoggedIn._id)) {
                button.addClass("active");
            } else {
                button.removeClass("active");
            }
        },
        
        error: (error) => {
            console.log("Error liking the post:", error);
        }
    });
});



function getPostIdFromElement(element) {
    var isRoot = element.hasClass("post");
    var rootElement = isRoot == true? element: element.closest(".post");
    var postId = rootElement.data().id;


    if (postId === undefined) return("Post ID Undefined");


    return postId;
}

function createPostHtml(postData){

    if (postData == null) return alert("post object is null");

    var isRetweet = postData.retweetData !== undefined;
    var retweetedBy = isRetweet ? postData.postedBy.username: null;
    postData = isRetweet ? postData.retweetData : postData; 
    var postedBy = postData.postedBy;

    if(postedBy._id == undefined){
        return console.log("user object not populated")
    }

    var displayName = postedBy.firstName + " " + postedBy.lastName;
    var timestamp = timeDifference(new Date(), new Date(postData.createdAt));

    var likeButtonActiveClass = postData.likes.includes(userLoggedIn._id) ? "active" : ""; 
    var retweetButtonActiveClass = postData.retweetUsers.includes(userLoggedIn._id) ? "active" : ""; 

    var retweetText = '';
    if (isRetweet){
        retweetText = `<span>Retweeted By <a href='/profile/${retweetedBy}'>@${retweetedBy}</a></span>`
    }

    return `<div class='post' data-id = '${postData._id}'>
                <div class='mainContentContainer'>
                    <div class='userImageContainer'>
                        <img src='${postedBy.profilePic}'>
                    </div>
                    <div class='postContentContainer'>
                        <div class='header'>
                            <a href= '/profile/${postedBy.username}' class='displayName'>${displayName}</a>
                            <span class='username'>@${postedBy.username}</span>
                            <span class='date'>${timestamp}</span>
                        </div>
                        <div class = 'postBody'>
                            <span>${postData.content}</span>
                        </div>
                        <div class = 'postFooter'> 
                            <div class='postButtonContainer'>
                                <button>
                                    <i class="fa-regular fa-comment"></i>
                                </button>
                            </div>
                            <div class='postButtonContainer green'>
                                <button class = 'retweetButton ${retweetButtonActiveClass}'>
                                    <i class="fa-solid fa-retweet"></i>
                                    <span>${postData.retweetUsers.length || ""} </span>
                                </button>
                            </div>
                            <div class='postButtonContainer red'>
                                <button class='likeButton ${likeButtonActiveClass}'>
                                    <i class="fa-regular fa-heart"></i>
                                    <span>${postData.likes.length || ""} </span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>`;
} 


function timeDifference(current, previous) {

    var msPerMinute = 60 * 1000;
    var msPerHour = msPerMinute * 60;
    var msPerDay = msPerHour * 24;
    var msPerMonth = msPerDay * 30;
    var msPerYear = msPerDay * 365;

    var elapsed = current - previous;

    if (elapsed < msPerMinute) {
        if(elapsed/1000 <30) return "Just Now";
         return Math.round(elapsed/1000) + ' seconds ago';   
    }

    else if (elapsed < msPerHour) {
         return Math.round(elapsed/msPerMinute) + ' minutes ago';   
    }

    else if (elapsed < msPerDay ) {
         return Math.round(elapsed/msPerHour ) + ' hours ago';   
    }

    else if (elapsed < msPerMonth) {
        return  Math.round(elapsed/msPerDay) + ' days ago';   
    }

    else if (elapsed < msPerYear) {
        return Math.round(elapsed/msPerMonth) + ' months ago';   
    }

    else {
        return Math.round(elapsed/msPerYear ) + ' years ago';   
    }
}