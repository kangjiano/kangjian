define(['require','jqcookie'], function() {
   return{
    init:function(){
        const phpurl = 'http://10.31.155.57/SectionTwo/mayzone/php/';

    console.log($('#submit'));
    $('#submit').on("click", function () {
        $.ajax({
            type: 'post',
            url: phpurl + 'login.php',
            data: {
                xingming: $('#user_name').val(),
                password: $('#password').val()
            },
            async: true,
            dataType: 'json'
        }).done(function (res) {
            if (res) {
                //存储用户信息
                location.href='Qindex.html';
                $.cookie('xingming',$('#user_name').val());
            }else{
                alert('用户名或者密码错误');
            }
        })
    })
    }
   }
    
});
