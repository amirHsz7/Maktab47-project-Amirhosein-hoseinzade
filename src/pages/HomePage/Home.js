import React, { Component } from 'react'
import  GroupContainer  from './GroupContainer/GroupContainer'


class Home extends Component {
    // constructor(props){
    //     super(props)
    //     this.state = {
    //         itemList : []
    //     }
    // }
// handleRender(){
//     const renderElement = []
//     this.state.itemList.forEach(e =>{
//         renderElement.push(<Product name={e.name} price={e.price} img={e.image}/>)
//     })
//     console.log(renderElement)
//     return renderElement;
// }

//     async componentDidMount() {

        
//         const db = await fetchData('foodstuff');
//         const users=db["dairy"]
//         const itemList = users.map(e =>{
//                return {
//                     name :e.name,
//                     price : e.price,
//                     image: e.image
//                 }
//         })
//         this.setState({itemList  })
        
    // }
      
    render() {
        // console.log(this.itemList)
        return (
            <div>
                <GroupContainer group="dairy" />
                <GroupContainer group="beverages" />
                {/* {this.handleRender()} */}
            </div>
        )
    }
}


export {Home}


