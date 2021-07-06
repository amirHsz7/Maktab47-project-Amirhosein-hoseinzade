import  { Component } from 'react';
import Button from 'react-bootstrap/Button'
import styles from './prices.module.css'
import Table from 'react-bootstrap/Table'
import {fetchData,editFormProduct} from '../../api/api'
import Pagination from 'react-bootstrap/Pagination'
import Form from 'react-bootstrap/Form'
import {BASE_URL_SITE} from '../../configs/variables.config'
import Mystyles from './prices.module.css';

class PanelPrices extends Component {
    constructor(props){
        super(props)
        this.state = {
            itemList : [],
            paginationBasic : null,
            pages : 1,
            currentPage: 1,
            hidden : null,
            flag : 0,
            counter : 1,
            variant: 'secondary',
            ids:[],
            flag1:0,
            totalPages: null
        }
    }
     fixit =(e) => {
         let length = document.getElementsByClassName('input').length/2
         for(let i =0 ; i<length;i++){
            if(e.keyCode == 27) 
            {

                if(document.getElementsByClassName(`inputprice`)[i].nextElementSibling.innerHTML != '') document.getElementsByClassName(`inputprice`)[i].value = document.getElementsByClassName(`inputprice`)[i].nextElementSibling.innerHTML
                if(document.getElementsByClassName(`inputinventory`)[i].nextElementSibling.innerHTML != '')document.getElementsByClassName(`inputinventory`)[i].value = document.getElementsByClassName(`inputinventory`)[i].nextElementSibling.innerHTML
                document.getElementsByClassName(`inputprice`)[i].nextElementSibling.classList.add('WHITE_COLOR')  
                document.getElementsByClassName(`inputinventory`)[i].nextElementSibling.classList.add('WHITE_COLOR')  
            }
         }
    }
    handleChangeBut (e){
        if(!this.state.ids.includes(e) ){
            this.state.ids.push(e)
        }
        let length = document.getElementsByClassName('input').length/2
         for(let i =0 ; i<length;i++){
            if(document.getElementsByClassName(`inputprice`)[i].value != '') document.getElementsByClassName(`inputprice`)[i].nextElementSibling.classList.add('WHITE_COLOR')  
            if(document.getElementsByClassName(`inputinventory`)[i].value != '') document.getElementsByClassName(`inputinventory`)[i].nextElementSibling.classList.add('WHITE_COLOR')  
         }
        if(this.state.variant == 'secondary' ) this.setState({variant : 'primary'})

    }
    handleClickBtnSubmit = (e) =>{
        if(this.state.variant == "secondary") e.preventDefault()
    }

    handleRender(){
        const renderElement = []
        this.state.itemList.forEach(e =>{
            
            renderElement.push(
                    <tr >
                        <td><p>{e.name}</p></td>
                        <td ><input id={`${e.idd}`} className={`inputprice input ${Mystyles.input}`} type="text"  onKeyDown={this.fixit} onChange={()=>{this.handleChangeBut(e.idd)}} /><p>{e.price}</p> </td>
                        <td ><input id={`${e.idd}-1`} className={`inputinventory input ${Mystyles.input}`} type="text"  onKeyDown={this.fixit} onChange={()=>{this.handleChangeBut(e.idd)}} /><p>{e.inventory}</p></td>
                    </tr>
            )
    
        })

        return renderElement;
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
    async handlePage(num){
        if(this.state.variant == 'primary'){
            return alert('لطفا تغیرات خود را ثبت کنید')
        }
        const db = await fetchData(`products?category=products&_page=${num}&_limit=5`);
        const itemList = []
        db.forEach(e =>{
             itemList.push( {
                    name :e.name,
                    price : e.price,
                    inventory : e.inventory,
                    idd : e.id
                })
        })
 
        this.setState({itemList : itemList })
     }
      handleSubmitForm = () =>{
                this.state.ids.forEach( async a=>{
                    var obj = {
                        "price" : "",
                        "inventory": ""
                      }
                          obj["price"]=document.getElementById(`${a}`).value
                          obj["inventory"]=document.getElementById(`${a}-1`).value
                          if(obj["price"]==='') delete obj["price"]
                          if(obj["inventory"]==='') delete obj["inventory"]
                          await editFormProduct(a,obj)
                        })

                            
     }
    async componentDidMount() {
        const totalpages = await fetchData(`products?isPages=true`);
        this.setState({totalPages : totalpages[0]["totalpage"]})  
        const db = await fetchData(`products?category=products&_page=${1}&_limit=5`);
        const itemList = []
        db.forEach(e =>{
               return itemList.push( {
                    name :e.name,
                    price : e.price,
                    inventory: e.inventory,
                    idd : e.id
                })
        })

        this.setState({itemList : itemList })

    
}
    render() {
        return (
            <Form onSubmit={this.handleSubmitForm} action={`${BASE_URL_SITE}/admin-panel-prices`}>
                <div className={styles.topContainer}>
                    <h1 className={'fontSize'}>مدیریت موجودی و قیمت ها</h1>
                    <Button onClick={this.handleClickBtnSubmit} type="submit" variant={this.state.variant} >ثبت</Button>
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
            </Form>
        )
    }
}

export  {PanelPrices}
