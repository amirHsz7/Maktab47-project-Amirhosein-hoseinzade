import React, { Component } from 'react'
import { withRouter } from "react-router";
import {fetchData} from '../../api/api'
import styles from './product.module.css'
import Image from 'react-bootstrap/Image'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import {addToCart} from  '../../redux/actions/index'
import { connect } from "react-redux";

class ProductPage extends Component {
    constructor(props){
        super(props);
        this.state={
            id : this.props.location.state.id,
            itemList : null,
            product : {
                id : null,
                name : null,
                image : null,
                category:null,
                group:null,
                price:null,
                inventory:null
                
            },
            details : null,
            flag : false,
            flag2: false
        }
    }
    async componentDidMount(){
        const db = await fetchData(`products/${this.state.id}`);
        this.setState({product:{id:db.id,name:db.name,image:db.image,category:db.category,group:db.group,price:db.price,inventory:db.inventory}})
        console.log(this.state.product.image)
        
        if(!this.state.product.price) {
            document.getElementById('pp').textContent = "نامشخص"
        }
        if(!this.state.product.inventory) this.setState({flag : true})
        if(parseInt(localStorage.getItem('CounterOrders'))==0) document.getElementById('ppp').innerHTML=''
        else document.getElementById('ppp').innerHTML=parseInt(localStorage.getItem('CounterOrders'))
    }
    handleSelect (){
        const renderElement = []
        for(let e =0;e<=this.state.product.inventory;e++){
            renderElement.push(<option>{e}</option>)
        }
        return renderElement
    }
    render() {
        const { products , addToCart } = this.props;
        const product = this.state.product
        
        return (
            <div className={styles.main}>
                <div id="main"  className={styles.productContainer}>
                    <div className={styles.imageContainer}>
                    <Image className={styles.image} height="300px" height="300px" src={`http://localhost:3000${product.image}`} rounded />
                    </div>
                    <div className={styles.productDetails} dir="rtl" >
                        <div>
                            <div><p style={{fontSize:'24px'}}>{product.name}</p></div>
                            <div><p>{product.category}-{product.group}</p></div>
                        </div>
                        <div style={{display:"flex" ,flexDirection:"column" ,alignItems:"flex-start"}}>
                            <div><p id="pp">{product.price} تومان</p></div>
                            <div className={styles.formContainer}>
                                <Button className={styles.btn} variant="success" onClick={()=>{if(this.state.flag2==false){localStorage.setItem('CounterOrders' ,parseInt(localStorage.getItem('CounterOrders'))+1);this.state.flag2=true};addToCart(this.state.product.id,{id :product.id ,name : product.name,inventory : document.getElementById('formSelect').value,price : product.price,image : product.image})}}>اضافه به سبد خرید</Button>
                                <div className={styles.select}>
                                    <Form.Control  as="select" disabled={this.state.flag} id="formSelect">
                                        {this.handleSelect()}
                                    </Form.Control>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.text}>
                
                <div className={styles.pre}>
                    <code className={styles.code}>
                     {document.getElementById('root').innerHTML}
                     </code>
                    
                </div>
                </div>
            </div>

        )
    }
}
const mapDispatchToProps = dispatch => ({
    addToCart : (productId,details) =>{ dispatch(addToCart(productId,details))
        // localStorage.setItem('CounterOrders' ,parseInt(localStorage.getItem('CounterOrders'))+1)
    if(parseInt(localStorage.getItem('CounterOrders'))==0) {
        document.getElementById('ppp').innerHTML=''
        document.getElementById('ppp').style.background="none"
    }
    else {
        document.getElementById('ppp').innerHTML=parseInt(localStorage.getItem('CounterOrders'))
        document.getElementById('ppp').style.background="rgb(187, 64, 64)"
    }
    }
    
})

export default withRouter(connect(null , mapDispatchToProps)(ProductPage))
