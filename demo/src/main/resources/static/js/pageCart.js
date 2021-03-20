Date.prototype.Format = function (fmt) {
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "H+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
};
(function(w,d,u){
	var settleAccount = util.get('settleAccount');
	if(!settleAccount){
		return;
	}
	var name = 'products';
	var products = util.getCookie(name);
	var $ = function(id){
		return document.getElementById(id);
	}

	var str = ""

	for(var i = 0; i < products.length; i++){
		str = str +
		"<tr>" +
		"<td>" + products[i].title  + "</td>"+
		"<td>" +
		"<span class=\"lessNum\">"+ "-" + "</span>" +
		"<span class=\"totalNum\" id=\"allNum\">" + products[i].num + "</span>" +
		"<span id=\"thisId\">" + products[i].id + "</span>" +
		"<span class=\"moreNum\">"+ "+" + "</span>" + "</td>" +
		"<td>" + products[i].price + "</td>" +
		"</tr>";
	}

	$("newTable").innerHTML = str;

	window.onload = function(){
		$('newTable').onclick = function(e){
			var e = arguments[0] || window.event;
			target = e.srcElement ? e.srcElement : e.target;
			if(target.nodeName == "SPAN" && target.className == "moreNum"){
				var num = target.parentElement.children[1].textContent;
				var id = target.parentElement.children[2].textContent;
				num ++;
				target.parentElement.children[1].textContent = num;
				util.modifyOne(products,id,num);
			}else if(target.nodeName == "SPAN" && target.className == "lessNum"){
				var num = target.parentElement.children[1].textContent;
				var id = target.parentElement.children[2].textContent;
				num --;
				if(num < 0){
					alert("该商品数量为0");
				}else{
					target.parentElement.children[1].textContent = num;
					util.modifyOne(products,id,num);
				}
			}
			return false;
		};
	};

	var loading = new Loading();
	var layer = new Layer();
	$('Account').onclick = function(e){
		var newProducts = products.map(function(arr){
			return {
			        'goods_id':arr.id,
			        'buy_time': new Date().Format("yyyy-MM-dd HH:mm:ss"),
			        'buy_price':arr.price,
			        'buy_num':arr.num
			       };
		});
		console.log(newProducts);
		var ele = e.target;
			layer.reset({
				content:'确认购买吗？',
				onconfirm:function(){
					layer.hide();
					loading.show();

					var xhr = new XMLHttpRequest();
					var data = JSON.stringify(newProducts);
					xhr.onreadystatechange = function(){
						 if(xhr.readyState == 4){
				                var status = xhr.status;
				                if(status >= 200 && status < 300 || status == 304){
				                	var json = JSON.parse(xhr.responseText);
				                	if(json && json.code == 200){
				                		loading.result('购买成功',function(){
				                		    $('newTable').innerHTML="";
				                		});
				                		sessionStorage.removeItem("records");
				                		sessionStorage.removeItem("goods");
				                		util.deleteCookie(name);
				                	}else{
				                		alert(json.message);
				                	}
				                }else{
				                	loading.result(message||'购买失败');
				                }
				            }
					};
					 xhr.open('post','/api/buy');
					 xhr.setRequestHeader('Content-Type','application/json');
					 xhr.setRequestHeader('Authentication' , sessionStorage.getItem('token'));
					 console.log(data);
					 xhr.send(data);
				}.bind(this)
			}).show();
			return;
	};
	$('back').onclick = function(){
		location.href = document.referrer;
	}
})(window,document);


