import {Component} from "react";
import { AdminHeader } from "./Header/AdminHeader";


class AdminLayout extends Component {
  render() {
    return (
      <div>
        <AdminHeader />
        {this.props.children}
      </div>
    )
  }
}

export {AdminLayout};