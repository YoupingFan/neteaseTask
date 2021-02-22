var username = sessionStorage.getItem("username");
var token = sessionStorage.getItem("token");

(function() {
    ajax({
        type : "POST",
        url : '/api/validateToken',
        data : {
            "token" : token
        },
        success : function(result){
            if(username=="buyer") {
                initBuyerHead();
            } else {
                initSellerHead();
            }

        },
        error : function(message) {
            initHead();
        }
    });
})();

function initHead() {
    document.getElementById('headLeft').innerHTML = "请[登录]";
    document.getElementById('headRight').innerHTML = "<li><a href='/'>首页</a></li>";
}

function initBuyerHead() {
    if(username != null && token != null) {
        var headRight = "<li><a href='/'>首页</a></li>"
                       + "<li><a href='/shop'>购物车</a></li>"
                       + "<li><a href='/money'>财务</a></li>"
                       + "<li><a href='/logout'>退出</a></li>";
        document.getElementById('headLeft').innerHTML ="欢迎 "+username;
        document.getElementById('headRight').innerHTML = headRight;
    }
}
function initSellerHead() {
    if(username != null && token != null) {
        var headRight = "<li><a href='/'>首页</a></li>"
                       + "<li><a href='/shop'>发布</a></li>"
                       + "<li><a href='/logout'>退出</a></li>";
        document.getElementById('headLeft').innerHTML ="欢迎 "+username;
        document.getElementById('headRight').innerHTML = headRight;
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
						data:{id:id},
						success:function(json){
							this.delItemNode(id);
							loading.result('删除成功');
						}.bind(this)
					});
				}.bind(this)
			}).show();
		},
		delItemNode:function(id){
			var item = util.get('p-'+id);
			if(item && item.parentNode){
				item.parentNode.removeChild(item);
			}
		}
	};
	page.init();
})(window,document);