import React from 'react'
import {connect} from 'react-redux'
import {Stack, DefaultButton, PrimaryButton} from '@fluentui/react'
import {initializeIcons} from '@fluentui/font-icons-mdl2'
import {fetchPosts, addPost, toggleModal} from './redux/actions'
import PostForm from './components/PostForm'
import Posts from './components/Posts'


const App = (props) => {
    initializeIcons()
    const styles = {
        app: {
            root: {
                maxWidth:'1000px',
                margin:'0 auto',
                padding: '20px 0'
            }
        }
    }

    return (
        <Stack className={'app'} styles={styles.app}>
            <Stack horizontal horizontalAlign={'space-between'}>
                <DefaultButton onClick={() => props.toggleModal()} text={'New post'} iconProps={{iconName:'Add'}}/>
                <PrimaryButton text={'Load Posts'} onClick={() => props.fetchPosts()}/>
            </Stack>
            <PostForm addPost={props.addPost}/>
            {props.posts.length
                ? <Posts posts={props.posts}/>
                : <Stack.Item style={{position: 'absolute', top: '45%', right: '45%'}}>
                    <h3>No posts yet...</h3>
                </Stack.Item>
            }
        </Stack>
    )
}

const mapDispatchToProps = {
    fetchPosts, addPost, toggleModal
}

const mapStateToProps = state => {
    return {
        posts: state.posts.posts
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)