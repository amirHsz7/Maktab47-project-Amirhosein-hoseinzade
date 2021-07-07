import React, { Component } from 'react'
import Button from 'react-bootstrap/Button'
import styles from './panelproduct.module.css'
import Table from 'react-bootstrap/Table'
import {fetchData} from '../../api/api'
import Image from 'react-bootstrap/Image'
import Pagination from 'react-bootstrap/Pagination'
import {AddProduct,Editproduct,DeleteProduct} from './ModalProduct/ModalProduct'
class PanelProducts extends Component {
    constructor(props){
            super(props)
            this.state = {
                itemList : [],
                paginationBasic : null,
                pages : 1,
                currentPage: 1,
                emptyArrey:[],
                totalPages:2
            }
        }
    handleRender(){
        const renderElement = []
        this.state.itemList.forEach(e =>{
            renderElement.push(
                    <tr>
                        <td><p><Image src={`http://localhost:3000${e.image}`} height='40' width='40' rounded /></p></td>
                        <td><p>{e.name}</p></td>
                        <td><p>{e.category} - {e.group}</p></td>
                        <td><div><DeleteProduct id={e.id} /><Editproduct id={e.id} name={e.name} gp={e.group} /></div></td>
                    </tr>
            )
        })
        console.log(renderElement)
        return renderElement;
    }
    async handlePage(num){
        
       const db = await fetchData(`products?category=products&_page=${num}&_limit=5`);
       
       
       const itemList = []
       db.forEach(e =>{
            itemList.push( {
                   name :e.name,
                   price : e.price,
                   image: e.image,
                   category : e.category,
                   group : e.group,
                   id : e.id
               })
       })
       if(db.length == 5) { 
           if(num > this.state.currentPage) this.state.currentPage  = this.state.currentPage+1
           
        }
       
       this.setState({itemList : itemList })
    }
        async componentDidMount() {
        
            const totalpages = await fetchData(`products?isPages=true`);
            this.setState({totalPages : totalpages[0]["totalpage"]})
            const db = await fetchData(`products?category=products&_page=${1}&_limit=5`);
            console.log('db :',db)
            const itemList = []
            db.forEach(e =>{
                   return itemList.push( {
                        name :e.name,
                        price : e.price,
                        image: e.image,
                        category : e.category,
                        group : e.group,
                        id : e.id
                    })
            })

            this.setState({itemList : itemList })

        
    }
    paginationBasic (){

        const items = [];
        
        for (let number = 1; number <= this.state.totalPages ; number++) {
          items.push(
            <Pagination.Item key={number} onClick={()=> this.handlePage(number)} className={styles.btnpage}>
              {number}
            </Pagination.Item>,
          );
        }
        
        return (
           <div className={styles.pagination}> <Pagination>{items}</Pagination></div>
        )
    }
      
    render() {
        
        console.log('item list' , this.state.itemList)
        return (
            <div>
                <div className={styles.container}>
                    <h1 className={'fontSize'}>مدیریت کالا</h1>
                    <AddProduct />
                </div>
                <div className={styles.table}>
                    <Table striped bordered hover size="sm" >
                      <thead>
                        <tr>
                          <th>تصویر</th>
                          <th>نام کالا</th>
                          <th>دسته بندی</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody id="tbody">
                        {this.handleRender()}
                      </tbody>
                    </Table>
                </div>
                    {this.paginationBasic()}
            </div>
        )
    }
}

export  {PanelProducts}
