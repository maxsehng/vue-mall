<template>
    <div class="bottom-bar">
        <div class="check-content">
        <check-button 
        :is-checked='isSelectAll' 
        class="check-button"
        @click.native='checkClick'
        ></check-button>
        <span>全选</span>
        </div>
        <div class="price">
            合计:{{totalPrice}}
        </div>

        <div class="calc">
            去计算:({{checkedLength}})
        </div>
    </div>

   
</template>

<script>
import CheckButton from 'components/content/checkButton/CheckButton'
export default {
    name:'CartBottonBar',
    components:{
        CheckButton
    },
    computed:{
        totalPrice(){
            return '￥' + this.$store.state.cartList.filter( item =>{
                return item.checked
            }).reduce((preValue, item) =>{
                return preValue + item.price*item.count
            },0).toFixed(2)
        },
        checkedLength(){
            return this.$store.state.cartList.filter(item => item.checked).length
        },
        isSelectAll(){
         if (this.$store.state.cartList.length === 0) return false   
         return   !this.$store.state.cartList.filter(item => !item.checked).length
            // return !this.$store.state.cartList.find(item => !item.checked)
        }
    },
    methods:{
        checkClick(){
            if (this.isSelectAll){
                this.$store.state.cartList.forEach(item => {
                    item.checked = false
                });
            }else{
                this.$store.state.cartList.forEach(item => item.checked = true)
            }
        }
    }
}
</script>

<style scoped>
    .bottom-bar{
        height: 40px;
        background-color: #eeeeee;
        position: relative;
        bottom:40px;
        line-height: 40px;
        display:flex;
        justify-content: space-between;
    }
    .check-content{
        display: flex;
        align-items: center;
        margin-left: 10px;
    }
    .check-button{
        width: 20px;
        height: 20px;
        line-height: 20px;
    }
    .price{
        margin-left:-80px;  
    }
    .calc{
        /* margin-right: 10px; */
        padding: 0 15px;
        background-color: #ff4400;
        color: #ffffff
    }
</style>