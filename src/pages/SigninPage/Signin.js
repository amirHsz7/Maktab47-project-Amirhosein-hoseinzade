
import { Link } from 'react-router-dom';
import { login } from '../../utils';
import Form from 'react-bootstrap/Form'
import { Button } from 'react-bootstrap';
import FormControl from 'react-bootstrap/FormControl';
import styles from './signin.module.css';
const SignIn = (props) => {

    const handleLogin = () => {
        
        login();
    }

    return (
        <div className={styles.container}>
            <div className={styles.form}>
            
            <Form>
                <Form.Group controlId="formBasicnickName" className={styles.group}>
                    <Form.Label>نام کاربری:</Form.Label>
                    <Form.Control type="nickName" placeholder="نام کاربری" />
                    <Form.Text className="text-muted">لطفا نام کاربری خود را وارد کنید</Form.Text>
                </Form.Group>
                    <Form.Group controlId="formBasicPassword" className={styles.group}>
                    <Form.Label>رمز عبور:</Form.Label>
                    <Form.Control type="password" placeholder="رمزعبور" />
                </Form.Group>
            <Button variant="primary" className={styles.btn}><Link to='/admin-panel' onClick={() => handleLogin()} className={styles.link}>ورود</Link></Button>
            </Form>
            </div>
        </div>
    );
};

export default SignIn;