export const addToCart = (productId,details) => ({
    type : "ADD_TO_CART",
    productId , details
})

export const cancelAction = () => ({
    type : 'CANCEL'
})