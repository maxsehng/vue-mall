<template>
    <div id="home">
        <nav-bar class="home-nav">
            <div slot="center">购物街</div>
        </nav-bar>
    </div>
</template>

<script>

import NavBar from 'components/common/NavBar/NavBar.vue'
import {getHomeMultidate} from 'network/home'
export default {
    name:'Home',
    components:{
        NavBar
    },
    data(){
        return {
            banners:[],
            recommends:[]
        }
    },
    created(){
        getHomeMultidate().then( res => {
            this.banner = res.data.banners.list,
            this.recommends = res.data.recommends.list
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

