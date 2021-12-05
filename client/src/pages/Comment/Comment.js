import React from 'react'
import "./Comment.css"
import PostCard from './../../components/PostCard/PostCard'
import SvgSrc  from '../../shared/SvgSrc'
import { Redirect } from 'react-router'
import { useSelector } from "react-redux";

const Comment = () => {
    const token = useSelector(state => state.user.token)
    if(!token) {
      return <Redirect to="/login" />
    }

    return (
        <div className="comment__container">
            <div className="comment__main">
                <PostCard />
                <div className="comment__box">
                    {/* Comment Field */}
                    <div className="comment__field">
                        <div>
                            <input placeholder="Enter comment.."/>
                        </div>
                        <button>Comment</button>
                    </div>
                    {/* Comment List */}
                    <div className="comment__list">
                        <div className="comment">
                            <div className="comment__header">
                                <h1>Title</h1>
                                <SvgSrc.Delete fill="#777" />
                            </div>
                            <p>loremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremlorem</p>
                        </div>

                        <div className="comment">
                            <div className="comment__header">
                                <h1>Title</h1>
                                <SvgSrc.Delete fill="#777" />
                            </div>
                            <p>loremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremlorem</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Comment
