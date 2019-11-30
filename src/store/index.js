import Vue from'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state:{
        cartList:[]
    },
    mutations:{
        //监听加入state中的数据的方法
        addCart(state,payload){
            //oldProduct 来判断新添加的商品是否已经存在于carList中
            let oldProduct = null
            for ( let item of state.cartList){
                if( item.iid = payload.iid){
                    //如果存在 则将该商品复制给oldProduct
                    oldProduct = item
                }
            }
            if(oldProduct){
                oldProduct.count +=1
            }else{
                payload.count = 1
                state.cartList.push(payload)
            }
        }
    }
})

export default store