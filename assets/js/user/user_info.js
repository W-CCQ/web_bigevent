$(function () {
    let layer = layui.layer
    // 获取表单
    let form = layui.form
    // 自定义表单验证规则
    form.verify({
        nickname: function (value) {
            if (value.length > 6) {
                return "字符长度必须在1-6个字符之间"
            }
        }
    })
    initUserInfo()
    // 通过AJAX获取用户信息,初始化基本信息
    function initUserInfo() {
        $.ajax({
            method: 'GET',
            url: '/my/userinfo',
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('获取用户信息失败')
                }
                // console.log(res)
                // 调用取值函数（快速为表单赋值）    参数一：要存放的位置  参数二：所要取得值
                form.val('formUserInfo', res.data);
            }
        })
    }
    // 重置表单数据
    $('#btnReset').on('click',function(e){
        // 阻止表单的默认重置行为
        e.preventDefault()
        // 将用户信息重新填入到表单中
        initUserInfo()
    })
    // 更新用户基本资料（绑定监听表单d的提交事件）
    $('.layui-form').on('submit',function(e){
        // 阻止默认提交
        e.preventDefault()
        // 发起ajax请求
        $.ajax({
            method:'POST',
            url:'/my/userinfo',
            // 快速获取表单元素
            data:$(this).serialize(),
            success:function(res){
                if(res.status !== 0){
                    return layer.msg('用户信息更新失败')
                }
                layer.msg('更新信息成功')
                // 调用父页面中的方法，重新渲染用户的头像和用户的信息
                window.parent.getUserInfo()
            }
        })
    })
})
