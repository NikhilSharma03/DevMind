import React, { useEffect, useState } from 'react'
import "./Comment.css"
import PostCard from './../../components/PostCard/PostCard'
import SvgSrc  from '../../shared/SvgSrc'
import { Redirect } from 'react-router'
import { useSelector } from "react-redux";
import axios from 'axios'

const Comment = (props) => {
    const token = useSelector(state => state.user.token)
    const userID = useSelector(state => state.user.id)
    const [post, setPost] = useState(null)
    const [postComments, setPostComments] = useState([])
    const [comment, setComment] = useState("")
    const postID = props.match.params.id

    useEffect(() => {
        axios.get(process.env.REACT_APP_API + "/posts/"+postID).then(res => {
            setPost(res.data.post)
        }).catch(err => {
            if(err.response){
                alert(err.response.data.message)
            }
        })
        axios.get(process.env.REACT_APP_API + "/posts/comments/"+postID).then(res => {
            const comments = [...res.data.comments.comments].reverse()
            setPostComments(comments)
        }).catch(err => {
            if(err.response){
                alert(err.response.data.message)
            }
        })
    }, [])

    const onCommentHandler = () => {
        if(comment.length === 0){
            return alert("Enter comment...")
        }
        axios.post(process.env.REACT_APP_API + "/posts/comments/"+postID, {content: comment, creator: userID}, {headers: {token: "Bearer "+token}}).then(res => {
            const comments = [...res.data.post.comments].reverse()
            setPostComments(comments)
            setComment("")
        }).catch(err => {
            if(err.response){
                alert(err.response.data.message)
            }
        })
    }

    if(!token) {
      return <Redirect to="/login" />
    }

    const onCommentDeleteHandler = (commentID) => {
        axios.delete(process.env.REACT_APP_API + "/posts/comments/"+postID+"/"+commentID, {headers: {token: "Bearer "+token}}).then(res => {
            const comments = [...res.data.comments].reverse()
            setPostComments(comments)
        }).catch(err => {
            if(err.response){
                alert(err.response.data.message)
            }
        })
    }

    console.log(userID, postComments)

    return (
        <div className="comment__container">
            <div className="comment__main">
                {post && <PostCard hideLikesComments={true} postDetails={post} isAuthor={post.creator._id === userID} creator={post.creator.username}/>}
                <div className="comment__box">
                    {/* Comment Field */}
                    <div className="comment__field">
                        <div>
                            <input placeholder="Enter comment.." value={comment} onChange = {e => setComment(e.target.value)} />
                        </div>
                        <button onClick={onCommentHandler}>Comment</button>
                    </div>
                    {/* Comment List */}
                    <div className="comment__list">
                        {postComments.map(item => (
                            <div className="comment" key={item._id}>
                                <div className="comment__header">
                                    <h1>{item.creator.username}</h1>
                                    {
                                        userID === item.creator._id && (
                                        <div onClick={onCommentDeleteHandler.bind(this, item._id)} style={{cursor:"pointer"}}>
                                            <SvgSrc.Delete fill="#777" />
                                        </div>
                                    )}
                                </div>
                                <p>{item.content}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Comment
