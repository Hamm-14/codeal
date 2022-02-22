

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

    //method to submit the comment using ajax
    let createComment = function(form){

        $(form).submit(function(e){
            e.preventDefault();
    
            $.ajax({
                type: 'post',
                url: '/comments/create',
                data: $(form).serialize(),
                success: function(data){
                    let newComment = newCommentDom(data.data.comment);
                    $(`#post-comments-${ data.data.comment.post }`).prepend(newComment);
                    successNoty('Comment Added');
                    let newlyAddedDeleteButton = $(' .delete-comment-button, newComment');
                    for(i of newlyAddedDeleteButton){
                        deleteComment(i);
                    }
                    //enable the functionality of the toggle like button on new comment
                    new ToggleLike($('toggle-like-button',newComment));
                },
                error: function(error){
                    console.log(error.responseText);
                }
            });
        });
    }
        //method creating DOM for newly added comment
        let newCommentDom = function(comment){
            return(`<li id="comment-${comment._id}-${comment.post}">
                <small>
                    <a class="delete-comment-button" href="/comments/destroy/?cid=${ comment._id }&pid=${ comment.post}">X</a>
                </small>
        ${ comment.content }<br>
        <small> ${ comment.user.name } </small>
        <small>
                <a class="toggle-like-button" data-likes="0" href="/likes/toggle/?type=Comment&id=${comment._id}">
                   0 Likes
                </a>
        </small>
        </li>`);
        }
    
        let deleteComment = function(deleteButton){
    
            $(deleteButton).click(function(e){
                e.preventDefault();
    
                $.ajax({
                    type: 'get',
                    url: $(deleteButton).prop('href'),
                    success: function(data){
                        $(`#comment-${data.data.comment._id}-${data.data.comment.post}`).remove();
                        successNoty('Comment Deleted');
                    },
                    error: function(error){
                        console.log(error.responseText);
                    }
                });
            });
        }
    

    let allDeleteButtons = $('.delete-comment-button');
    let allCommentForm = $('.new-comment-form');
    for(form of allCommentForm){
        createComment(form);
    }
    for(button of allDeleteButtons){
        deleteComment(button);
    }
    createComment();
}