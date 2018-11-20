import React, { Component } from 'react';
import { Route, NavLink, Switch, Redirect } from 'react-router-dom';
import Posts from '../Posts/Posts';
// import NewPost from '../NewPost/NewPost';
import asyncComponent from '../../hoc/asyncComponent';
import './Blog.css';

const AsyncNewPost = asyncComponent(() => {
    return import('../NewPost/NewPost')
})



class Blog extends Component {
    state = {
        posts: [],
        selectedPostId: null,
        error: false,
        auth: true 
    }
    render () {        
        return (
            <div className="Blog">
                <header>
                    <nav>
                        <ul>
                            <li>
                                <NavLink
                                    to="/posts/" 
                                    // Class for checking
                                    activeClassName="active"
                                    activeStyle={{
                                        color: "#fa923f",
                                        textDecoration: 'underline'
                                     }}
                                    exact
                                >
                                    Posts
                                </NavLink>                                
                            </li>
                            <li>
                            <NavLink
                                to={{ 
                                    pathname: "/new-post",
                                    hash: '#submit',
                                    search: '?quick-submit=true'
                                }}
                                >
                                    New Post
                                </NavLink>                                
                            </li>
                        </ul>
                    </nav>
                </header>
                {/* <Route path="/" exact render={() => } />                 */}
           
           <Switch>                
               { this.state.auth ? <Route path="/new-post" exact component={AsyncNewPost} /> : null} 
                <Route path="/posts" component={Posts}/>    
                <Route render={() => <h1> Not Found</h1>}/>
                {/* <Redirect from='/' to='/posts' />             */}
            </Switch>
                
                {/* <section>
                    <FullPost id={this.state.selectedPostId}/>
                </section>
                <section>
                    <NewPost />
                </section> */}
            </div>
        );
    }
}

export default Blog;