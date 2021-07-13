import React, { useState,useEffect } from 'react';
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Table from 'react-bootstrap/Table'
import {editFormOrder} from './../../../api/api'

export function ShowOrder(props) {

    const [show, setShow] = useState(false);
    const [deliveredTime, setDeliveredTime] = useState(0);
    const [display, setDisplay] = useState('block');
    const [reDisplay, setReDisplay] = useState('none');
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    useEffect(() => {
        if(props.isDelivered=="false") setDeliveredTime('-')
        else {
            var date = new Date();
            var d = date.getDay()
            var m = date.getMonth()
            var y = date.getFullYear() 
            setDeliveredTime(`${y}-${m}-${d}`)
            setDisplay("none")
            setReDisplay('block')
        }
      }, []);
   function  handleRender() {
        const renderElement = []
            props.details.forEach(e =>{
            
            renderElement.push(
                    <tr>
                        <td><p>{e.name}</p></td>
                        <td><p>{e.price}</p></td>
                        <td><p>{e.inventory}</p></td>
                    </tr>
            )
        })
        
        return renderElement;
    }
   async function handleSubmit (){
    const form = new FormData()
    var date = new Date();
    var d = date.getDay()
    var m = date.getMonth()
    var y = date.getFullYear()
    form.append('isDelivered',true)
    form.append('delivered-date',`${m}-${d}-${y}`)
    await editFormOrder(props.id,form)
    }
    
    return (
        
      <>
        <a className={`alink-blue`} variant="success" onClick={handleShow}>بررسی سفارش</a>
        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
          dir="rtl"
        >
          <Modal.Header closeButton>
            <Modal.Title>نمایش سفارش</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>{`نام مشتری : ${props.name}`}</p>
            <p>{`آدرس :  ${props.adress}`}</p>
            <p>{`تلفن :  ${props.tel}`}</p>
            <p>{`زمان پرداخت :  ${deliveredTime}`}</p>
            <p>{`زمان سفارش :  ${props.time}`}</p>
            <Table striped bordered hover size="sm" >
              <thead>
                <tr>
                  <th>کالا</th>
                  <th>قیمت</th>
                  <th>تعداد</th>
                </tr>
              </thead>
              <tbody id="tbody">
                {handleRender()}
              </tbody>
            </Table>
            <div id="formDiv" style={{display : display}}>
                <form id="form" action={`http://localhost:3001/admin-panel-orders`} onSubmit={handleSubmit}>
                        <Button variant={"success"} type="submit">تحویل شد</Button>
                </form>
            </div>
            <div style={{display : reDisplay}}>
            <p>{`زمان پرداخت :  ${deliveredTime}`}</p>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary"  onClick={handleClose}>
              بستن
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
