import {Component} from "react";
import { Header } from "./Header/Header";

class Main extends Component {
  render() {
    console.log('props', this.props);
    return (
      <div>
        <Header />
        <h1>Main Layout</h1>
        {this.props.children}
      </div>
    )
  }
}

export {Main};