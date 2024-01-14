import React, { useState } from 'react'
import { Redirect } from 'react-router'
import { useSelector } from 'react-redux'
import axios from 'axios'
import './AddPost.css'

import Form from '../../components/Form/Form'
import Loader from './../../components/Loader/Loader'

const AddPost = (props) => {
  const [content, setContent] = useState('')
  const [image, setImage] = useState(null)
  const [loading, setLoading] = useState(false)

  const token = useSelector((state) => state.user.token)

  const onFileChange = (event) => {
    setImage(event.target.files[0])
  }

  const onSubmitHandler = (event) => {
    event.preventDefault()

    setLoading(true)

    const formData = new FormData()
    formData.append('content', content)
    formData.append('image', image)

    axios
      .post(`${process.env.REACT_APP_API_ENDPOINT}/api/v1/post`, formData, {
        headers: { authorization: 'Bearer ' + token },
      })
      .then((_) => {
        setLoading(false)
        props.history.push('/feed')
      })
      .catch((err) => {
        const error = Array.isArray(err.response.data.error)
          ? err.response.data.error.map(({ message }) => message).join(' ')
          : err.response.data.error

        alert(error)
        setLoading(false)
      })
  }

  if (!token) {
    return <Redirect to="/login" />
  }

  if (loading) {
    return <Loader />
  }

  return (
    <div className="addpost__container">
      <Form style={{ width: '55rem' }} onSubmit={onSubmitHandler}>
        <div className="form__banner">
          <h1>Add Post</h1>
        </div>
        <div className="form__body">
          <div className="addpost__textarea">
            <textarea
              onChange={(event) => setContent(event.target.value)}
              value={content}
              placeholder="Type your post"
            ></textarea>
          </div>
          <div className="addpost--image__picker">
            <p>{!image ? 'Not Uploaded' : 'Uploaded ✓'}</p>
            <label htmlFor="addpost__image--picker">Upload Image</label>
            <input
              type="file"
              onChange={onFileChange}
              id="addpost__image--picker"
              style={{ display: 'none' }}
              accept=".jpg,.png,.jpeg"
            />
          </div>
          <button type="submit" className="form__button">
            Create
          </button>
        </div>
      </Form>
    </div>
  )
}

export default AddPost
