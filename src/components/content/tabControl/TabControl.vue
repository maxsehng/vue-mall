<template>
    <div class="tab-control">
        <div v-for="(item , index) in titles" 
        class="tab-control-item" :class="{active: index === currentIndex}" 
        @click='itemClick(index)'
        >
            <span>{{ item }}</span>
        </div>
    </div>
</template>

<script>
export default {
    name:'TabControl',
        props:{
        titles:{
            type:Array,
            default(){
                return []
            }
            //对象数组 默认值都必须写成一个函数
        }
    },
    data(){
        return {
            currentIndex:0
        }
    },
    methods:{
        itemClick(index){
            this.currentIndex = index;
            this.$emit('tabClick',index)
        }
    }
}
</script>

<style scope>
    .tab-control{
        display: flex;
        text-align: center;
        font-size: 15px;
    }
    
    .tab-control-item{
        flex:1;
        height: 44px;
        line-height: 44px;
    }

    .active{
        color: var(--color-high-text);
       
    }
    .tab-control-item span{
        padding:5px;
    }

    .active span{
         
         border-bottom: 3px solid var(--color-tint);
    }
</style>