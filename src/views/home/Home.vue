<template>
    <div id="home">
        <nav-bar class="home-nav">
            <div slot="center">购物街</div>
        </nav-bar>

        <tab-control :titles="['流行','新款','精选']" 
        @tabClick= 'tabClick'
        ref = 'tabControl1' class="tab-control" v-show="isTabFixed"
        ></tab-control>
        
        <!-- 只显示基本的逻辑，至于逻辑具体怎么展示，交给组件本身，这样使代码显得不那么臃肿 -->

        <scroll class= "content"
         ref="scroll" 
         :probe-type = '3' 
         :pull-up-load = 'true'
         @scroll="contentScroll"
         @pullingUp = 'loadMore'
         >
            
        <home-swiper :banners='banners' @swiperLoad = 'swiperLoad'></home-swiper>

        <recommend-view :recommends='recommends'/>

        <feature-view/>

        <tab-control :titles="['流行','新款','精选']" 
        @tabClick='tabClick'
        ref = 'tabControl2'
        
        ></tab-control> 

        <goods-list :goods="showGoods"></goods-list>    

        </scroll>

        <!-- 组件是不能直接添加事件的 必须添加native 原生修饰符
        .native 监听组件根元素的原生事件
         -->
        <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>

       
    </div>
</template>

<script>

import NavBar from 'components/common/NavBar/NavBar.vue'
import TabControl from 'components/content/tabControl/TabControl.vue'
import GoodsList from 'components/content/goods/GoodsList.vue'
import Scroll from 'components/common/scroll/Scroll'
import BackTop from 'components/content/backTop/BackTop'

import HomeSwiper from './childCompt/HomeSwiper'
import FeatureView from './childCompt/FeatureView'
import RecommendView from './childCompt/RecommendView'

import {getHomeMultiData ,getHomeGoodsData} from 'network/home'

import BScroll from 'better-scroll'
export default {
    name:'Home',
    components:{
        NavBar,
        TabControl,
        HomeSwiper,
        RecommendView,
        FeatureView,
        GoodsList,
        Scroll,
        BackTop
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
            currentType:'pop',
            isShowBackTop:true,
            tabOffsetTop:597,
            isTabFixed:false,
            saveY: 0
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
    mounted() {
        //3.监听item图片加载完成
        this.$bus.$on('itemImageLoad',() => {
            this.$refs.scroll.refresh()
        }) 

        //使用$el 可以获取组件元素      
    },
    activated() {
           this.$refs.scroll.scrollTo(0, this.saveY ,0) 
           this.$refs.scroll.refresh()
    },
    deactivated() {
            this.saveY = this.$refs.scroll.getScrollY() 
            //取消全局事件的监听
            this.$bus.$of('itemImageLoad',)

    },
    computed: {
        showGoods(){
            return this.goods[this.currentType].list
        },
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
            // ...res.data.list es6写法 解构数组 将里面的数据一个一个地塞进去
            this.goods[type].list.push(...res.data.list)
            this.goods[type].page += 1
            //为了继续下拉加载必须调用scroll组件的finishPullUp方法
            this.$refs.scroll.finishPullUp()
        })
        },
        //事件监听相关方法
        // debounce(func , delay){
        //     let timer = null

        //     return function(){
        //         if (timer) clearTimeout(timer)
        //     }
        // },

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
            this.$refs.tabControl1.currentIndex = index;
            this.$refs.tabControl2.currentIndex = index;
        },
        loadMore(){
            this.getHomeGoodsData(this.currentType) 
            //scroll.refresh()  重新获取高度
            this.$refs.scroll.scroll.refresh() 
        },
        backClick(){
            this.$refs.scroll.scrollTo(0,0)
            //$refs.scroll 代表的是 scroll这个组件对象,拿到他后就可以调用组件对象里面的数据或者方法
        },
        contentScroll(position){
            this.isShowBackTop = ( -position.y) > 1000

            this.isTabFixed = (-position.y) > this.tabOffsetTop
        },
        swiperLoad(){
            // console.log(this.$refs.tabControl2.$el.offsetTop);
            
        },
        
    }
}
</script>

<style scoped>
    #home{
        padding-top: 44px;
        height: 100vh;
        position:relative;
        /* viewpointerheight 视口高度 */
    }
    .home-nav{
        background-color: var(--color-tint);
        color: aliceblue;
        margin-top: -44px;
        position: relative;
        z-index: 9;
        /* position: fixed;
        left: 0;
        right: 0;
        top: 0;
        z-index: 9; */
    }
    .tab-control{
        /* 当top值达到44px时，该属性会自动变为fixed 所以该属性一般会结合top或者bottom使用 */
        /* position:sticky; */
        /* top: 44px; */

        background-color: #fff;
        z-index: 9;
    }
    .content{
        /* height: calc(100%-98px); */
        height: 300px;
        /* overflow: hidden; */
        position: absolute;
        top: 44px;
        bottom: 49px;
    }

    .fixed {
        position: fixed;
        left: 0;
        right: 0;
        top:44px;
    }
    .tab-control{
        position: relative;
        z-index: 9;
    }
    /* .content{
        height: calc(100% - 93px); 内容区域=100%高度-(navbar+tabbar)的高度
        overflow: hidden;
        margin-top: 44px;    也可以起到类似上面的效果 
    } */
</style>

