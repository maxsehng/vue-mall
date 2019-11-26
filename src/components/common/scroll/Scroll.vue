<template>
<!-- ref -> 绑定某个子组件 方便引用 -->
<!-- ref 如果绑定在组件中,那么通过this.$ref.refname 获取到的是一个组件对象 -->
<!-- ref 如果绑定在普通的dom元素中,那么this.$ref.refname 获取的是一个dom元素 -->
    <div class="wrapper" ref="wrapper">
        <div class="content">
            <slot></slot>
        </div>
    </div>
</template>

<script>

import BScroll from 'better-scroll'
export default {
    name:'Scroll',
    props:{
        probeType:{
           type:Number,
           default:0      
        },
        pullUpLoad:{
            type:Boolean,
            default:false
        }
    },
    data(){
        return {
            scroll:null
            //将scroll实例对象保存在scroll组件中 
        }
    },
    mounted() {
        //1.创建BScroll对象
        this.scroll = new BScroll(this.$refs.wrapper,{
            probeType:this.probeType,
            pullUpLoad: this.pullUpLoad,
            //这里的目的是使组件使用时，自己决定是否监听scroll滚动事件,通过props 让父组件自己绑定probeType并传值
            click:true
        })
        // 监听scroll对象的点击 将position属性通过出发事件 传出去
        this.scroll.on('scroll',(position) => {
            this.$emit('scroll',position)
        }),
        this.scroll.on('pullingUp', () => {
            this.$emit('pullingUp')
        })
    },
    methods:{
        scrollTo(x,y,time=500){
            this.scroll.scrollTo(x,y,time)
        },
        finishPullUp(){
            this.scroll.finishPullUp()
        },
        refresh(){
            this.scroll.refresh()
        }
    }
}
</script>

<style scoped>
    
</style>