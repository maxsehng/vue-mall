<template>
    <div id="detail">
        <!-- 导航栏 -->
        <detail-nav-bar class="detail-nav" @titleClick='titleClick' ref="nav"></detail-nav-bar>
        <scroll class="content" ref='scroll' @scroll="contentScroll" :probeType='3'>
        <detail-swiper :top-images= 'topImages'></detail-swiper>
        <detail-base-info :goods='goods'></detail-base-info>
        <detail-shop-info :shop='shop'></detail-shop-info>
        <detail-images-info :imagesInfo='imagesInfo' @imgLoad='imgLoad'></detail-images-info>
        <detail-param-info :paramInfo = 'paramInfo' ref="params"></detail-param-info>
        <detail-comment-info :commentInfo = 'commentInfo' ref="comment"></detail-comment-info>
        <goods-list :goods = 'recommends' ref="recommend"></goods-list>
        </scroll>
        <detail-bottom-bar @addToCart='addToCart'></detail-bottom-bar>
        <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
        <!-- <toast :message='message' :show='show'></toast> -->
    </div> 
</template>

<script>
import BackTop from 'components/content/backTop/BackTop'
import DetailBottomBar from './childComps/DetailBottomBar'
import GoodsList from 'components/content/goods/GoodsList'
import DetailCommentInfo from './childComps/DetailCommentInfo'
import DetailParamInfo from './childComps/DetailParamInfo'
import DetailImagesInfo from './childComps/DetailImagesInfo'
import DetailShopInfo from './childComps/DetailShopInfo'
import DetailBaseInfo from './childComps/DetailBaseInfo'
import DetailNavBar  from './childComps/DetailNavBar'
import DetailSwiper from './childComps/DetailSwiper'
import Scroll from 'components/common/scroll/Scroll'
import {getDetail ,Goods ,Shop ,GoodsParams ,getRecommend} from 'network/detail'
import {backTopMixin} from 'common/mixin'

import {mapActions} from 'vuex'
// import Toast from 'components/common/toast/Toast'
export default {
    name:'Detail',
    components:{
        DetailNavBar,
        DetailSwiper,
        DetailBaseInfo,
        DetailShopInfo,
        Scroll,
        DetailImagesInfo,
        DetailParamInfo,
        DetailCommentInfo,
        GoodsList,
        DetailBottomBar,
        BackTop,
        // Toast
    },
    mixins:[backTopMixin],
    data(){
        return {
            iid: null,
            topImages:[],
            goods: {},
            shop:{},
            imagesInfo:{},
            paramInfo:{},
            commentInfo:{},
            recommends:[],
            themeTopYs:[],
            currentIndex:0,
            // message:'',
            // show:false
        }
    },
    methods:{
        ...mapActions(['addCart']),
        imgLoad(){
            this.$refs.scroll.refresh()
            this.themeTopYs = []
            this.themeTopYs.push(0)
            this.themeTopYs.push(this.$refs.params.$el.offsetTop)
            this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
            this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
            this.themeTopYs.push(Number.MAX_VALUE)
        },
        titleClick(index){
            // console.log(index);
            this.$refs.scroll.scrollTo(0,-this.themeTopYs[index],200)
        },
        contentScroll(position){
            const positionY = -position.y
            let length = this.themeTopYs.length
            for (let i = 0;i < length - 1; i ++) {
                if (this.currentIndex !== i &&(positionY >=this.themeTopYs[i] && positionY <this.themeTopYs[i+1])){
                    this.currentIndex = i ;
                    this.$refs.nav.currentIndex = this.currentIndex
                }
            }
            this.listenShowBackTop(position)
        },
        addToCart(){
            //1.获取购物车需要展示的数据
            const product = {

            }
            product.image =this.topImages[0]
            product.title = this.goods.title
            product.desc = this.goods.desc
            product.price = this.goods.realPrice
            product.iid = this.iid

            this.addCart(product).then(res =>{
                // this.show=true
                // this.message = res;
                // setTimeout(() => {
                //     this.show = false
                //     this.message= ''
                // }, 1500);
                // console.log(res);
                this.$toast.show(res, 2000)
            })
            // this.$store.dispatch('addCart',product).then(res => {
            //     console.log(res);
                
            // })
            
        }
    },
    created() {
        //保存iid
        this.iid = this.$route.params.iid
        // 将从GoodsListItem组件中的iid拿过来存到本组件的data中

        getDetail(this.iid).then(res => {
            console.log(res)
            this.topImages = res.result.itemInfo.topImages
            const data = res.result
            //2.获取商品信息
            this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
            //3.获取店铺信息
            this.shop = new Shop(data.shopInfo)
            //4.获取商品详细信息
            this.imagesInfo = data.detailInfo

            this.paramInfo = new GoodsParams(data.itemParams.info, data.itemParams.rule)

            if (data.rate !== 0){
                this.commentInfo = data.rate.list[0]
            }
            //值不对的原因是this.$refs.params.$el压根没有渲染
            // this.themeTopYs = []
            //     this.themeTopYs.push(0)
            //     this.themeTopYs.push(this.$refs.params.$el.offsetTop)
            //     this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
            //     this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)

          
        })

        getRecommend().then(res => {
            this.recommends = res.data.list
            console.log(res);
            
        })
        
    },
    
}
</script>

<style scoped>
    #detail{
        position: relative;
        z-index: 11;
        background-color: #fff;
        height: 100vh;
    }

    .content{
        height: calc(100% - 44px);
    }
    .detail-nav{
        position: relative;
        z-index: 9;
        background-color: #fff;
    }
</style>