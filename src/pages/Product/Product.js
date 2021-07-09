import React, { Component } from 'react'
import { withRouter } from "react-router";
import {fetchData} from '../../api/api'
import styles from './product.module.css'
import Image from 'react-bootstrap/Image'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
class ProductPage extends Component {
    constructor(props){
        super(props);
        this.state={
            id : this.props.location.state.id,
            itemList : null,
            product : {
                name : null,
                image : null,
                category:null,
                group:null,
                price:null,
                inventory:null
                
            },
            details : null,
            flag : false
        }
    }
    async componentDidMount(){
        const db = await fetchData(`products/${this.state.id}`);
        this.setState({product:{name:db.name,image:db.image,category:db.category,group:db.group,price:db.price,inventory:db.inventory}})
        console.log(this.state.product.image)
        
        if(!this.state.product.price) {
            document.getElementById('pp').textContent = "نامشخص"
        }
        if(!this.state.product.inventory) this.setState({flag : true})

    }
    handleSelect (){
        const renderElement = []
        for(let e =0;e<=this.state.product.inventory;e++){
            renderElement.push(<option>{e}</option>)
        }
        return renderElement
    }
    render() {
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
                                <Button className={styles.btn} variant="success">اضافه به سبد خرید</Button>
                                <div className={styles.select}>
                                    <Form.Control  as="select" disabled={this.state.flag}>
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

export default withRouter(ProductPage)
