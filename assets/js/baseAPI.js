// 使用$.get()  $.post()  $.ajax()d的时候
// 先调用ajaxPrefilter函数
// 拿到给ajax提供的配置对象
$.ajaxPrefilter(function(options){ 
    // 在最终发起ajax请求前，统一拼接请求根路径
    options.url = 'http://www.liulongbin.top:3007' + options.url
    console.log(options.url)
})