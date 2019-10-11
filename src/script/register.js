(function () {
    const phpurl = 'http://10.31.155.57/SectionTwo/mayzone/php/'
    const $username = $('#username');
    const $userpassword = $('#userpassword');
    const $red = $('#red');
    const $green = $('#green');
    const $regist = $('#regist');
    console.log($username);
    console.log($userpassword);
    console.log($red);
    console.log($green);

    let repeatlock = true;
    $username.blur(function () {
        $.ajax({
            type: 'post',
            url: phpurl + 'register.php',
            data: {
                xingming: $username.val()
            },
            async: true,
            dataType: 'json'
        }).done(function (res) {
            console.log(!res);
            if (!res) {//不存在
                console.log(1);
                $green.css({ "display": "block" });
                $red.css({ "display": "none" });
                repeatlock = true;
            }else{
                $green.css({ "display": "none" });
                $red.css({ "display": "block" });
                repeatlock=false;
            }
        })
    })
    $regist.on("click", function () {
        console.log(1);
        $.ajax({

            type: 'post',
            url: phpurl + 'register.php',
            data: {
                xingming: $username.val(),
                password: $userpassword.val()
            },
            async: true,
            dataType: 'json'
        })
        console.log(2);
    });
})();