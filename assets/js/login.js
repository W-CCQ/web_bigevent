$(function () {
    // 点击去注册的链接
    $('#link_reg').on('click', function () {
        $('.login-box').hide()
        $('.reg-box').show()
    })
    $('#link_login').on('click', function () {
        $('.login-box').show()
        $('.reg-box').hide()
    })
    // $('#user').focus(function () {
    //     $('#a').attr('style', 'color: rgb(48, 153, 172);')
    // })
    // $('#user').blur(function () {
    //     $('#a').attr('style', 'color: black;')
    // })
    // $('#pw').focus(function () {
    //     $('#b').attr('style', 'color: rgb(48, 153, 172);')
    // })
    // $('#pw').blur(function () {
    //     $('#b').attr('style', 'color: black;')
    // })

    // 从layui中获取对象
    let form = layui.form
    let layer = layui.layer
    //通过form.verify()自定义规则
    form.verify({
        // 自定义pwd校验规则
        pwd:[/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        // 校验两次密码是否一致
        repwd:function(value){
            // 通过形参value得到确认密码框内用户输入值
            // 拿到密码框值
            // 等于判断，若失败return
            let pwd = $('.reg-box [name = password]').val()
            if(pwd!==value) {return '两次密码不一致'}
        }
    })
    // 注册表单监听事件
    $('#form_reg').on('submit',function(e){
        e.preventDefault()
        let data = {username:$('#form_reg [name=username]').val(),password:$('#form_reg [name=password]').val()}
        $.post('/api/reguser',data,function(res){
            // console.log(res)
            if(res.status !== 0) {
                // return '注册失败'
               return layer.msg(res.message); 
            }
            layer.msg('注册成功,请登录！');
            // 模拟人的点击行为
            $('#link_login').click()
        })
    })
    // 监听登陆表单的提交事件
    $('#form_login').on('submit',function(e){
        // 阻止默认事件提交
        e.preventDefault()
        $.ajax({
            url:'/api/login',
            method:'POST',
            // 快速获取表单中数据：serialize()
            data:$(this).serialize(),
            success:function(res){
                if(res.status!==0){
                    return layer.msg('登陆失败！')
                }
                layer.msg('登陆成功！')
                // 将登陆成功得到的 token 字符串，保存到localStorage
                localStorage.setItem('token',res.token)
                // console.log(res.token)
                // 跳转到新页面
                location.href='/index.html'
            }
        })
    })
})  