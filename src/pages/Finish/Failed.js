import React, { Component } from 'react'
import Image from 'react-bootstrap/Image'
import image1 from '../../asset/images/failed.png';
import styles from './finish.module.css'
class Failed extends Component {
    render() {
        return (
            <div dir="rtl">
               <h2>نتیجه پرداخت</h2> 
               <div className={styles.container}>
                   <Image src={image1} height='300' width='350' rounded />
                <div style={{fontSize : '30px'}}>
                    پرداخت شما موفقیت آمیز نبود
                </div>
               </div>
            </div>
        )
    }
}

export {Failed}
