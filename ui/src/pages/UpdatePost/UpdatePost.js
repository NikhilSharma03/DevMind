import React, { useEffect, useState } from 'react'
import { Redirect } from 'react-router'
import { useSelector } from 'react-redux'
import axios from 'axios'
import './UpdatePost.css'

import Form from '../../components/Form/Form'
import Loader from './../../components/Loader/Loader'

const UpdatePost = (props) => {
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(false)

  const postID = props.match.params.id

  const token = useSelector((state) => state.user.token)

  const onSubmitHandler = (event) => {
    event.preventDefault()

    setLoading(true)

    axios
      .patch(
        process.env.REACT_APP_API_ENDPOINT + '/api/v1/post/' + postID,
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
        setContent(res.data.data.content)
        setLoading(false)
      })
      .catch((err) => {
        alert(err.response.data.error)
        setLoading(false)
      })
  }, [])

  if (!token) {
    return <Redirect to="/login" />
  }

  if (loading) {
    return <Loader />
  }

  return (
    <div className="updatepost__container">
      <Form style={{ width: '45rem' }} onSubmit={onSubmitHandler}>
        <div className="form__banner">
          <h1>Update Post</h1>
        </div>
        <div className="form__body">
          <div className="updatepost__textarea">
            <textarea
              value={content}
              onChange={(event) => setContent(event.target.value)}
              placeholder="Type your post"
            ></textarea>
          </div>
          <button type="submit" className="form__button">
            Update
          </button>
        </div>
      </Form>
    </div>
  )
}

export default UpdatePost
