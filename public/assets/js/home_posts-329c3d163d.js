{let t=function(){let t=$("#new-post-form");t.submit((function(s){s.preventDefault(),$.ajax({type:"post",url:"/posts/create",data:t.serialize(),success:function(t){console.log(t);let s=e(t.data.post);$("#posts-list-container>ul").prepend(s),n($(" .delete-post-button",s)),new PostComments(t.data.post._id),new ToggleLike($(" .toggle-like-button",s)),setFlash("success","Post Created Successfully!")},error:function(t){console.log(t.responseText)}})}))},e=function(t){return $(`<li id="post-${t._id}">\n        <p>\n           \n                <small>\n                    <a class="delete-post-button" href="/posts/destroy/${t._id}">X</a>\n                </small>\n               \n                ${t.content}\n                        <br>\n                        <small>\n                        ${t.user.name}\n                        </small>\n                        <br>\n                        <small>\n                            <a class="toggle-like-button" data-likes="0" href="/likes/toggle/?id=${t._id}&type=Post">0 Likes</a>\n                        </small>\n        </p>\n        <div class="post-comments">\n          \n                <form id="post-${t._id}-comments-form" action="/comments/create" method="POST">\n                    <input type="text" name="content" placeholder="Type Here to add comment..." required>\n                    <input type="hidden" name="post" value="${t._id}">\n                    <input type="submit" value="Add Comment">\n                </form>\n    \n               \n    \n                    <div class="post-comments-list">\n                        <ul id="post-comments-${t._id}">\n                            \n                        </ul>\n                    </div>\n        </div>\n    \n    </li>`)},n=function(t){$(t).click((function(e){e.preventDefault(),$.ajax({type:"get",url:$(t).prop("href"),success:function(t){$(`#post-${t.data.post_id}`).remove(),setFlash("success","Post Deleted!")},error:function(t){console.log(t.responseText)}})}))},s=function(){$("#posts-list-container>ul>li").each((function(){let t=$(this),e=$(" .delete-post-button",t);n(e);let s=t.prop("id").split("-")[1];new PostComments(s)}))};t(),s()}