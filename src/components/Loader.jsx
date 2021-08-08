import React from 'react'
import {Spinner, SpinnerSize} from '@fluentui/react/lib/Spinner'

const loaderStyles = {

}

const Loader = () => {
    return (
        <Spinner
            style={{position: 'absolute', top: '50%', right: '50%'}}
            size={SpinnerSize.large}
            className={loaderStyles}
        />
    )
}

export default Loader