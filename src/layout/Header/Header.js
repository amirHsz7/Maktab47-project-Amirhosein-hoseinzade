import React, { Component } from 'react'
import image1 from '../../asset/images/company-logo-transparent-png-19.png';
import Image from 'react-bootstrap/Image'
import styles from './header.module.css'
import { Link } from "react-router-dom";
import {withRouter} from "react-router-dom"
import { connect } from "react-redux";
class Header extends Component {
    
    handleLocal(){
        localStorage.setItem('flag2',false)
    }
    handleNotice(){
        if(localStorage.getItem('itemList')){
            var list = localStorage.getItem('itemList')
            list = JSON.parse(list)
            return list.length
        }
        
    }
    componentDidMount(){
        if(!localStorage.getItem('itemList')){localStorage.setItem('itemList',"[]")}
        var temp = JSON.parse(localStorage.getItem('itemList'))
        if( temp.length ==0  ) localStorage.setItem('CounterOrders',0)
        if(parseInt(localStorage.getItem('CounterOrders'))==0) {
            document.getElementById('ppp').innerHTML=''
            document.getElementById('ppp').style.background="none"
        }
        else {
            document.getElementById('ppp').innerHTML=parseInt(localStorage.getItem('CounterOrders'))
            document.getElementById('ppp').style.background="rgb(187, 64, 64)"
        }
    }
    render() {
        
        let { product} = this.props
        return (
            <div className={styles.header}>
                <div className={styles.part}>
                <Link to="/home">
                <Image src={image1} height='64' width='80'  />
                </Link>
                <h1 className={styles.h1}>MARKET</h1>
                </div>
                <div className={styles.part}>
                <div ><a href={'/'} className={styles.font}><Link to="/admin-panel" className={styles.font} >مدیریت</Link></a></div>
                    <div className={styles.part2}><div  onClick={this.handleLocal()} ><Link className={styles.font} to="/cart" >سبد خرید</Link></div>
                        <div className={styles.notice}>
                            <div id="ppp" className={styles.orders}>{this.handleNotice()}</div>
                            <img className={styles.img} src="https://img.icons8.com/material-two-tone/24/000000/add-basket.png"/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
const getCartProducts = (product) => {
    return product = product
}
const mapStateToProps = state => ({
    product : getCartProducts(state.product)
})
export default connect(mapStateToProps ,null)(withRouter(Header))