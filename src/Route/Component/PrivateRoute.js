import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AdminPanel } from '../../pages/AdminPanel/AdminPanel';
import { isLogin } from '../../utils';
import {Main} from '../../layout/'

// class PrivateRoute extends ReactComponent {


//         render(){
//             return(
//         <Route render={props => (
//             isLogin() ?
//                 showcomponent=this.props.children
//             : <Redirect to="/signin" />
//         )} >
//             {showcomponent}
//         </Route>
//             )
//         }
// };

// export default PrivateRoute;
const PrivateRoute = ({component: Component, ...rest}) => {
    return (

        <Route {...rest} render={props => (
            isLogin() ?
            <Main>
            <Component {...props} />
            </Main>
            : <Redirect to="/signin" />
        )} />
    );
};

export default PrivateRoute;