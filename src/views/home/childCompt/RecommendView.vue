<template>
    <div class="recommend">
        <div v-for='item in recommends' class="recommend-item">
            <a :href="item.link">
                <img :src="item.image" alt="">
                <div>{{item.title}}</div>
            </a>
        </div>
    </div>
</template>

<script>
export default {
    name:'RecommendView',
    props:{
        recommends:{
            type:Array,
            defalult(){
                return []
            }
        }
    }
}
</script>

<style  scoped>
    .recommend{
        display:flex;
        text-align: center;
        width: 100%;
        border-bottom: 10px solid #eeeeee;
        padding: 15px 0 10px;
    }
    .recommend-item{
        flex:1;
        font-size: 8px;
        cursor: pointer;
    }
    .recommend-item img{
        height: 65px;
        width: 65px;
        margin-bottom: 3px;
    }
</style>