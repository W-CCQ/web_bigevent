$(function () {
    let layer = layui.layer
    let form = layui.form
    // 表单验证规则
    form.verify({
        // 长度
        pwd: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        samePwd:function(value){
            if(value === $('[name=oldPwd]').val()) {
                return '原始密码与新密码不能相同'
            }       
         },
         rePwd:function(value){
            if(value !== $('[name=newPwd]').val()) {
                return '两次密码不一致'
            }
         }
    })

    $('.layui-form').on('submit',function(e){
        // 阻止默认事件提交
        e.preventDefault()
        $.ajax({
            method:'POST',
            url:'/my/updatepwd',
            // 快速获取数据
            data:$(this).serialize(),
            success:function(res){
                if(res.status !== 0) {
                    return layer.msg('更新密码失败！')
                }
                // console.log(res)
                layer.msg('更新密码成功！')
                // 重置表单(将JQ转换成DOM，使用原生DOM再调用form表单的reset（）方法)
                $('.layui-form')[0].reset()
            }
        })
    })
})