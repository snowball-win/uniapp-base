/**
 * uni-request请求封装
 * 1. 统一配置接口地址
 * 2. 统一设置超时时间/报文格式/报文加密
 * 3. 统一身份认证
 * 4. 统一处理登录超时/接口异常提示
 * 5. 统一返回接口格式
 */

import Mock from 'mockjs'

type responseType = {
    code: number
    success: boolean
    msg: string
    result: any
}
// console.log('18env', import.meta.env)
const request = (config: UniApp.RequestOptions) => {
    let url: string
    if (/^(http|https):\/\/.*/.test(config.url)) { // h5本地开发
        console.log('22')
        // 如果是以http/https开头的则不添加VITE_REQUEST_BASE_URL
        url = config.url
        // eslint-disable-next-line no-underscore-dangle
    } else if (Mock._mocked[import.meta.env.VITE_REQUEST_BASE_URL + config.url]) { // mock开发
        console.log('27')
        // 如果是mock数据也不添加VITE_REQUEST_BASE_URL,Mock._mocked上记录有所有已设置的mock规则
        url = import.meta.env.VITE_REQUEST_BASE_URL + config.url
    } else { // 微信小程序
        console.log('31', import.meta.env)
        /**
         * 开启mock时需要去掉mock路径,不能影响正常接口了。
         * 如果碰巧你接口是 /api/mock/xxx这种,那VITE_REQUEST_BASE_URL就配置/api/mock/mock吧
         */
        // url = import.meta.env.VITE_REQUEST_BASE_URL.replace(/\/mock$/, '') + config.url
        // 小程序使用这样的路径，否则请求报错，调试中
        url = import.meta.env.VITE_SERVER_NAME + import.meta.env.VITE_REQUEST_BASE_URL.replace(/\/mock$/, '') + config.url
    }

    return new Promise<responseType>((resolve, reject) => {
        uni.request({
            ...config,
            url,
            /** 统一设置超时时间 */
            timeout: config.timeout || 60000,
            header: {
                ...config.header,
                /** 统一报文格式 */
                'Content-Type': 'application/json;charset=UTF-8',
                /** 统一身份认证 */
                // Authorization: wx.getStorageSync('token'),
                sdpToken: wx.getStorageSync('token'),
            },
            success(res) {
                // 200状态码表示成功
                if (res.statusCode === 200) {
                    resolve(res.data as any)
                    return
                }
                /**
                 * 这里可以做一些登录超时/接口异常提示等处理
                 */
                reject(res.data)
            },
            fail(result) {
                reject(result)
            }
        })
    })
}

export default {
    /**
     * get请求
     * @param url 请求地址
     * @param data 请求的参数
     * @param options 其他请求配置
     */
    get: (url: string, data?: UniApp.RequestOptions['data'], options?: UniApp.RequestOptions) => {
        return request({
            ...options,
            url,
            data,
            method: 'GET'
        })
    },
    /**
     * post请求
     * @param url 请求地址
     * @param data 请求的参数
     * @param options 其他请求配置
     */
    post: (url: string, data?: UniApp.RequestOptions['data'], options?: UniApp.RequestOptions) => {
        return request({
            ...options,
            url,
            data,
            method: 'POST'
        })
    }
}
