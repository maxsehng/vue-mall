<template>
        <swiper class="detail-swiper">
            <swiper-item v-for="item in topImages" >
                <img :src="item" alt="">
                <!-- 动态给变量 一定要使用v-bind绑定 -->
            </swiper-item>
        </swiper>
</template>

<script>
import {Swiper , SwiperItem} from 'components/common/swiper'
export default {
    name:'DetailSwiper',
    props:{
        topImages:{
            type:Array,
            default(){
                return []
            }
        }
    },
    components:{
        Swiper,
        SwiperItem
    }
}
</script>

<style scoped>
    .detail-swiper{
        height: 300px;
        overflow: hidden;
    }
</style>