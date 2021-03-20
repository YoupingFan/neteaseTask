var token = sessionStorage.getItem("token");
var username = sessionStorage.getItem("username");
var role = sessionStorage.getItem("role");
var goodsId = location.search.split('=')[1];

var $ = function(id){
    return document.getElementById(id);
};

(function () {
    var goods = sessionStorage.getItem("goods");
    if (goods == null) {
        getGoods(initPage);
    } else {
        initPage(JSON.parse(goods));
    }
    function initPage(goods){
        if(token!=null && username!=null && role!=null) {
            if(role=="buyer") {
               initBuyerPage(goods);
            } else {
               initSellerPage(goods);
            }
        } else{
            initContent(goods);
        }
    }
})();

function initContent(goods) {
    $("g-img").innerHTML = "<img src='"+goods[goodsId].image+"' alt='' >";
    $("g-title").innerHTML = goods[goodsId].title;
    $("g-abstract").innerHTML = goods[goodsId].goods_abstract;
    $("g-price").innerHTML = "<span class='v-unit'>¥</span><span class='v-value'>"+goods[goodsId].price+"</span>";
    $("g-text").innerHTML = goods[goodsId].text
}

function initBuyerPage(goods) {
    initContent(goods);
    var records = sessionStorage.getItem("records");
    if(records==null) {
        getRecords(handle);
    } else {
        handle(JSON.parse(records));
    }
    function handle(records) {
        var keyPrice = {}
        records.forEach(item => keyPrice[item.goods_id.toString()]=item.buy_price)
        if (keyPrice.hasOwnProperty(goodsId)) {
            $("g-bnt").innerHTML = "<span class='u-btn u-btn-primary z-dis'>已购买</span>"
                                   +"<span class='buyprice'>当时购买价格：¥"+keyPrice[goodsId]+"</span>";

        } else {
            $("g-bnt").innerHTML = "<button class='u-btn u-btn-primary' id='add'>加入购物车</button>";
            var loading = new Loading();
            var layer = new Layer();
            $('add').onclick = function(e){
                var num = $('allNum').innerHTML;
                var productDetail = { 'id': goodsId,
                                       'price':goods[goodsId].price,
                                       'title':goods[goodsId].title,
                                       'num': parseInt(num)
                                     };
                var name = 'products';
                products = util.getCookie(name) || [];
                var exit = false;
                for(i=0; i<products.length; i++) {
                    if(products[i].id == goodsId) {
                        products[i].num = products[i].num + productDetail.num;
                        util.setCookie(name, products);
                        exit = true;
                    }
                }
                if (!exit) {
                    products.push(productDetail);
                    util.setCookie(name, products);
                }
                layer.reset({
                    content:'确认加入购物车吗？',
                    onconfirm:function(){
                        layer.hide();
                        loading.show();
                        loading.result('添加购物车成功');
                    }.bind(this)
                }).show();
                return;
            };
        }
    }
}


function initSellerPage(goods) {
    initContent(goods);
    $("g-bnt").innerHTML = "<button class='u-btn u-btn-primary' id='edit'>编辑</button>";
    $("edit").onclick = function (e) {
        location.href = "/edit?id="+goodsId;
    }
}

$('plusNum').onclick = function(e){
    e = window.event || e;
	o = e.srcElement || e.target;
	var num = $('allNum').textContent;
	if(num > 0){
		num --;
		$('allNum').innerHTML = num;
	}else{
		 alert("您没有购买任何商品");
	}
};

$('addNum').onclick = function(e){
	e = window.event || e;
	o = e.srcElement || e.target;
	var num = $('allNum').textContent;
	num ++;
	$('allNum').innerHTML = num;
};




