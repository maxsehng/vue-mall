import BackTop from 'components/content/backTop/BackTop'
export const backTopMixin = {
    //创建一个混入对象
    component:{
        BackTop
        //注册需要用到的组件
    },
    data(){
        return{
            isShowBackTop:false
            //需要用到的属性
        }
    },
    methods:{
        //需要用到的方法
        backClick(){
            this.$refs.scroll.scrollTo(0,0)
            //$refs.scroll 代表的是 scroll这个组件对象,拿到他后就可以调用组件对象里面的数据或者方法
        },
        listenShowBackTop(position){
            this.isShowBackTop = ( -position.y) > 1000
        }
    }
}