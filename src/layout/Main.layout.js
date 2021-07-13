import {Component} from "react";
import  Header  from "./Header/Header";

class Main extends Component {
  render() {
    return (
      <div>
        <Header />
        {this.props.children}
      </div>
    )
  }
}

export {Main};