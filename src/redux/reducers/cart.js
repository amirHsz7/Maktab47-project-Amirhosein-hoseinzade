
const initialState = {
    addedIds : [],
    quantityById : {},
    details : [],
    productId : []
}

const addedIds = (state = initialState.addedIds , action) => {
    if(state.indexOf(action.productId) !== -1) {
        return state;
    }
    return [...state , action.productId];
}
const addedIds2 = (state = initialState.addedIds , action) => {
    return [...state ];
}
const quantityById = (state = initialState.quantityById , action ) => {
    const { productId } = action;
    return {
        ...state,
        [productId] : (state[productId] || 0) + 1
    }
}

function reducer(appState, action) {
    switch(action.type) {
     case  "CANCEL_EDIT":
       if (!appState.isSaving) {
         return {...appState, editingRecord: null }
       } else {
         return appState;
       }
     default:
       return appState;
  
    }
  }


const cart = (state = initialState, action) => {
    switch (action.type) {
        case "ADD_TO_CART":
            return {
                addedIds : addedIds(state.addedIds , action),
                quantityById : quantityById(state.quantityById , action)
            }
        case 'CANCEL':
            return {}
        default:
            return state;
    }
}


export default cart;