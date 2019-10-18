define([
    'require'
], function (require, factory) {
    return {
        init: function () {
            const phpurl = 'http://10.31.155.57/SectionTwo/mayzone/php/';
            $username = $('#username');
            $userpassword = $('#userpassword');
            $red = $('#red');
            $green = $('#green');
            $regist = $('#regist');
            $mobile = $('#mobile');

            var user = 13;
            var repeatlock = true;
            var userlock = true;
            var password = true;
            var textslock = true;
            var yzmlock = true;
            var mobilelock = true;
            $username.blur(function () {
                // 用户名验证
                if ($username.val() !== '') {
                    var reg = /^[a-zA-Z0-9_-]{2,10}$/
                    if (reg.test($username.val())) {
                        user = $username.val();
                        $.ajax({
                            type: 'post',
                            url: phpurl + 'register.php',
                            data: {
                                xingming: $username.val()
                            },
                            async: true,
                            dataType: 'json'
                        }).done(function (res) {
                            if (!res) {//不存在
                                $green.css({ "display": "block" });
                                $red.css({ "display": "none" });
                                repeatlock = true;
                                userlock = true;
                            } else {
                                $green.css({ "display": "none" });
                                $red.html("用户名已经存在");
                                $red.css({ "display": "block" });
                                repeatlock = false;
                            }
                        })
                    } else {
                        $green.css({ "display": "none" });
                        $red.html("用户名应由2-10位中文、英文和数字组成");
                        $red.css({ "display": "block" });
                        userlock = false;
                    }

                } else {

                    $red.html("用户名不能为空");
                    $red.css({ "display": "block" });
                    userlock = false;
                }

            })
            // 密码验证
            $userpassword.on("input", function () {

                $('#red1').css({ "display": "none" });
                // var regnum=/^(\w){6,20}$/;
                var regnum = /[0-9]+/g;  //数字
                var reguppercase = /[A-Z]+/g;  //大写字母
                var reglowercase = /[a-z]+/g;  //小写字母
                var other = /[\W\_]+/g;  //其他字符
                var count = 0;//计算种类
                if (regnum.test($userpassword.val())) {
                    count++;
                }
                if (reguppercase.test($userpassword.val())) {
                    count++;
                }
                if (reglowercase.test($userpassword.val())) {
                    count++;
                }
                if (other.test($userpassword.val())) {
                    count++;
                }
                switch (count) {
                    case 1:
                        $('.register_yz-br').addClass("register_yz-red").removeClass("register_yz-br");
                        break;
                    case 2:
                    case 3:
                        $('.register_yz-by').addClass("register_yz-yellow").removeClass("register_yz-bry");
                        break;
                    case 4:
                        $('.register_yz-bg').addClass("register_yz-green").removeClass("register_yz-bg");

                        break;
                }



            })
            $userpassword.blur(function () {
                if ($userpassword.val() !== '') {
                    if ($userpassword.val().length >= 6 && $userpassword.val().length <= 20) {
                        passlock = true;
                        $('#green1').css({ "display": "block" });
                        $('#red1').css({ "display": "none" });
                    } else {
                        $('#red1').html("6-20位字符，可由英文、数字及标点符号组成");
                        $('#red1').css({ "display": "block" });
                        $('#green1').css({ "display": "none" });
                        passlock = false;
                    }
                } else {
                    $('#red1').html("密码不能为空");
                    $('#green1').css({ "display": "none" });
                    $('#red1').css({ "display": "block" });
                    passlock = false;

                }


            })
            // 重复密码
            $('#texts').blur(function () {
                if ($('#texts').val() !== '') {
                    if ($userpassword.val() == $('#texts').val()) {
                        $('#green2').css({ "display": "block" });
                        $('#red2').css({ "display": "none" });
                        textslock = true;

                    } else {
                        $('#red2').html("两次输入的密码不同，请重新输入");
                        $('#green2').css({ "display": "none" });
                        $('#red2').css({ "display": "block" });
                        textslock = false;

                    }

                } else {
                    $('#red2').html("密码不能为空");
                    $('#green2').css({ "display": "none" });
                    $('#red2').css({ "display": "block" });
                    textslock = false;

                }

            })
            // 验证ma
            var oBtn = document.querySelector('.register_picture')
            var arr = [];
            var yzmstr = '';
            //1.将验证码的数字和字符放入数组
            for (var i = 48; i <= 57; i++) {
                arr.push(String.fromCharCode(i));
            }

            for (var i = 97; i <= 122; i++) {
                arr.push(String.fromCharCode(i));
            }
            function random(min, max) {
                return parseInt(Math.random() * (max - min + 1)) + min;
            }
            oBtn.onclick = function () {

                for (var i = 1; i <= 4; i++) {
                    //var index = parseInt(Math.random() * arr.length);//索引
                    var index = random(0, arr.length - 1);//索引
                    if (index > 9) {//拼接的字符
                        //公平的判断
                        var bstop = Math.random() > 0.5 ? true : false;

                        if (bstop) {
                            yzmstr += arr[index].toUpperCase();//大写
                        } else {
                            yzmstr += arr[index];
                        }
                    } else {//拼接的是数字
                        yzmstr += arr[index];
                    }
                }
                this.innerHTML = yzmstr;
            }

            $('#yzm').blur(function () {
                if ($('#yzm').val() == yzmstr && $('#yzm').val() !== '') {
                    $('#green3').css({ "display": "block" });
                    $('#red3').css({ "display": "none" });
                    yzmlock = true;
                } else {
                    $('#red3').html("图文验证码错误");
                    $('#green3').css({ "display": "none" });
                    $('#red3').css({ "display": "block" });
                    yzmlock = false;
                }


            })

            $regist.on("click", function () {
                console.log(1);
                if (userlock && password && textslock && yzmlock) {
                    // $.ajax({

                    //     type: 'post',
                    //     url: phpurl + 'register.php',
                    //     data: {
                    //         xingming: $username.val(),
                    //         password: $userpassword.val()
                    //     },
                    //     async: true,
                    //     dataType: 'json'
                    // })
                    $('.ulli1').addClass('register_step').siblings('.register_nav li').removeClass('register_step');
                    $('.register_container-box1').addClass('showstep');
                    $('.register_container-box').removeClass('showstep');
                } else {
                    return false;
                }


            });
            $mobile.blur(function () {
                if ($mobile.val() !== '') {
                    var reg = /^1[3578]\d{9}$/;
                    if (reg.test($mobile.val())) {
                        console.log(user);
                        console.log($mobile.val());

                        $('#green4').css({ "display": "block" });
                        $('#red4').css({ "display": "none" });
                        mobilelock = true;


                    } else {
                        $('#red4').html("您输入的手机号格式不正确");
                        $('#green4').css({ "display": "none" });
                        $('#red4').css({ "display": "block" });
                        mobilelock = false;
                    }

                } else {
                    $('#green4').css({ "display": "none" });
                    $('#red4').html("手机号码不能为空");
                    $('#red4').css({ "display": "block" });
                    mobilelock = false;
                }
            })
            $('.register_next1').on("click", function () {
                if (true) {
                    $.ajax({

                        type: 'post',
                        url: phpurl + 'register.php',
                        data: {
                            xingming: $username.val(),
                            password: $userpassword.val(),
                            mobile: $mobile.val()
                        },
                        async: true,
                        dataType: 'json'
                    })
                    // $.ajax({
                    //     type: 'post',
                    //     url: phpurl + 'register1.php',
                    //     data: {
                    //         xingming1: user,
                    //         mobile: $mobile.val()
                    //     },
                    //     async: true,
                    //     dataType: 'json'
                    // });
                    $('.ulli2').addClass('register_step').siblings('.register_nav li').removeClass('register_step');
                    $('.register_container-box2').addClass('showstep');
                    $('.register_container-box1').removeClass('showstep');
                }
            })

        }
    }

});
// (function () {

//     $('').click(function () {
//         console.log($(this).index('.register_nav li'));
//         $(this).addClass('register_step').siblings('.register_nav li').removeClass('register_step');
//         $('.register_container-box').eq($(this).index('.register_nav li')).addClass('showstep').siblings('.register_container-box').removeClass('showstep');
//     });
// })()
