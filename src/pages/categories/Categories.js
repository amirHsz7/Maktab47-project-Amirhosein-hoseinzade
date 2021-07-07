import React, { Component } from 'react'
import { withRouter } from "react-router";
 class Categories extends Component {
     constructor(props){
         super(props);
         this.state={
            group: this.props.location.state.group
         }
     }
    componentDidMount() {
        const id = this.props.location;
    }
    
    render() {
        
        return (
            <div>
              {this.context.location}  
            </div>
        )
    }
}
export default withRouter(Categories);

