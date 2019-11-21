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
    data(){
        return {
            scroll:null
        }
    },
    mounted() {
        this.scroll = new BScroll(this.$refs.wrapper,{
            probeType:3,
            click:true
        })
    },
    methods:{
        scrollTo(x,y,time=500){
            this.scroll.scrollTo(x,y,time)
        }
    }
}
</script>

<style scoped>
    
</style>