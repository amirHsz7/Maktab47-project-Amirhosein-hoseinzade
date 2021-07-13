const products = (state = {} , action) => {
    switch (action.type) {
      
        case "ADD_TO_CART" :
            let { productId , details} = action;
            let product = state[productId];
            let inv = state[details]
            return {
                ...state,
                [productId] :{
                    "id" : productId,
                    "details" : details
                }   
                        
            }
            case 'CANCEL':
                return {}
            // case "CANCELL"  :
            //     let { details} = action
            //     return {
            //         ...state
            //     } 
        default:
            return state;
    }
}

export default products;