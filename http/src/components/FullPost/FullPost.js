import React, { Component } from 'react';

import './FullPost.css';
import axios from 'axios';

class FullPost extends Component {

    state = { 
        loadedPost: null
    }

    async componentDidUpdate() {            
        if (this.props.id) {
            if (!this.state.loadedPost || (this.state.loadedPost && this.state.loadedPost.id !== this.props.id))   {
                const response = await axios.get('/posts/' + this.props.id);
                console.log(response);
                this.setState({ loadedPost: response.data })
            }            
        }
    }
    deletePostHandler = async () => {
        const response = await axios.delete('/posts/'+ this.props.id);
        console.log(response);
    }

    render () {
        const { loadedPost } = this.state;
        let post = <p style={{ textAlign: 'center' }}>Please select a Post!</p>;
        if (this.props.id) {
            post = <p style={{ textAlign: 'center' }}>Loading ...!</p>;
        }
        if (this.state.loadedPost) {
            post = (
                <div className="FullPost">
                    <h1>{loadedPost.title}</h1>
                    <p>{loadedPost.body}</p>
                    <div className="Edit">
                        <button 
                        onClick={this.deletePostHandler} 
                        className="Delete">Delete</button>
                    </div>
                </div>
            );
        }
        return post;
    }
}

export default FullPost;