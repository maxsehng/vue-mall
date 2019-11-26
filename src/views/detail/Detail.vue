<template>
    <div id="detail">
        <!-- 导航栏 -->
        <detail-nav-bar></detail-nav-bar>
    </div> 
</template>

<script>
import DetailNavBar  from './childComps/DetailNavBar'
export default {
    name:'Detail',
    components:{
        DetailNavBar
    },
    data(){
        return {
            iid: null
        }
    },
    created() {
        this.iid = this.$route.params.iid
        // 将从GoodsListItem组件中的iid拿过来存到本组件的data中
        
    }
}
</script>

<style scoped>
    
</style>