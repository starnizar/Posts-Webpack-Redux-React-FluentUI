import React, {useState, useMemo} from 'react'
import {connect} from "react-redux";
import {DetailsList, SelectionMode, buildColumns, MarqueeSelection, Selection, PrimaryButton, Stack} from '@fluentui/react'
import {initializeIcons} from '@fluentui/font-icons-mdl2'
import {toggleDialog, deletePosts} from "../redux/actions";
import DeleteDialog from './Dialog'
import Loader from "./Loader";

const Posts = (props) => {
    initializeIcons()

    if (props.loader) {
        return <Loader />
    }

    const styles = {
        container: {
            root: {
                width: '100%',
                padding: '20px 0'
            }
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

    const [selectedItems, setSelectedItems] = useState([])

    const selection = useMemo(
        () =>
            new Selection({
                onSelectionChanged(){
                    setSelectedItems(selection.getSelection())

                },
                selectionMode: SelectionMode.multiple,
            }),
        []);

    const _buildColumns = () => {
        const headers = ['User ID', 'ID', 'Title', 'Content']
        const columns = buildColumns(props.posts)
        columns.map((column, index) => {
            if (index === 0 || index === 1) {
                column.minWidth = 50
                column.maxWidth = 60
            }
            column.name = headers[index]
            column.isResizable=true
            column.isMultiline=true
        })
        return columns;
    }

    const removeSelectedPosts = () => {
        props.deletePosts(selectedItems)
        selection.setAllSelected(false)
    }

    return (
        <Stack styles={styles.container}>
            <DeleteDialog remove={removeSelectedPosts}/>
            <Stack.Item align={'end'}>
                <PrimaryButton
                    text={
                        selectedItems.length <= 1
                            ? 'Delete selected post'
                            : `Delete selected posts (${selectedItems.length})`
                    }
                    disabled={!selectedItems.length}
                    onClick={()=>props.toggleDialog()}
                    styles={styles.buttonStyles}
                />
            </Stack.Item>
            <Stack.Item>
                <MarqueeSelection selection={selection}>
                    <DetailsList
                        items={props.posts}
                        setKey={'set'}
                        selectionMode={SelectionMode.multiple}
                        columns={_buildColumns()}
                        selection={selection}
                        selectionPreservedOnEmptyClick={true}
                    />
                </MarqueeSelection>
            </Stack.Item>
        </Stack>
    )
}

const mapStateToProps = state => {
    return {
        loader: state.app.loader
    }
}

const mapDispatchToProps = {
    toggleDialog, deletePosts
}

export default connect(mapStateToProps, mapDispatchToProps)(Posts)