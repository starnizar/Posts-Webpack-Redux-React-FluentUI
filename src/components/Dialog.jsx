import React from 'react'
import {connect} from 'react-redux'
import {Dialog, DialogType, DialogFooter} from '@fluentui/react/lib/Dialog'
import {PrimaryButton, DefaultButton} from '@fluentui/react/lib/Button'
import {toggleDialog} from '../redux/actions'

const DeleteDialog = (props) => {

    const styles = {
        dialogStyles:{
            main: { maxWidth: 450 }
        },
        buttonStyles: {
            root: {
                transition: '0.15s',
                backgroundColor: '#e70000',
                border: 'none'
            },
            rootHovered: {
                backgroundColor: '#d10000',
                border: 'none',
            },
            rootPressed: {
                backgroundColor: '#c50000',
                border: 'none'
            }
        }
    }
    const dialogContentProps = {
        type: DialogType.normal,
        title: 'Confirm Deletion',
        closeButtonAriaLabel: 'Close',
        subText: 'Are You sure You want to continue?',
    };

    const deleteSelectedPosts = () => {
        props.remove()
        props.toggleDialog()
    }

    const cancelDelete = () => {
        props.toggleDialog()
        props.cancel(false)
    }

    return (
        <Dialog
            styles={styles.dialogStyles}
            hidden={props.isHidden}
            onDismiss={() => props.toggleDialog()}
            dialogContentProps={dialogContentProps}
        >
            <DialogFooter>
                <PrimaryButton text={'Delete'} onClick={deleteSelectedPosts} styles={styles.buttonStyles}/>
                <DefaultButton text={'Cancel'} onClick={() => props.toggleDialog()}/>
            </DialogFooter>
        </Dialog>
    )
}

const mapStateToProps = state => {
    return {
        isHidden: state.app.dialog
    }
}

const mapDispatchToProps = {
    toggleDialog
}

export default connect(mapStateToProps, mapDispatchToProps)(DeleteDialog)