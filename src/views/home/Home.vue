<template>
    <div id="home">
        <nav-bar class="home-nav">
            <div slot="center">购物街</div>
        </nav-bar>
        <!-- 只显示基本的逻辑，至于逻辑具体怎么展示，交给组件本身，这样使代码显得不那么臃肿 -->
        <home-swiper :banners='banners'></home-swiper>
    </div>
</template>

<script>

import NavBar from 'components/common/NavBar/NavBar.vue'
import HomeSwiper from './childCompt/HomeSwiper'
import {getHomeMultiData} from 'network/home'
export default {
    name:'Home',
    components:{
        NavBar,
        HomeSwiper
    },
    data(){
        return {
            banners:[],
            recommends:[]
        }
    },
    created(){
        //getHomeMultiData函数返回的是一个promise所以直接用.then 去对拿到的数据res做进一步处理
        getHomeMultiData ().then( res => {
            // console.log(res);
            // this.result = res;
            this.banners = res.data.banner.list
            this.recommends = res.data.recommend.list
            //将请求的数据保存在home的数据中 因为当该函数执行完，res指向 data res会被销毁，
            //当res被销毁时，data没有指向他的数据，data也会被销毁，所以需要保存起来
        })
    }
}
</script>

<style scoped>
    .home-nav{
        background-color: var(--color-tint);
        color: aliceblue;
    }
</style>

