
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

function toggleFriend(){
    let element = $('.add-removeFriend');
    element.click(function(e){
        e.preventDefault();
        $.ajax({
            url: element.attr('href'),
            method: 'get',
            success: function(data){
                if(data.message == 'Friend Added'){
                    element.remove();
                    $('#friend-links').prepend(`<p>
                    <a class="add-removeFriend" href="/friends/remove_friend/?friendId=${ data.data.profile_user }">Remove Friend</a>
                </p>`);
                successNoty("Friend Added Successfully");
                }else{
                    element.remove();
                    $('#friend-links').prepend(`<p>
                    <a class="add-removeFriend" href="/friends/add_friend/?friendId=${ data.data.profile_user }">Add Friend</a>
                </p>`);
                successNoty("Friend Removed Successfully");
                }
                toggleFriend();
            }
        });
    });
}

toggleFriend();