import React from 'react'
import './Post.css'
import Avatar from '@mui/material/Avatar';
import { db } from "./firebase";
import firebase from "firebase";

function Post({ postId, username, caption, imageUrl }) {
    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState("");

    useEffect(() => {
        let unsubscribe;
        if (postId) {
          unsubscribe = db
            .collection("posts")
            .doc(postId)
            .collection("comments")
            .onSnapshot((snapshot) => {
              setComments(snapshot.docs.map((doc) => doc.data()));
            });
        }
  
        return () => {
          unsubscribe();
        };
      }, [postId]);

    return (
        <div className="post">
            <div className="post__header">
            <Avatar
            className="post__avatar"
            alt='Allison'
            src="/static/images/avatar/1.jpg"
            />
             <h3>{username}</h3>
            
            </div>
           
    
           
            {/* header -> avatar + usernam */}

            <img className="post__image" src= {imageUrl} alt=""/>
            
            {/* image */}
            <h4 className="post__text"><strong>{username}</strong>{caption}</h4>
            {/* username + caption */}
        </div>
    )
 
}

export default Post
