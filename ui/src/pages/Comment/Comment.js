import React, { useEffect, useState } from 'react'
import { Redirect } from 'react-router'
import { useSelector } from 'react-redux'
import axios from 'axios'
import './Comment.css'

import PostCard from './../../components/PostCard/PostCard'
import Loader from './../../components/Loader/Loader'

const Comment = (props) => {
  const [post, setPost] = useState(null)
  const [comments, setComments] = useState([])
  console.log('🚀 ~ comments:', comments)
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(false)

  const postID = props.match.params.id

  const token = useSelector((state) => state.user.token)
  const userID = useSelector((state) => state.user.id)

  const onCommentHandler = () => {
    if (content.length === 0) {
      return alert('Enter comment...')
    }
    setLoading(true)

    axios
      .post(
        process.env.REACT_APP_API_ENDPOINT + '/api/v1/comment/' + postID,
        { content },
        { headers: { authorization: 'Bearer ' + token } }
      )
      .then((_) => {
        setLoading(false)
        props.history.push('/feed')
      })
      .catch((err) => {
        alert(err.response.data.error)
        setLoading(false)
      })
  }

  useEffect(() => {
    setLoading(true)

    axios
      .get(process.env.REACT_APP_API_ENDPOINT + '/api/v1/post/' + postID)
      .then((res) => {
        setPost(res.data.data)
        setComments(res.data.data.comments)
        setLoading(false)
      })
      .catch((err) => {
        alert(err.response.data.error)
        setLoading(false)
      })
  }, [])

  if (loading) {
    return <Loader />
  }

  if (!token) {
    return <Redirect to="/login" />
  }

  return (
    <div className="comment__container">
      <div className="comment__main">
        {post && (
          <PostCard
            isAuthor={post.user._id === userID}
            data={post}
            hideLikesComments={true}
          />
        )}
        <div className="comment__box">
          <div className="comment__field">
            <div>
              <input
                placeholder="Enter comment.."
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </div>
            <button onClick={onCommentHandler}>Comment</button>
          </div>
          <div className="comment__list">
            {comments.map((comment) => (
              <div className="comment" key={comment._id}>
                <div className="comment__header">
                  <h1>{comment.user.username}</h1>
                </div>
                <p>{comment.content}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Comment
