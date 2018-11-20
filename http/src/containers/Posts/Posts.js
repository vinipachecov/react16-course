import React, { Component } from 'react'
import axios from '../../axios';
import Post from '../../components/Post/Post';
import { Route } from 'react-router-dom';
import FullPost from '../FullPost/FullPost'
import './Posts.css'

class Posts extends Component {
  state = {
    posts: [],
  }

  async componentDidMount() {
    console.log(this.props);        
    try {
        const response = await axios.get('/posts');                        
        const posts = response.data.slice(0,4);
        const updatedPosts = posts.map(post => {
            return {
                ...post,
                author: 'Max'
            }
        });
        this.setState({ posts: updatedPosts });            
    } catch (error) {
        console.log(error);              
    }                
}

  postSelectedHandler = (id) => {
    // using push to navigate programmatically
    const { push } = this.props.history;
    push({ pathname: '/posts/' + id});

    // console.log('selected id = ', id);
    // this.setState({ selectedPostId: id });
}


  render() {
    let posts = <p style={{ textAlign: 'center' }}>Somenthing went wrong!</p>
    if (!this.state.error) {
        posts = this.state.posts.map(post => {
            // return my jsx elem
            return (              
                <Post                             
                key={post.id} 
                title={post.title} 
                author={post.author}
                clicked={() => this.postSelectedHandler(post.id)}
                />            
            )
        });                   
    }

    return (
        <div>
            <section className="Posts">
                {posts}
            </section>
            <Route 
                path={this.props.match.url + '/:id'} 
                exact 
                component={FullPost} 
            />
        </div>      
    )
  }
}

export default Posts;