<template>
    <div id="detail">
        <!-- 导航栏 -->
        <detail-nav-bar class="detail-nav"></detail-nav-bar>
        <scroll class="content" ref='scroll'>
        <detail-swiper :top-images= 'topImages'></detail-swiper>
        <detail-base-info :goods='goods'></detail-base-info>
        <detail-shop-info :shop='shop'></detail-shop-info>
        <detail-images-info :imagesInfo='imagesInfo' @imgLoad='imgLoad'></detail-images-info>
        <detail-param-info :paramInfo = 'paramInfo'></detail-param-info>
        <detail-comment-info :commentInfo = 'commentInfo'></detail-comment-info>
        <goods-list :goods = 'recommends'></goods-list>
        </scroll>
    </div> 
</template>

<script>
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
        GoodsList
    },
    data(){
        return {
            iid: null,
            topImages:[],
            goods: {},
            shop:{},
            imagesInfo:{},
            paramInfo:{},
            commentInfo:{},
            recommends:[]
        }
    },
    methods:{
        imgLoad(){
            this.$refs.scroll.refresh()
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