$(document).ready(() =>{

    $.get("/api/posts", results => {
        outputPosts(results, $(".postContainer"))
    })
})

function outputPosts(results, container){
    container.html("");

    results.forEach(results => {
        var html = createPostHtml(results)
        container.append(html);
    
    });
    

    if (results.length == 0)
        container.append("<span class='noResults'>Nothing to Show</span>")
}