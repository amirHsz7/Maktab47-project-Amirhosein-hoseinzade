import React, {Component} from 'react'
import { Product } from '../../../component'
import {fetchData} from '../../../api/api'
import { withRouter } from "react-router-dom";
import styles from './GroupContainer.module.scss'

class GroupContainer extends Component {
    constructor(props){
        super(props)
        this.state = {
            itemList : []
        }
        
    }
    
    handleRender(){
        const renderElement = []
        let num = this.state.itemList.length
        this.state.itemList.forEach(e =>{
                 renderElement.push(<div onClick={()=>{this.handleCickProduct(e.id)}}><Product name={e.name} price={e.price} img={`http://localhost:3000${e.image}`}/></div>)
        })
        return renderElement
    }
    handleClick = () => {
        this.props.history.push(`/${this.props.group}`,{
             group : this.props.group
        })
    }
        async componentDidMount() {

        
        const db = await fetchData(`products?group=${this.props.group}&_limit=6`);
        
        const itemList = db.map(e =>{
               return {
                    name :e.name,
                    price : e.price,
                    image: e.image,
                    id : e.id
                }
        })
        this.setState({itemList  })
        
    }
    handleCickProduct(id){
        this.props.history.push(`/product/${id}`,{
            id : id
       })
    }
    render() {
        
        return (
            <div dir="rtl" className={styles.mainDiv}>

                <div className={styles.linkContainer}>
                <div className={`${styles.link}`} to={`/category-${this.props.group}`} onClick={this.handleClick}>{`کالاهای گروه ${this.props.group}`} </div>
                </div>
                <div className={styles.GroupContainer}>
                {this.handleRender()}
                </div>
            </div>
        )
    }
}

export default withRouter(GroupContainer);
