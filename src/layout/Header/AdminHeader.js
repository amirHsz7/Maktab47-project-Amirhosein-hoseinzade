import React, { Component } from 'react'
import { Link } from "react-router-dom";
import styles from './admin-header.module.scss'
// import '../../asset/styles/global.css';
const edit = {
    color: 'color: rgb(71, 130, 218);'
}

class AdminHeader extends Component {
    constructor(props){
        super(props)
        this.state={
            focused : ''
        }
    }
     handleColor(focused){
        this.setState({focused : 1})  
     }
    render() {
        return (
            <div className={styles.header}>
               <h1 className={styles.h1}>پنل مدیریت فروشگاه</h1>
               <div className={styles.part}>
                   <div className={`${styles.part2} .${this.state.focused}`}><a href={'/'} onClick={()=>{this.handleColor(this.state.focused)}} ><Link to='/admin-panel-products' className={`alink-black`}>کالاها</Link></a></div>
                   <div className={`${styles.part2} .${this.state.focused}`}><a href={'/'} onClick={()=>{this.handleColor(this.state.focused)}}><Link to='/admin-panel-prices' className={`alink-black`}>موجودی و قیمت ها</Link></a></div>
                   <div className={`${styles.part2} .${this.state.focused}`}><a href={'/'} onClick={()=>{this.handleColor(this.state.focused)}}><Link to='/admin-panel-orders' className={`alink-black`}>سفارش ها</Link></a></div>
               </div>
               <div className={styles.wrapper}><Link to='/home' className={styles.offset}>بازگشت به سایت</Link></div>
            </div>
        )
    }
}

export {AdminHeader}