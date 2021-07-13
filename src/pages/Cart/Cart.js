import React, { Component } from 'react'
import { connect } from "react-redux";
import Table from 'react-bootstrap/Table'
import Image from 'react-bootstrap/Image'
import { cancelAction } from '../../redux/actions';
import styles from './cart.module.css'
import Button from 'react-bootstrap/Button'
import { withRouter } from "react-router";
class Cart extends Component {
   constructor(props){
       super(props)
       this.state= {
           flag : false,
           data: null,
           flag2 : false,
           ids : [],
           totalAmount : 0,
           details :[]
       }
   }
   handleChangeBut (e){
    if(!this.state.ids.includes(e) ){
        this.state.ids.push(e)
    }
    let length = document.getElementsByClassName('input').length
     for(let i =0 ; i<length;i++){
        if(document.getElementsByClassName(`inputinventory`)[i].value != '') document.getElementsByClassName(`inputinventory`)[i].nextElementSibling.classList.add('WHITE_COLOR') 
         
     }
    

}
   handleDelete (id){
    var total = 0
        document.getElementById(`${id}`).remove()
    var list = localStorage.getItem('itemList');
        list = JSON.parse(list)
    var list2 = []
        list.forEach(e=>{
            if(e.id != id) {list2.push(e) 
             total = e.price * e.inventory + total
            }
        })
        
        localStorage.setItem('itemList',JSON.stringify(list2));
        localStorage.setItem('CounterOrders' ,parseInt(localStorage.getItem('CounterOrders'))-1)
        document.getElementById('pp').innerHTML = `جمع : ‍‍${total} تومان`
        if(parseInt(localStorage.getItem('CounterOrders'))==0){
             document.getElementById('ppp').innerHTML= ""
             document.getElementById('ppp').style.background="none"
        }
        else document.getElementById('ppp').innerHTML = parseInt(localStorage.getItem('CounterOrders'))
    
    }
    
    handleRender(){
        const renderElement = []
        var list = localStorage.getItem('itemList');
        list = JSON.parse(list)
        list.forEach(obj=>{
            renderElement.push(
            <tr id={obj.id} className={`tr`}>
                <td><Image className={styles.image} src={`http://localhost:3000${obj.image}`} alt="" width="40" height="40" rounded /></td>
                <td>{obj.name}</td>
                <td><p>{obj.price}</p></td>
                <td><input id={`${obj.id}-1`} className={`inputinventory input ${styles.input}`} type="text"  onChange={()=>{this.handleChangeBut(obj.id)}} /><p>{obj.inventory}</p></td>
                <td onClick={()=>{this.handleDelete(obj.id)}}><div><a className={`alink-blue`} >حذف</a></div></td>
            </tr>)
             
        })
        return renderElement
    }

    componentDidMount(){
        const {product,name,cancel} = this.props
        cancel()
        var  total = 0
        Array.from(document.getElementsByClassName('tr')).forEach(e => {
           total = e.children[3].children[1].innerHTML * e.children[2].children[0].innerHTML + total
        })
        this.setState({totalAmount : total})
    }
    handleOrder = () => {
        const details = []
        Array.from(document.getElementsByClassName('tr')).forEach(e=>{
            let temp = {
                name : '',
                price : '',
                inventory : ''
            }
           temp.name = e.children[1].innerHTML
           temp.price = e.children[2].children[0].innerHTML
           if(e.children[3].children[0].value) temp.inventory = e.children[3].children[0].value
           else temp.inventory = e.children[3].children[1].innerHTML
           details.push(temp)
        })

        this.props.history.push(`/shipping`,{
            details : details
       })
    }
    render() {
        
        if(!localStorage.getItem('flag')) {
            localStorage.setItem('itemList',  '[]')
            localStorage.setItem('flag',true)   
        }
        const {product,name,cancel} = this.props
        var itemList = localStorage.getItem('itemList');
       
        itemList = JSON.parse(itemList)
        const itemListTotal = itemList
        
        Object.keys(this.props.product).forEach(key => {
           itemList.push(product[key].details) 
          });
          
            localStorage.setItem('itemList',  JSON.stringify(itemList)) 
            
        return (
            <div className={styles.main}>
                <div className={styles.Container}>
                    <div >
                        <Table className={styles.table} striped bordered hover size="sm" dir={'rtl'}>
                            <thead>
                                <tr>
                                <th>تصویر</th>
                                <th>کالا</th>
                                <th>قیمت</th>
                                <th>مقدار</th>
                                <th></th>
                                </tr>
                            </thead>
                            <tbody >
                            {this.handleRender()}
                            </tbody>
                        </Table>
                    </div>
                    <div className={styles.footer}>
                        <div><p id="pp" style={{fontSize:"25px"}}>{`جمع : ‍‍${this.state.totalAmount} تومان`}</p></div>
                        <div><Button variant="success" onClick={this.handleOrder}>تکمیل پرداخت</Button></div>
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
    product : getCartProducts(state.product),
})
const mapDispatchToProps = dispatch => ({
    cancel : () => dispatch(cancelAction()),
    
})

export default withRouter(connect(mapStateToProps , mapDispatchToProps)(Cart))
