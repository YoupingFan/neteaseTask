var records = sessionStorage.getItem("records");
var goods = sessionStorage.getItem("goods");
var $ = function(id){
    return document.getElementById(id);
};

if(records!=null && goods!=null) {
    initPage(JSON.parse(goods), JSON.parse(records))
} else if(records==null && goods!=null) {
    getRecords(function(records) {
        initPage(JSON.parse(goods), records);
    });
} else if(records!=null && goods==null) {
    getGoods(function (goods) {
        initPage(goods, JSON.parse(records));
    });
} else {
    getGoods(function (goods) {
        getRecords(function (records) {
            initPage(goods, records);
        });
    });
}

function initPage(goods, records) {
    var table = $("table");
    var str = "";
    var sum = 0.0;
    records.forEach(function (item) {
        str += "<tr>"
               +"<td><a href='/show?id="+item.goods_id+"'><img src="+goods[item.goods_id].image+" alt=''></a></td>"
               +"<td><h4><a href='/show?id="+item.goods_id+"'>"+goods[item.goods_id].title+"</a></h4></td>"
               +"<td><span class='v-time'>"+item.buy_time+"</span></td>"
               +"<td><span class='v-num'>"+item.buy_num+"</span></td>"
               +"<td><span class='v-unit'>¥</span><span class='value'>"+item.buy_price+"</span></td>"
               "</tr>";
        sum += item.buy_num * item.buy_price;
    });
    $("table").innerHTML = str;
    $("total_price").innerHTML = sum.toFixed(2);
}
