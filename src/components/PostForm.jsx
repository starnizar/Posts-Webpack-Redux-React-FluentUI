import React, {useState} from 'react'
import {connect} from 'react-redux'
import {TextField, PrimaryButton, DefaultButton, Stack, Modal} from '@fluentui/react'
import {toggleModal} from "../redux/actions";

const PostForm = (props) => {
    const [state, setState] = useState({
        userId: 101,
        id: 'null',
        title:'',
        body:''
    })

    const styles = {
        container: {
            root: {
                width: '90vw',
                maxWidth: '1000px',
                padding: '20px'
            }
        }
    }

    const textFieldHandler = event => {
        setState(prevState => ({...prevState, ...{
            [event.target.name]: event.target.value
        }}))
    }

    const createPost = event => {
        event.preventDefault()
        const {title, body} = state
        if (!title.trim()) {
            return
        }
        if (!body.trim() || body.trim().length < 15) {
            return
        }
        const newPost = {...state, id: Date.now().toString()}
        props.addPost(newPost)
        setState({...state, title: '', body: ''})
        props.toggleModal()
    }


    return (
        <Modal isOpen={props.isModal} onDismiss={() => props.toggleModal()}>
            <Stack styles={styles.container}>
                <Stack.Item align={'center'} style={{width:'70%'}}>
                    <form onSubmit={createPost} >
                        <TextField  name={'title'} value={state.title} onChange={textFieldHandler} label={'Post title'}/>
                        <TextField  placeholder={'Minimum 15 characters'} name={'body'} value={state.body} onChange={textFieldHandler} label={'Post content'} multiline autoAdjustHeight resizable={false}/>
                        <PrimaryButton type={'submit'} text={'Create post'} style={{margin: '20px 20px 0 0'}}/>
                        <DefaultButton text={'Cancel'} onClick={() => props.toggleModal()} style={{marginTop: '20px'}}/>
                    </form>
                </Stack.Item>
            </Stack>
        </Modal>
    )
}

const mapStateToProps = state => {
    return {
        isModal: state.app.modal
    }
}

const mapDispatchToProps = {
    toggleModal
}

export default connect(mapStateToProps, mapDispatchToProps)(PostForm)