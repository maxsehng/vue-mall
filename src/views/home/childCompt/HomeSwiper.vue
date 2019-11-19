<template>
    <swiper>
        <swiper-item v-for='item in banners'>
            <a :href="item.link">
                <img :src="item.image" alt="">
            </a>
        </swiper-item>
    </swiper>
    <!-- 这里的banners需要从home.vue里面去拿 -->
</template>

<script>
import {Swiper,SwiperItem} from 'components/common/swiper'
export default {
    name:'HomeSwiper',
    props:{
        banners:{
            type:Array,
            default(){
                return []
            }
        }
    }, //为了拿到home.vue里面请求的数据
    components:{
        Swiper,
        SwiperItem
    }
}
</script>

<style scoped>

</style>