import React from 'react'
import {
  Link,
  Redirect
} from 'react-router-dom'

import Post from '../../models/Post'
import PostForm from './PostForm'

class PostCreate extends React.Component {

  constructor(props) {
    super(props)
    this._createPost = this._createPost.bind(this)
    this.state = {}
  }

  _createPost(post) {
    Post.create(post).then(function(post_key) {

      // TODO - use promises better here
      Post.get(post_key).then(function(post) {
        this.props.history.push("/posts/"+post.slug)
      }.bind(this)).catch(function(err){
        alert("Whoops, couldn't find the new post: "+err.message)
      })

    }.bind(this)).catch(function(err){
      alert("Whoops, couldn't create the post: "+err.message)
    })
  }

  render() {

    // shouldn't pass null to controlled components in PostForm
    let emptyPost = {
      title: '',
      content: '',
    }

    return (
      <div>
        <h1>New post</h1>
        <PostForm post={emptyPost} onSubmit={this._createPost}/>
      </div>
    )
  }
}

export default PostCreate
