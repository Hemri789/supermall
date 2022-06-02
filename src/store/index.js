import Vue from 'vue'
import Vuex from 'vuex'

// 1、安装vuex插件
Vue.use(Vuex)

// 2、创建Store对象
const store = new Vuex.Store({
    state: {
        cartList: []
    },
    mutations: {
        //mutations 唯一的目的就是修改 state 中状态
        //mutations 中的每个方法尽可能完成的事情比较单一
        addCart(state, payload) {
            // payload新添加的商品
            // let oldProduct = null
            // for (let item of state.cartList) {
            //     if (item.iid === payload.iid) {
            //         oldProduct = item
            //     }
            // }

            //1、查找之前数组是否有该商品
            let oldProduct = state.cartList.find(item => item.iid === payload.iid)
                // 2、判断oldProduct
            if (oldProduct) { //商品数量 +1
                oldProduct.count += 1

            } else { //添加新的商品
                payload.count = 1
                payload.checked = true
                state.cartList.push(payload)

            }

        }
    }
})

// 3、挂载Vue实例上
export default store