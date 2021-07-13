import React, { Component } from 'react'
import styles from './panelorders.module.css'
import Table from 'react-bootstrap/Table'
import {fetchData} from '../../api/api'
import Pagination from 'react-bootstrap/Pagination'
import {ShowOrder} from './OrderModal.js/OrderModal'
class PanelOrders extends Component {
    constructor(props){
        super(props)
        this.state = {
            check : false,
            flag :  0,
            pagination: [],
            totalPage : null,
            itemList : [],
            pages : null
        }
        
    }

    handleRender(){
        const renderElement = []
        this.state.itemList.forEach(e =>{
            let totalMoney = 0
            e.details.forEach(n=>{
                totalMoney = n.price * n.inventory + totalMoney
            })
            renderElement.push(
                    <tr>
                        <td><p>{e.name}</p></td>
                        <td><p>{totalMoney}</p></td>
                        <td><p>{e.time}</p></td>
                        <td><div><ShowOrder isDelivered={e.isDelivered} id={e.id} name={e.name} adress={e.adress} tel={e.tel} time={e.time} details={e.details} /></div></td>
                    </tr>
            )
        })
        
        return renderElement;
    }
    async handlePage(num,bol){
        const db = await fetchData(`orders?isDelivered=${bol}&_page=${num}&_limit=5`);
        const itemList = []
        db.forEach(async e =>{
           
           await  itemList.push( {
                name : e.name,
                totalMoney : e["total-amount"],
                time : e["registration-time"],
                adress : e.adress,
                tel : e.tel,
                id : e.id,
                isDelivered : e.isDelivered,
                details :  JSON.parse(e.details)
                })
        })
        this.setState({itemList : itemList })
        
     }
      paginationBasic (){
        
        const items = [];
        for (let number = 1; number <= this.state.pages; number++) {
          items.push(
            <Pagination.Item key={number} onClick={()=> this.handlePage(number,this.state.check)} className={styles.btnpage}>
              {number}
            </Pagination.Item>,
          );
        }
        return (
           <div className={styles.pagination}> <Pagination>{items}</Pagination></div>
        )
    }
    async tellPage1(){
        
        const db = await fetchData(`orders?isPages=true`);   
        this.setState({check:true,pages :db[0]["totalpage-delivered"]})
        console.log('true pages',this.state.pages)
        this.handlePage(1,true)
        this.handleRender()

    }
    async tellPage2(){
        
        const db = await fetchData(`orders?isPages=true`);   
        this.setState({check:false,pages :db[0]["totalpage-notdelivered"]})
        console.log('false pages',this.state.pages)
        this.handlePage(1,false)
        this.handleRender()
    }
    componentDidMount(){
        if(this.state.check == false){
            this.tellPage2()
            this.handlePage(1,false)
            this.handleRender()
        }
    }
    render() {
        
        return (
    <div>
        <div className={styles.headerContainer}>
                <h1 className={'fontSize'}>مدیریت سفارش ها</h1>
            <div className={`${styles.radioContainer} mr-3`}>
                <div dir="rtl" className={styles.radioContainerGroup}>
                    <input inline name="group1" className={'ml-2'} type={"radio"} id={`inline-radio-1`} key={1} onChange ={()=>this.tellPage1()} />
                    <label for="group1">سفارش های تحویل داده شده</label>
                </div>
                <div dir="rtl" className={`${styles.radioContainerGroup} mr-2`}>
                    <input inline name="group1" className={'ml-2'} type={"radio"} id={`inline-radio-2`} key={2} onChange ={()=>this.tellPage2()} defaultChecked/>
                    <label for="group1">سفارش های در حال انتظار تحویل</label>
                </div>
            </div>  
        </div>
        <div className={styles.table}>
            <Table striped bordered hover size="sm" >
              <thead>
                <tr>
                  <th>نام</th>
                  <th>مجموع مبلغ</th>
                  <th>زمان ثبت</th>
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

export  {PanelOrders}
