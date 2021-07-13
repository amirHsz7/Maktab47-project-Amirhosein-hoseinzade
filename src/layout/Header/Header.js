import React, { Component } from 'react'
import image1 from '../../asset/images/logomain.jpg';
import Image from 'react-bootstrap/Image'
import styles from './header.module.css'
import { Link } from "react-router-dom";
import {withRouter} from "react-router-dom"
import {BASE_URL_SITE} from '../../configs/variables.config'
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
                <Image src={image1} height='64' width='64'  />
                </Link>
                <h1 className={styles.h1}>فروشگاه فلان</h1>
                </div>
                <div className={styles.part}>
                <div ><a href={'/'} className={styles.font}><Link to="/admin-panel" className={`alink-blue`}>مدیریت</Link></a></div>
                    <div className={styles.part2}><a href={'/'} onclick={this.handleLocal()} className={styles.font}><Link  to="/cart"  className={`alink-blue`}>سبد خرید</Link></a>
                        <div className={styles.notice}>
                            <div id="ppp" className={styles.orders}>{this.handleNotice()}</div>
                            <img className={styles.img} onclick={this.handleClick} src="https://img.icons8.com/material-two-tone/24/000000/add-basket.png"/>
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