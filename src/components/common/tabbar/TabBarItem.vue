<template>
    <div class="tab-bar-item" @click='itemClick'>
        <div v-if="!isActive">
            <slot  name="item-icon"></slot>
        </div>
        <div v-else>
            <slot name="item-icon-active"></slot>
        </div>
        <div :style="activeStyle" >
            <slot  name="item-text"></slot>
        </div>
    </div>
</template>

    <script>


export default {
    name:'TabBarItem',
    props:{
        path:String,
        activeColor:{
            type:String,
            default:'red'
        }
    },
    data(){
        return {
            // isActive:false
        }
    },
    computed:{
        isActive(){
            return this.$route.path.indexOf(this.path) !== -1
            //当$route.path里面包含this.path时!==-1  不包含时等于-1
        },
        activeStyle(){
            return this.isActive ? {color:this.activeColor} : {}
        }
    },
    methods:{
        itemClick(){
             this.$router.push(this.path)
             //对组件进行监听点击，然后通过父组件传参的方式将path传给子组件
        }
    }
}
</script>

<style scoped>
.tab-bar-item{
    flex:1;
    text-align: center;
    height: 49px;
    font-size: 14px;
  }

.tab-bar-item img{
    width:24px;
    height: 24px;
    margin-top: 3px;
    vertical-align: middle;
    /* 消除图片间隔 */
}
.active{
    color:red;
}
</style>