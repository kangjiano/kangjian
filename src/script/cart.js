define(['jquery'], function () {
    return {
        init: function () {
            const wrap = document.querySelector('.detail_main');
            const list = document.querySelector('tbody');
            const konglist = document.querySelector('.ncc-null-shopping');
            const phpurl = 'http://10.31.155.57/SectionTwo/mayzone/php/';
            let heji = 0;
            //商品列表的拼接。
            function goodslist(sid, num) {//sid:商品的编号，num:商品的数量
                $.ajax({
                    url: phpurl + 'goodlist.php',
                    dataType: 'json'
                }).done(function (datalist) {
                    let strhtml = '';
                    for (let i = 0; i < datalist.length; i++) {
                        if (datalist[i].sid === sid) {
                            console.log(datalist[i]);
                            let zong = 0;
                            zong = num * datalist[i].price;
                            heji = heji + zong;

                            strhtml += `
                    <tr id="cart_item_106392" nc_group="106392" class="shop-list ">
                        <td>
                            <input type="checkbox" checked="" nc_type="eachGoodsCheckBox" value="106392|1"
                                id="cart_id106392" name="cart_id[]">
                        </td>
                        <td class="w60">
                            <a href="#" target="_blank" class="detail_goods-thumb">
                                <img src="${datalist[i].url} style="width=60px;""
                                    alt="${datalist[i].listtitle}"></a>
                        </td>
                        <td class="tl">
                            <dl class="detail_goods-info">
                                <dt>
                                    <a href="http://www.mayzone360.com/shop/item-4071.html"
                                        target="_blank">${datalist[i].listtitle}</a></dt>
                            </dl>
                        </td>
                        <td class="w120">
                            <em id="item106392_price">${datalist[i].price}</em>
                        </td>
                        <td class="w120 ws0">
                            <a title="减少商品件数"
                                class="add-substract-key tip" id="decrease">-</a>
                            <input id="input_item_106392" value="${num}" orig="1" changed="1"
                                 type="text" class="text w20">
                            <a title="增加商品件数"
                                class="add-substract-key tip" id="increase">+</a>
                        </td>
                        <td class="w120">
                            <em id="item106392_subtotal" nc_type="eachGoodsTotal">${zong}</em>
                        </td>
                        <td class="w80"> <a href="javascript:void(0)" onclick="collect_goods('4071');">收藏</a><br>
                            <a href="javascript:void(0)" onclick="drop_cart_item(106392);">删除</a>
                        </td>
                    </tr> 
                    `



                        }

                    }
                    list.innerHTML += strhtml;
                    // }).done(function () {
                    var increase = $('#content .w120 #increase');
                    const decrease = $('#content .w120 #decrease');
                    const zonghe = $('#content #item106392_subtotal');
                    const price = $('#content #item106392_price');
                    const number = $('#content #input_item_106392');
                    const szongjia = $('.eachStoreTotal');
                    const bzongjia = $('#cartTotal')
                    let numz = 0;
                    szongjia.html(Number(zonghe.html()));
                    bzongjia.html(szongjia.html());
                    $.each(increase, function (index, value) {
                        $(value).on("click", function () {

                            numz = Number(number.eq(index).val());
                            numz += 1;
                            number.eq(index).val(numz);
                         
                            zonghe.eq(index).html((numz * Number(price.eq(index).html())).toFixed(2));
                            szongjia.html((Number(price.eq(index).html()) + Number(szongjia.html())).toFixed(2));
                            bzongjia.html(szongjia.html());
                        })

                    })
                    szongjia.html(heji.toFixed(2));
                    bzongjia.html(heji.toFixed(2));
                    



                    $.each(decrease, function (index, value) {
                        $(value).on("click", function () {

                            numz = Number(number.eq(index).val());
                            numz -= 1;
                            number.eq(index).val(numz);
                            console.log(zonghe.eq(index).html())
                            console.log(zonghe.html())
                            console.log(szongjia[0])
                            zonghe.eq(index).html((Number(number.eq(index).val()) * Number(price.eq(index).html())).toFixed(2));
                            szongjia.html((Number(szongjia.html()) - Number(price.eq(index).html())).toFixed(2));
                            bzongjia.html(szongjia.html());
                        })


                    })
                    // $('tbody').on("click","#increase",function(){
                    //     numz = Number($('#input_item_106392').val());
                    //     numz += 1;
                    //     $('#input_item_106392').val(numz);
                    // })

                });
            }



            //获取对应的cookie转换成数组。
            if (getcookie('cookiesid') !== '') {

                wrap.style.display = 'block';
                konglist.style.display = 'none';
                let arrsid = getcookie('cookiesid').split(',');
                let arrnum = getcookie('cookienum').split(',');
                for (let i = 0; i < arrsid.length; i++) {
                    goodslist(arrsid[i], arrnum[i]);
                }
            } else {
                wrap.style.display = 'none';
                konglist.style.display = 'block';
            }


            function getcookie(key) {
                var arr = document.cookie.split('; ');
                for (var i = 0; i < arr.length; i++) {
                    var newarr = arr[i].split('=');
                    if (newarr[0] === key) {
                        return newarr[1];
                    }
                }
            }
        }
    }
})






