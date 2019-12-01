import {
    ADD_COUNTER,
    ADD_TO_CART
} from './mutations-type.js'
export default {
    //mutations唯一的目的就是为了修改state中的状态
    //mutations每一个方法尽可能完成的事情比较单一一点，意思是最好只干一件事情
    //mutations可以对状态进行跟踪
    [ADD_COUNTER](state, payload){
        payload.count ++
    },
    [ADD_TO_CART](state, payload){
        payload.checked = true
        state.cartList.push(payload)
    }
}