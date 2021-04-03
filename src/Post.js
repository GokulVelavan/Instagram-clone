import React, { useEffect, useState } from 'react'
import "./Post.css";
import Avatar from "@material-ui/core/Avatar";
import {auth, db} from "./Firebase"
import firebase from "firebase";

function Post({postId,user,username,caption,url}) {
    const[comments,setComments]=useState([]);
    const[comment,setComment]=useState([]);

    useEffect(() => {
        let unsubscribe;
        if(postId){
            unsubscribe=db.collection("posts").doc(postId).collection("comments").orderBy("timestamp","desc").onSnapshot((snapshot)=>{
                setComments(snapshot.docs.map((doc)=>doc.data()))
            });
        }
        return () => {
            unsubscribe();
        }
    }, [postId])
    
    const postComment=(event)=>{
          event.preventDefault();
          db.collection("posts").doc(postId).collection("comments").add({
              text:comment,
              username:user.displayName,
              timestamp:firebase.firestore.FieldValue.serverTimestamp()
          });
          setComment('');
    }

    return (
        <div className="post">
            <div className="post_header">
                <Avatar
                className="post_avatar"
                 src="data:image/jpeg;base64,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"
                 alt="avatar img"
                />
            <h1>{username}</h1>
            {/* header->avatar+username */}
            </div>
            
             
             <img className="post_img" src={url}/>
             {/* image */}
              <h4 className="post_text"><strong>{username}</strong>:{caption}</h4>
             {/* cpation */}
               
                <div className="post_comments">
                     {comments.map((comment)=>(
                         <p>
                             <strong>{comment.username}</strong>{comment.text}
                         </p>
                     ))}
                </div>

               {user &&(<form className="post_comentbox">
                   <input
                     className="post_input"
                     placeholder="Add a caption"
                     value={comment}
                     onChange={(e)=>setComment(e.target.value)}
                   />
                   <button 
                    disabled={!comment}
                    className="post_button"
                    type="submit"
                    onClick={postComment}
                   >Post</button>
               </form>)}

        </div>
    )
}

export default Post
