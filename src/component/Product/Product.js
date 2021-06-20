import React, { Component } from 'react'
import Image from 'react-bootstrap/Image'
import styles from './product.module.css'
export class Product extends Component {
    render() {
        return (
            <div className={styles.container}>
               <Image src={this.props.img} height='90' width='90' rounded />
                <div className={styles.innercontainer}>
                   <div className={styles.name}>{this.props.name}</div>
                   <div className={styles.price}>{this.props.price} تومان</div>
                </div>
            </div>
        )
    }
}


