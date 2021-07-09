import { faHandPointLeft } from '@fortawesome/free-solid-svg-icons'
import React, { Component } from 'react'

class CodeProduct extends Component {
    render() {
        return (
            <div>
                {this.props.children.toString()}
            </div>
        )
    }
}

export default CodeProduct
