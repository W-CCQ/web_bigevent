// 使用$.get()  $.post()  $.ajax()d的时候
// 先调用ajaxPrefilter函数
// 拿到给ajax提供的配置对象
$.ajaxPrefilter(function (options) {
    // 在最终发起ajax请求前，统一拼接请求根路径
    options.url = 'http://www.liulongbin.top:3007' + options.url
    console.log(options.url)

    // 统一为有权限的接口，设置 headers 请求头
    if (options.url.indexOf('/my/') !== -1) {
        options.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }       
    // 全局统一挂载complete函数
    options.complete = function(res) {
        let a = res.responseJSON.status
            let b = res.responseJSON.message
            console.log(a)
            console.log(b)

            if(a === 1 && b=="身份认证失败！") {
                // 强制清空
                localStorage.removeItem('token')
                // 强制跳转
                location.href = '/login.html'
                 
            }
    }

})