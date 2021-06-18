import React, { Component } from 'react'
import image1 from '../../asset/images/logomain.jpg';
import Image from 'react-bootstrap/Image'
import styles from './header.module.css'
import { Link } from "react-router-dom";
class Header extends Component {
    
    render() {
        return (
            <div className={styles.header}>
                <div className={styles.part}>
                <Image src={image1} height='64' width='64'  />
                <h1 className={styles.h1}>فروشگاه فلان</h1>
                </div>
                <div className={styles.part}>
                <div ><a href={'/'} className={styles.font}><Link to="/admin-panel" className={`alink-blue`}>مدیریت</Link></a></div>
                <div className={styles.part2}><a href={'/'} className={styles.font}><Link to="/cart" className={`alink-blue`}>سبد خرید</Link></a><img className={styles.img} src="https://img.icons8.com/material-two-tone/24/000000/add-basket.png"/></div>
                </div>
            </div>
        )
    }
}

export {Header}