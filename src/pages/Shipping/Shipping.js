import React, { Component } from 'react'
import { withRouter } from "react-router";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import styles from './shipping.module.css'
import {postFormOrder} from '../../api/api'
class Shipping extends Component {
    constructor(props){
        super(props);
        this.state={
            details : this.props.location.state.details,
            validated : false
        }
    }
    handleSubmit = async (event) => {
        const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    this.setState({validated : true });
    const formData = new FormData()
    formData.append('name',document.getElementById('nameInput').value +' '+document.getElementById('lastNameInput').value )
    formData.append('adress',document.getElementById('adressInput').value)
    formData.append('registration-time',document.getElementById('dateInput').value)
    formData.append('tel',document.getElementById('telInput').value)
    formData.append('isDelivered',false)
    formData.append('details',JSON.stringify(this.state.details))
    await postFormOrder(formData)
    }
    render() {
        console.log(this.state.details)
        return (
            <div dir="rtl">
                <div>نهایی کردن خرید</div>
                <div className={styles.formContainer}>
                <Form noValidate validated={this.state.validated} onSubmit={this.handleSubmit} action={'www.google.com'}>
                    <div className={styles.formInside}>
                    <div className={styles.formInsideInside}>
                    <Form.Group className={styles.formGroup} controlId="formBasicName">
                        <Form.Label>نام :</Form.Label>
                        <Form.Control id="nameInput" className={styles.input}  type="name" placeholder="نام را وارد کنید"  required/>
                        <Form.Control.Feedback type="invalid">
                        نام را به درستی وارد کنید
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className={styles.formGroup} controlId="formBasiclastName">
                        <Form.Label>نام خانوادگی:</Form.Label>
                        <Form.Control className={styles.input} id="lastNameInput"  type="lastName" placeholder="نام خانوادگی را وارد کنید" required/>
                        <Form.Control.Feedback type="invalid">
                        نام خانوادگی را به درستی وارد کنید
                        </Form.Control.Feedback>
                    </Form.Group>
                    </div>
                    <div className={styles.formInsideInside}>
                    <Form.Group className={styles.formGroup} controlId="ControlTextarea">
                        <Form.Label>آدرس :</Form.Label>
                        <Form.Control className={styles.input} id="adressInput" as="textarea" rows={3} required/>
                        <Form.Control.Feedback type="invalid">
                        آدرس را وارد نکردید
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className={styles.formGroup} controlId="formBasicDate">
                        <Form.Label>تاریخ تحویل</Form.Label>
                        <Form.Control className={styles.input} id="dateInput"  type="date"  required/>
                        <Form.Control.Feedback type="invalid">
                        لطفا تاریخ را وارد کنید
                        </Form.Control.Feedback>
                    </Form.Group>
                    </div>
                    <div className={styles.formInsideLast}>
                    <Form.Group className={styles.formGroup} controlId="formBasiclastName">
                        <Form.Label>تلفن همراه :</Form.Label>
                        <Form.Control className={styles.input}  type="tel" id="telInput" pattern="[0-9]{4}[0-9]{3}[0-9]{4}" required />
                        <Form.Control.Feedback type="invalid">
                        شماره تماس وارد شده صحیح نیست!!
                        </Form.Control.Feedback>
                    </Form.Group>
                    </div>
                    </div>
                    <div className={styles.btn}>
                        <Button variant="success" type="submit">پرداخت</Button>
                    </div>
                </Form>
                </div>
            </div>
        )
    }
}

export default withRouter(Shipping)
