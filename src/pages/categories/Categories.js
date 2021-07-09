import React, { Component } from 'react'
import { withRouter } from "react-router";
import Pagination from 'react-bootstrap/Pagination'
import {fetchData} from '../../api/api'
import {Product} from './../../component'
import styles from './categories.module.css'
 class Categories extends Component {
     constructor(props){
         super(props);
         this.state={
            group: this.props.location.state.group,
            itemList : [],
            currentPage : 1
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
     handleNextPage = async () =>{
        const db = await fetchData(`products?group=${this.state.group}&_page=${this.state.currentPage+1}&_limit=6&_sort=id&_order=desc`);
        if(db.length >= 1) {
            const itemList = db.map(e =>{
                return {
                     name :e.name,
                     price : e.price,
                     image: e.image,
                     id : e.id
                 }
            })
            this.setState({itemList : itemList , currentPage : this.state.currentPage + 1 })
        }
    }
    handlePrevPage = async () => {
        if(this.state.currentPage==1) return 0 
        const db = await fetchData(`products?group=${this.state.group}&_page=${this.state.currentPage-1}&_limit=6&_sort=id&_order=desc`);
            const itemList = db.map(e =>{
                return {
                     name :e.name,
                     price : e.price,
                     image: e.image,
                     id : e.id
                 }
            })
            this.setState({itemList : itemList , currentPage : this.state.currentPage - 1 })
        
    }
    handleClickList (gp){
            this.props.history.push(`/${gp}`,{
                 group : gp
            })
            window.location.reload();
    }
    handleCickProduct(id){
        this.props.history.push(`/product/${id}`,{
            id : id
       })
    }
    async componentDidMount() {
        const db = await fetchData(`products?group=${this.state.group}&_page=1&_limit=6&_sort=id&_order=desc`);
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
    
    render() {
        
        return (
            <div dir="ltr" className={styles.mainContainer}>
                <div dir="ltr" className={styles.sideContainer}>
                    <div className={styles.linkContainer} dir="rtl">
                    <div onClick={()=>{this.handleClickList('groceries')}} className={`${styles.link}`}>کالاهای خوار و بار  </div>
                    <div style={{marginRight:"40px",marginTop : "5px"}}>
                        <div>نان</div>
                        <div>برنج</div>
                        <div>روغن</div>
                        <div>قند ونبات</div>
                    </div>
                    </div>
                    <div className={styles.linkContainer} dir="rtl">
                    <div onClick={()=>{this.handleClickList('dairy')}}className={`${styles.link}`}>لبنیات</div>
                        <div style={{marginRight:"40px",marginTop : "5px"}}>
                        <div>شیر</div>
                        <div>کره حیوانی و گیاهی</div>
                        <div>دوغ</div>
                        <div>ماست</div>
                    </div>
                    </div>
                    <div className={styles.linkContainer} dir="rtl">
                    <div onClick={()=>{this.handleClickList('protein-foods')}}className={`${styles.link}`}>محصولات پروتئینی</div>
                    <div style={{marginRight:"40px",marginTop : "5px"}}>
                        <div>گوشتگاو و گوساله</div>
                        <div>گوشت مرغ</div>
                        <div>تخم مرغ</div>
                        <div>ماهی میگو خاویار</div>
                    </div>
                    </div>
                    <div className={styles.linkContainer} dir="rtl">
                    <div onClick={()=>{this.handleClickList('beverages')}}className={`${styles.link}`}>نوشیدنی</div>
                    <div style={{marginRight:"40px",marginTop : "5px"}}>
                        <div>قهوه</div>
                        <div>هات چاکلت</div>
                        <div>چای</div>
                        <div>شربت و آبمیوه</div>
                    </div>
                    </div>
                </div>
                <div className={styles.section} dir="ltr">
                    <div className={styles.productContainer} dir="ltr">
                        {this.handleRender()}
                    </div>
                    <Pagination dir="ltr" style={{marginRight : "60px"}} >
                        <Pagination.Prev onClick={this.handleNextPage} dir="ltr"/>
                        <Pagination.Item active dir="ltr">{this.state.currentPage}</Pagination.Item>
                        <Pagination.Next onClick={this.handlePrevPage} dir="ltr"/>
                    </Pagination>
                </div>
            </div>
            
        )
    }
}
export default withRouter(Categories);

