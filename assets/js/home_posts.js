

{
    let successNoty = function(msg){
        new Noty({
            theme: 'relax',
            text: msg,
            type: 'success',
            layout: 'topRight',
            timeout: 1500
            }).show();
    }

    let errorNoty = function(msg){
        new Noty({
            theme: 'relax',
            text: msg,
            type: 'error',
            layout: 'topRight',
            timeout: 1500
            }).show();
    }
    //method to submit the form data of new post using ajax
    let createPost = function(){
        let newPostForm = $('#new-post-form');

        newPostForm.submit(function(e){
        e.preventDefault();

            $.ajax({
                type: 'post',
                url: '/posts/create',
                data: newPostForm.serialize(),
                success: function(data){
                    let newPost = newPostDom(data.data.post[0]);
                    $('#posts-list-container>ul').prepend(newPost);
                    successNoty("Post Published");
                    let links = $(' .delete-post-button, newPost');
                    for(link of links){
                        deletePost(link);
                    }
                },
                error: function(error){
                    errorNoty("Error in Publishing Post");
                    console.log(error.responseText);
                }
            });
        });
    }

    //method to create a post in DOM
    let newPostDom = function(post){
        return(`<li id="Post-${post._id}">
        <p>
            <small>
                <a class="delete-post-button" href="/posts/destroy/${ post._id }">X</a>
            </small>
            ${post.content} 
        </p>
        <small>
            ${ post.user.name }
        </small>
        <p>
            <div>
                <form action="/comments/create" method="post">
                    <input type="text" name="content" placeholder="Type comment..">
                    <input type="hidden" name="post" value='${post._id}'> 
                    <input type="submit" value="Comment">
                </form>
            </div>
        </p>
        <div class="post-comments-list">
            <ul id="post-comments-${post._id}">
                
            </ul>
        </div>
    </li>`);
    }

    //method to delete post
    let deletePost = function(deleteLink){
        $(deleteLink).click(function(e){
            e.preventDefault();
            $.ajax({
                type: 'get',
                url: $(deleteLink).prop('href'),
                success: function(data){
                    $(`#Post-${data.data.post_id}`).remove();
                    successNoty("Post Deleted");
                },
                error: function(error){
                    errorNoty("Error In Deleting Post");
                    console.log(error.responseText);
                }
            });
        });
    }

    let callDeletePost = function(){
        let allLinks = $('.delete-post-button');
        for(link of allLinks){
            deletePost(link);
        }
    }
    callDeletePost();
    createPost();
    
}