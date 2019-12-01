<template>
    <nav-bar>
        <div slot="left" class="back" @click="backClick">
            <img src="~assets/img/common/back.svg" alt="">
        </div>
            <div slot="center" class="title">
                <div v-for="(item , index) in titles" 
                class="title-item"
                :class="{active: index === currentIndex}"
                @click="titleClick(index)"
                >
                {{ item }}
                </div>
            </div>
    </nav-bar>
</template>

<script>
import NavBar from 'components/common/NavBar/NavBar'

export default {
    name:'DetailNavBar',
    components:{
        NavBar
    },
    data(){
        return {
            titles:['商品','参数','评论','推荐'],
            currentIndex: 0
        }
    },
    methods:{
        titleClick(index){
            this.currentIndex = index;
            this.$emit('titleClick',index)
        },
        backClick(){
            this.$router.go(-1)
            //调用$router的back()方法 返回上一次历史记录
        }
    }
}
</script>

<style scoped>
    .title{
        display: flex;
        font-size: 10px;
    }
    .title-item{
        flex: 1;
    }
    .active{
        color: var(--color-high-text)
    }
    .back{
        margin-top: 7px;
    }
</style>