import {request} from './request'

export function getDetail(iid){
    return request({
        url:'./detail',
        params:{
            iid
        }
    })
}


//由于数据结构比较复杂 我们只需要将我们需要的数据封装至一个构造函数中，到时候
//直接将该构造函数创建的对象传入即可
export class Goods {
    constructor(itemInfo, columns, services){
        this.title = itemInfo.title
        this.desc = itemInfo.desc
        this.newPrice = itemInfo.price
        this.oldPrice = itemInfo.oldPrice
        this.discount = itemInfo.discountDesc
        this.columns = columns
        this.services = services
        this.realPrice = itemInfo.lowNowPrice
    }
}

export class Shop{
    constructor(shopInfo){
        this.logo = shopInfo.shopLogo
        this.name = shopInfo.name
        this.fans = shopInfo.cFans
        this.sells = shopInfo.cSells
        this.score = shopInfo.score
        this.goodsCount = shopInfo.cGoods

    }
}

// const g = new GoodsInfo()