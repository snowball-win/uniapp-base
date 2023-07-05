// 过滤更新状态
export const filtersUpdateStatus = (val: string) => {
    let text:string = ''
    switch  (val) {
        case '0':
        text = '预告'
        break
        case '1':
        text = '更新中'
        break
        case '2':
        text = '已完成'
        break
    }
    return text
}