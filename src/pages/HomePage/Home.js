import React, { Component } from 'react'
import  GroupContainer  from './GroupContainer/GroupContainer'


class Home extends Component {
  componentDidMount(){
    if(parseInt(localStorage.getItem('CounterOrders'))==0) {
      document.getElementById('ppp').innerHTML=''
      document.getElementById('ppp').style.background="none"
    }
    else {
      document.getElementById('ppp').innerHTML=parseInt(localStorage.getItem('CounterOrders'))
      document.getElementById('ppp').style.background="rgb(187, 64, 64)"
    }
  }
    render() {
        // console.log(this.itemList)
        return (
            <div>
                <GroupContainer group="dairy" />
                <GroupContainer group="beverages" />
                <GroupContainer group="protein-foods" />
                <GroupContainer group="groceries" />
                {/* {this.handleRender()} */}
            </div>
        )
    }
}


export {Home}


