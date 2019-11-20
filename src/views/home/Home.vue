<template>
    <div id="home">
        <nav-bar class="home-nav">
            <div slot="center">购物街</div>
        </nav-bar>

        <!-- 只显示基本的逻辑，至于逻辑具体怎么展示，交给组件本身，这样使代码显得不那么臃肿 -->
        <home-swiper :banners='banners'></home-swiper>

        <recommend-view :recommends='recommends'/>

        <feature-view/>

        <tab-control :titles="['流行','新款','精选']" class="tab-control"
        @tabClick='tabClick'
        ></tab-control>

        <goods-list :goods="showGoods"></goods-list>
       
    </div>
</template>

<script>

import NavBar from 'components/common/NavBar/NavBar.vue'
import TabControl from 'components/content/tabControl/TabControl.vue'
import GoodsList from 'components/content/goods/GoodsList.vue'

import HomeSwiper from './childCompt/HomeSwiper'
import FeatureView from './childCompt/FeatureView'
import RecommendView from './childCompt/RecommendView'

import {getHomeMultiData ,getHomeGoodsData} from 'network/home'
export default {
    name:'Home',
    components:{
        NavBar,
        TabControl,
        HomeSwiper,
        RecommendView,
        FeatureView,
        GoodsList
    },
    data(){
        return {
            banners:[],
            recommends:[],
            goods:{
                'pop':{page:0, list:[]},
                'new':{page:0, list:[]},
                'sell':{page:0, list:[]},
            },
            currentType:'pop'
        }
    },
    created(){
        //getHomeMultiData函数返回的是一个promise所以直接用.then 去对拿到的数据res做进一步处理
        this.getHomeMultiData ()

        //请求商品页数据
        this.getHomeGoodsData('pop')

        //将函数体封装至methods里面 这里只负责调用
        this.getHomeGoodsData('new')
        this.getHomeGoodsData('sell')
    },
    computed: {
        showGoods(){
            return this.goods[this.currentType].list
        }
    },
    methods:{
        //  网络请求相关的方法
        getHomeMultiData (){
            getHomeMultiData ().then( res => {
            // console.log(res);
            // this.result = res;
            this.banners = res.data.banner.list
            this.recommends = res.data.recommend.list
            //将请求的数据保存在home的数据中 因为当该函数执行完，res指向 data res会被销毁，
            //当res被销毁时，data没有指向他的数据，data也会被销毁，所以需要保存起来
        })
        },
        getHomeGoodsData(type){
            const page = this.goods[type].page + 1
            getHomeGoodsData(type,page).then(res =>{
            // console.log(res)
            this.goods[type].list.push(...res.data.list)
            this.goods[type].page += 1
        })
        },
        //事件监听相关方法
        tabClick(index){
            //把一个个index 与 type联系一一对应起来
            switch(index){
                case 0:
                    this.currentType ='pop'
                    break;
                case 1:
                    this.currentType ='new'
                    break;
                case 2:
                    this.currentType ='sell'
            }
        }

    }
}
</script>

<style scoped>
    #home{
        padding-top: 44px;
    }
    .home-nav{
        background-color: var(--color-tint);
        color: aliceblue;
        position: fixed;
        left: 0;
        right: 0;
        top: 0;
        z-index: 9;
    }
    .tab-control{
        /* 当top值达到44px时，该属性会自动变为fixed 所以该属性一般会结合top或者bottom使用 */
        position:sticky;
        top: 44px;

        background-color: #fff;
        z-index: 9;
    }
</style>

