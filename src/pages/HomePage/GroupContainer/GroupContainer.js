import React, {Component} from 'react'
import { Product } from '../../../component'
import {fetchData} from '../../../api/api'
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import styles from './GroupContainer.module.css'

class GroupContainer extends Component {
    constructor(props){
        super(props)
        this.state = {
            itemList : []
        }
        
    }
    
    handleRender(){
        const renderElement = []
        const renderElement2 = []
        let num = this.state.itemList.length
        this.state.itemList.forEach(e =>{
                 renderElement.push(<div><Product name={e.name} price={e.price} img={e.image}/></div>)
        })
        console.log(renderElement)
        return renderElement
    }
    handleClick = () => {
        this.props.history.push(`/categories`,{
             group : this.props.group
        })
    }
        async componentDidMount() {

        
        const db = await fetchData(`products?group=${this.props.group}&_limit=6`);
        
        const itemList = db.map(e =>{
               return {
                    name :e.name,
                    price : e.price,
                    image: e.image
                }
        })
        this.setState({itemList  })
        
    }
    render() {
        
        return (
            <div dir="rtl" className={styles.mainDiv}>
                <div className={`${styles.link} alink-blue`} to={`/category-${this.props.group}`} onClick={this.handleClick}>{`کالاهای گروه ${this.props.group}`} </div>
                <div className={styles.GroupContainer}>
                {this.handleRender()}
                </div>
            </div>
        )
    }
}

export default withRouter(GroupContainer);


// export const GroupContainer = (props) => {
    
    
//       function  handleRender  () {
//         const renderElement = []
//         const renderElement2 = []
//         let num = itemList.length
//         itemList.forEach(e =>{
//                  renderElement.push(<div><Product name={e.name} price={e.price} img={e.image}/></div>)
//         })
//         return renderElement
//     }
//     useEffect(async () => {
//         const [itemList,setItemList] = useState(0);
//         const db = await fetchData(`products?group=${props.group}&_limit=6`);

// const itemList = db.map(e =>{
//        return {
//             name :e.name,
//             price : e.price,
//             image: e.image
//         }
// })
// this.setItemList({itemList  })
// }, []);
    
//       return (
//                     <div dir="rtl" className={styles.mainDiv}>
//                         {/* <div className={`${styles.link} alink-blue`} to={`/category-${this.props.group}`} onClick={this.handleClick}>{`کالاهای گروه ${this.props.group}`} </div> */}
//                         <div className={styles.GroupContainer}>
//                         {handleRender()}
//                         </div>
//                     </div>
//                 )
// }
 