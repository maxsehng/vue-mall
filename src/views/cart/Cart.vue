<template>
    <div class="cart">
        <!-- 导航 -->
        <nav-bar class="nav-bar">
            <div slot="center">购物车({{length}})</div>
        </nav-bar>
        <!-- 商品列表 -->
        <cart-list></cart-list>
        <!-- 底部汇总 -->
        <cart-bottom-bar></cart-bottom-bar>
    </div>
</template>

<script>
import CartBottomBar from './cartComps/CartBottomBar'
import CartList from './cartComps/CartList'
import NavBar from 'components/common/NavBar/NavBar'
import {mapGetters} from 'vuex'
export default {
    name:'Cart',
    components:{
        NavBar,
        CartList,
        CartBottomBar
    },
    computed:{
        ...mapGetters({
            length:'cartNumber'
        })
    }
}
</script>

<style scoped>
    .nav-bar{
        background-color:var(--color-tint);
        color: #ffffff;
        /* font-weight: 700; */
    }
    .cart{
        height: 100vh;
    }
</style>