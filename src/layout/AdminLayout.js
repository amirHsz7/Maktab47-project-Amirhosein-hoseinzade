import {Component} from "react";
import { AdminHeader } from "./Header/AdminHeader";


class AdminLayout extends Component {
  render() {
    console.log('props', this.props);
    return (
      <div>
        <AdminHeader />
        <h1>Admin Layout</h1>
        {this.props.children}
      </div>
    )
  }
}

export {AdminLayout};