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
        default:
            return state;
    }
}

export default products;