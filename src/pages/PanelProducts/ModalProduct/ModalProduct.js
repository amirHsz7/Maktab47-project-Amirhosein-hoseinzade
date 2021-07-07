import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import {postFormProduct,editFormProduct,deleteFormProduct} from '../../../api/api'
import {BASE_URL_SITE} from '../../../configs/variables.config'


 export function AddProduct(props) {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  async function  handleForm(){
    var form = new FormData()
    form.append('name',document.getElementById('nameid').value );
    form.append('image',document.getElementById('FormControlFile1').files[0] );
    form.append('group',document.getElementById('groupid').value );
    form.append('category','products' );
        const resualt = await postFormProduct(form)
        console.log(resualt)
    }
    return (
      <>
        <Button variant="success" onClick={handleShow}>افزودن کالا</Button>
        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>فرم افزودن کالا</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form id="myForm" onSubmit={handleForm} action="#">
                <Form.Group>
                  <Form.File id="FormControlFile1" label="تصویر کالا" value={props.img} />
                </Form.Group>
                <Form.Group controlId="formBasicName">
                    <Form.Label>نام کالا</Form.Label>
                    <Form.Control type="name" id="nameid" name="name"placeholder="کالا" value={props.name}/>
                    <Form.Text className="text-muted">
                    </Form.Text>
                </Form.Group>
                <Form.Group controlId="exampleForm.ControlSelect1">
                <Form.Label>دسته بندی</Form.Label>
                    <Form.Control as="select" id="groupid" value={props.gp}>
                    <option>groceries</option>
                    <option>dairy</option>
                    <option>protein-foods</option>
                    <option>beverages</option>
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId="exampleForm.ControlTextarea1">
                    <Form.Label>توضیحات</Form.Label>
                    <Form.Control as="textarea" rows={3} value={props.txt} />
                </Form.Group>
                <Button variant="primary" type="submit">ثبت</Button>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary"  onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
  
  export function Editproduct(props) {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  async function  handleForm(e){
    
    var form1 = new FormData()
    form1.append("name",document.getElementById('nameid').value );
    form1.append('image',document.getElementById('FormControlFile1').files[0] );
    form1.append('group',document.getElementById('groupid').value );
          const resualt = await editFormProduct(props.id,form1)

    }
    return (
      <>
        <a className={`alink-blue`} variant="success" onClick={handleShow}>ویرایش</a>
        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>فرم افزودن کالا</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form id="myForm" onSubmit={handleForm} action="#">
                <Form.Group>
                  <Form.File id="FormControlFile1" label="تصویر کالا" defaultValue={props.img} />
                </Form.Group>
                <Form.Group controlId="formBasicName">
                    <Form.Label>نام کالا</Form.Label>
                    <Form.Control type="name" id="nameid" name="name" placeholder="کالا"  defaultValue={props.name}/>
                    <Form.Text className="">
                    </Form.Text>
                </Form.Group>
                <Form.Group controlId="exampleForm.ControlSelect1">
                <Form.Label>دسته بندی</Form.Label>
                    <Form.Control as="select" id="groupid" defaultValue={props.gp}>
                    <option>groceries</option>
                    <option>dairy</option>
                    <option>protein-foods</option>
                    <option>beverages</option>
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId="exampleForm.ControlTextarea1">
                    <Form.Label>توضیحات</Form.Label>
                    <Form.Control as="textarea" rows={3} value={props.txt} />
                </Form.Group>
                <Button variant="primary" type="submit">ثبت</Button>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary"  onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
   
  export function DeleteProduct(props) {
  async function  handleClick(){
          const resualt = await deleteFormProduct(props.id)
    }
    return (
      <>
       <Form onSubmit={handleClick} action={`${BASE_URL_SITE}/admin-panel`} > <button className={`normal`} variant="success" type="submit"  >حذف</button> </Form>
      </>
    );
  }
  