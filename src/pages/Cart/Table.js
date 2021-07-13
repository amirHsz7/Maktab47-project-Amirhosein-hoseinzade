import React, { Component } from 'react'

class Table extends Component {
    render() {
        
        let {product,name  } = this.props
        console.log('props',this.props)
        return (
            <div>
                <ul>
                    <li>
                        {name}
                    </li>
                </ul>
            </div>
        )
    }
}

export default Table
