var username = sessionStorage.getItem("username");
var role = sessionStorage.getItem("role");
var token = sessionStorage.getItem("token");
var $ = function(id){
    return document.getElementById(id);
};

//初始化
(function() {
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

//根据后台数据初始化页面商品内容
function initContent(goods) {
    var plist = "";
    for(let i in goods) {
        plist += "<li id='"+goods[i].id+"'>"
                 +"<a href='show?id="+goods[i].id+"' class='link'>"
                 +"<div class='img'><img src='"+goods[i].image+"' alt='"+goods[i].title+"'></div>"
                 +"<h3>"+goods[i].title+"</h3>"
                 +"<div class='price'><span class='v-unit'>¥</span><span class='v-value'>"+goods[i].price+"</span>"
                 +"<span class='v-unit' style='float:right'>销量："+goods[i].sell_num+"</span></div>"
                 +"</a></li>";
    }
    $('plist').innerHTML = plist;
}

//初始化买家页面
function initBuyerPage(goods) {
    initContent(goods);
    $('content').innerHTML += "<li class='z-sel' >"
                    	      +"<a id='filter' href='javascript:void(0)'>"
                    	      +"未购买的内容</a></li>";
    var records = sessionStorage.getItem("records");
    if (records == null) {
        getRecords(tagGoods);
    } else {
        tagGoods(JSON.parse(records));
    }
    function tagGoods(records) {
        var idSet = new Set();
        records.forEach(item => idSet.add(item.goods_id));
        for(let i in goods) {
            if(idSet.has(parseInt(i))) {
                var div = document.createElement("div");
                div.className= "label";
                div.innerHTML = "已购买";
                $(i).firstChild.firstChild.appendChild(div);
            }
        }
       $('filter').onclick = function (){
            for(let i in goods) {
                if(idSet.has(parseInt(i))) {
                    $(i).remove();
                }
            }
       }
    }
}

function initSellerPage(goods) {
    initContent(goods);
    $('content').innerHTML += "<li class='z-sel' >"
        	                  +"<a id='filter' href='javascript:void(0)'>"
        	                  +"未出售的内容</a></li>";
    for(let i in goods) {
        if(goods[i].sell_num>0) {
            var div = document.createElement("div");
            div.className= "label";
            div.innerHTML = "已售出";
            $(i).firstChild.firstChild.appendChild(div);
        } else {
            var span = document.createElement("span");
            span.className = "u-btn u-btn-normal u-btn-xs del";
            span.setAttribute('data-del', goods[i].id);
            span.innerHTML = "删除";
            $(i).appendChild(span);
        }
    }

    $('filter').onclick = function (){
        for(let i in goods) {
            if(goods[i].sell_num>0) {
                $(goods[i].id).remove();
        	}
        }
    }
}
(function(w,d,u){
	var plist = util.get('plist');
	if(!plist){
		return;
	}
	var layer = new Layer();
	var loading = new Loading();
	var page = {
		init:function(){
			plist.addEventListener('click',function(e){
				var ele = e.target;
				var delId = ele.dataset && ele.dataset.del;
				if(delId){
					this.ondel(delId);
					return;
				}
			}.bind(this),false);
		},
		ondel:function(id){
			layer.reset({
				content:'确定要删除该内容吗？',
				onconfirm:function(){
					layer.hide();
					loading.show();
					ajax({
						url:'/api/delete',
						headers: {
                            "Authentication" : token
                        },
						data:{id:id},
						success:function(json){
							this.delItemNode(id);
							sessionStorage.removeItem("goods");
							loading.result('删除成功');
						}.bind(this)
					});
				}.bind(this)
			}).show();
		},
		delItemNode:function(id){
		    $(id).remove();
		}
	};
	page.init();
})(window,document);


