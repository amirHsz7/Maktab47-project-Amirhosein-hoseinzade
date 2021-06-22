import React, { Component } from 'react'
import Button from 'react-bootstrap/Button'
import styles from './panelproduct.module.css'
import Table from 'react-bootstrap/Table'
import {fetchData} from '../../api/api'
import Image from 'react-bootstrap/Image'
import Pagination from 'react-bootstrap/Pagination'


class PanelProducts extends Component {
    constructor(props){
            super(props)
            this.state = {
                itemList : [],
                paginationBasic : null,
                pages : {},
                currentPage: 1,
                emptyArrey:[]
            }
        }
          
    handleRender(){
        let counterPage = 0
        let template = 0
        let flag = 0;
        const renderElement = []
        this.state.itemList.forEach(e =>{
            if(counterPage == this.state.currentPage) return false
            renderElement.push(
                <tr>
                    <td><p><Image src={e.image} height='40' width='40' rounded /></p></td>
                    <td><p>{e.name}</p></td>
                    <td><p>{e.category} - {e.group}</p></td>
                    <td><div><a className={`alink-blue`}>ویرایش</a><a className={`alink-blue`}>حذف</a></div></td>
                </tr>
            )
                
        template++
        if(template==5) {
            counterPage++ 
            template=0
        }
        
        })
        return renderElement.slice(-5);
    }
    async componentDidMount() {
        const db = await fetchData('foodstuff');
        const allUsers =[]
        for (const [key, value] of Object.entries(db)) {
           value.forEach(e=>{
               allUsers.push(e)
           })
          }
          
        console.log('allusers' , allUsers)
        const itemList = []
        let temp = []
        let tempLastPage = []
           allUsers.forEach(e=>{
               itemList.push({
                name :e.name,
                price : e.price,
                image: e.image,
                category : e.category,
                group : e.group,
                id : e.id
               })
           }) 

        console.log('templastpage' , tempLastPage)
        // if(tempLastPage != [] && flag==0){
        //     itemList.push(tempLastPage)
        // }
        this.setState({itemList : itemList})
        
        let active = this.state.currentPage
        const items = [];
        for (let number = 1; number <= allUsers.length / 5 +1; number++) {
          items.push(
            <Pagination.Item key={number} onClick={()=> this.handlePage(number)} className={styles.btnpage}>
              {number}
            </Pagination.Item>,
          );
        }
        this.setState({paginationBasic : items})
    }
    paginationBasic (){
        return (
           <div className={styles.pagination}> <Pagination>{this.state.paginationBasic}</Pagination></div>
        )
    }
    handlePage(num){
        this.setState({currentPage: num})
        console.log('active',this.state.currentPage)
    }

    render() {
        
        console.log('item list' , this.state.itemList)
        return (
            <div>
                <div className={styles.container}>
                    <h1>مدیریت کالا</h1>
                    <Button variant="success">افزودن کالا</Button>
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
