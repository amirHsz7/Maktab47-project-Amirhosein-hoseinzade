
import { Link } from 'react-router-dom';
import { login } from '../../utils';

const SignIn = (props) => {

    const handleLogin = () => {
        
        login();
    }

    return (
        <div>
            <h1>Sign in</h1>

            <Link to='/admin-panel' onClick={() => handleLogin()}>Click here to log in</Link>
        </div>
    );
};

export default SignIn;