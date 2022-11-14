$(function () {
    getUserInfo()

    // 实现退出功能
    let layer = layui.layer
    $('#btnLogout').on('click', function () {
        // console.log('ok')
        layer.confirm('是否确定退出系统？', { icon: 3, title: '提示' }, function (index) {
            // 清空本地存储中的token
            localStorage.removeItem('token')
            // 重新跳转到登陆界面
            location.href = '/login.html'
            // 关闭弹出层
            layer.close(index);
        });
    })
    // 调用用户信息
    function getUserInfo() {
        $.ajax({
            method: 'GET',
            url: '/my/userinfo',
            //请求头
            // headers: {
            //     Authorization: localStorage.getItem('token') || ''
            // },
            success: function (res) {
                console.log(res.data.nickname)
                if (res.status !== 0) {
                    return layui.layer.msg('获取用户信息失败')
                }
                renderAvatar(res.data)

            },
            complete: function (res) {
                // let a = res.responseJSON.status
                // let b = res.responseJSON.message
                // // console.log(a)
                // // console.log(b)

                // if(a === 1) {
                //     // 强制清空
                //     localStorage.removeItem('token')
                //     // 强制跳转
                //     location.href = '/login.html'

                // }
                // console.log('11111')


            }
        })
    }
    // 渲染用户头像
    function renderAvatar(user) {
        console.log(user.nickname)
        // 获取用户名字
        let name = user.nickname || user.username
        // 设置欢迎文本
        $('#welcome').html('欢迎&nbsp;&nbsp;' + name)
        // 按需渲染用户头像
        if (user.user_pic !== null) {
            // 渲染图片头像
            $('.layui-nav-img').attr('src', user.user_pic).show()
            $('.text_avatar').hide()
        } else {
            // 渲染文本头像
            $('.layui-nav-img').hide()
            let first = name[0].toUpperCase()
            $('.text-avatar').html(first).show()
        }
    }
})   