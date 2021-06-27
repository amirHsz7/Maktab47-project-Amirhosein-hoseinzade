import  { Component } from 'react';
import Button from 'react-bootstrap/Button'
import styles from './prices.module.css'
import Table from 'react-bootstrap/Table'
import {fetchData} from '../../api/api'
import Pagination from 'react-bootstrap/Pagination'

class PanelPrices extends Component {
    constructor(props){
        super(props)
        this.state = {
            itemList : [],
            paginationBasic : null,
            pages : 1,
            currentPage: 1,
        }
    }
    handleTextBox(){
        console.log('handled textbox')
    }
    handleRender(){
        const renderElement = []
        this.state.itemList.forEach(e =>{
            renderElement.push(
                    <tr>
                        <td><p>{e.name}</p></td>
                        <td onClick={()=> this.handleTextBox()}><p>{e.price}</p></td>
                        <td onClick={()=> this.handleTextBox()}><p>{e.inventory}</p></td>
                    </tr>
            )
        })
        return renderElement;
    }
    paginationBasic (){
        const items = [];
        
        for (let number = 1; number <= this.state.currentPage + 1; number++) {
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
    async handlePage(num){
        
        const db = await fetchData(`products?_page=${num}&_limit=5`);
        const itemList = []
        db.forEach(e =>{
             itemList.push( {
                    name :e.name,
                    price : e.price,
                    inventory : e.inventory
                })
        })
        if(db.length == 5) { 
            if(num > this.state.currentPage) this.state.currentPage  = this.state.currentPage+1
            
         }
        
        this.setState({itemList : itemList })
     }
    async componentDidMount() {
            
        const db = await fetchData(`products?_page=${1}&_limit=5`);
        const itemList = []
        db.forEach(e =>{
               return itemList.push( {
                    name :e.name,
                    price : e.price,
                    inventory: e.inventory,
                })
        })

        this.setState({itemList : itemList })

    
}
    render() {
        return (
            <div>
                <div className={styles.topContainer}>
                    <h1 className={'fontSize'}>مدیریت موجودی و قیمت ها</h1>
                    <Button variant="primary">افزودن کالا</Button>
                </div>
                <div className={styles.table}>
                    <Table striped bordered hover size="sm" >
                      <thead>
                        <tr>
                          <th>کالا</th>
                          <th>قیمت</th>
                          <th>موجودی</th>
                        </tr>
                      </thead>
                      <tbody id="tbody">
                        {this.handleRender()}
                      </tbody>
                    </Table>
                    {this.paginationBasic()}
                </div>
            </div>
        )
    }
}

export  {PanelPrices}
