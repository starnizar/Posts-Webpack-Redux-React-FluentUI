import React, {useState} from 'react'
import {connect} from 'react-redux'
import {TextField} from '@fluentui/react/lib/TextField'
import {Modal, Stack, Callout, Text} from '@fluentui/react'
import {PrimaryButton, DefaultButton} from '@fluentui/react/lib/Button'
import {toggleModal, showCallout, hideCallout} from "../redux/actions";

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
        },
        callout: {
            root: {
                padding: '10px 15px',
                borderRadius: '5px',
                border: '2px solid red'
            }
        },
        calloutText: {
            root: {
                color: 'red',
                fontWeight: 600
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
            props.showCallout('Empty title field')
            return
        }
        if (!body.trim() || body.trim().length < 15) {
            props.showCallout('Content should have at least 15 characters')
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
                        <PrimaryButton id={'postForm'} type={'submit'} text={'Create post'} style={{margin: '20px 20px 0 0'}}/>
                        {props.isCallout && <Callout
                            role={'alertdialog'}
                            target={'#postForm'}
                            ariaDescribedBy={'calloutText'}
                            onDismiss={props.hideCallout}
                            styles={styles.callout}
                        >
                            <Text id={'calloutText'} styles={styles.calloutText}>{props.message}</Text>
                        </Callout>}
                        <DefaultButton text={'Cancel'} onClick={() => props.toggleModal()} style={{marginTop: '20px'}}/>
                    </form>
                </Stack.Item>
            </Stack>
        </Modal>
    )
}

const mapStateToProps = state => {
    return {
        isModal: state.app.modal,
        isCallout: state.app.callout,
        message: state.app.message
    }
}

const mapDispatchToProps = {
    toggleModal, showCallout, hideCallout
}

export default connect(mapStateToProps, mapDispatchToProps)(PostForm)