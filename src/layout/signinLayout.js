import {Component} from "react";

const style={
  background: 'rgb(247,247,247);',
  background: 'radial-gradient(circle, rgba(247,247,247,1) 0%, rgba(176,172,172,1) 100%);'
}
class signinLayout extends Component {
  render() {
    return (
      <div style={style}>
        {this.props.children}
      </div>
    )
  }
}

export {signinLayout};