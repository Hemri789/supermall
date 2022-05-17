import { request } from "./request"
export function getDetail(iid) {
    return request({
        url: '/detail',
        params: {
            iid
        }
    })
}
//商品基本信息
export class Goods {
    constructor(itemInfo, columns, shopInfo) {
        this.title = itemInfo.title
        this.price = itemInfo.price
        this.oldPrice = itemInfo.oldPrice
        this.discountBgColor = itemInfo.discountBgColor
        this.discountDesc = itemInfo.discountDesc
        this.columns = columns
        this.services = shopInfo.services
    }
}

//商铺信息
export class Shops {
    constructor(shopInfo) {
        this.logo = shopInfo.shopLogo
        this.name = shopInfo.name
        this.fans = shopInfo.cFans
        this.score = shopInfo.score
        this.sells = shopInfo.cSells
        this.cGoods = shopInfo.cGoods
    }
}