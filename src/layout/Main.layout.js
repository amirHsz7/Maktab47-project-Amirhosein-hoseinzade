import {Component} from "react";
import  Header  from "./Header/Header";

class Main extends Component {
  render() {
    return (
      <div style={{backgroundColor:'rgb(232, 232, 232)'}}>
        <Header />
        {this.props.children}
      </div>
    )
  }
}

export {Main};