import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isLogin } from '../../utils';
import {AdminLayout} from '../../layout/'

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
            <AdminLayout>
            <Component {...props} />
            </AdminLayout>
            : <Redirect to="/signin" />
        )} />
    );
};

export default PrivateRoute;