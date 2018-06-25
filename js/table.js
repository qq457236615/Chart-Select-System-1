/* 
 * 功能: 生成表格
 * 函数: createTable(dataList)
 * 参数1: dataList--Array-->筛选后的数据
 * 返回: 无
 */
function createTable(dataList){
	// 定义一个空数组存储表格第一列的td
	var firRowTd = [];
	var trOffirRowTd = [];
	// 获得勾选的地区数量
	var regionNum = keyValueObj.region.length;
	// 获得勾选的商品数量
	var productNum = keyValueObj.product.length;
	
	// 获取表格容器
	var table = document.getElementById("table-wrapper");
	/* 先清空当前table */
	table.innerHTML = "";
	
	/* 创建表头 */
	var tableHeadDataList = ["商品", "地区", "1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"];
	// 决定地区列和商品列的显示方式和顺序
	if (regionNum === 1 && productNum > 1){
		tableHeadDataList = ["地区", "商品", "1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"];
	}
	// 表头行
	var trOfHead = document.createElement("tr");
	// 表头单元格
	for (var i = 0; i < tableHeadDataList.length; i++) {
		var th = document.createElement("th");
		th.innerText = tableHeadDataList[i];
		trOfHead.appendChild(th);
	}
	// 将表头行添加进table
	table.appendChild(trOfHead);
	
	/* 遍历数据渲染成剩余表格的行 */
	for (var k = 0; k < dataList.length; k++) {
		// 行
		var trOfData = document.createElement("tr");
		
		// 添加商品名单元格
		var productName = dataList[k].product;
		var tdOfProduct = document.createElement("td");
		tdOfProduct.innerText = productName;
		
		// 添加地区单元格
		var regionName = dataList[k].region;
		var tdOfRegion = document.createElement("td");
		tdOfRegion.innerText = regionName;
		
		// 决定地区列和商品列的显示方式和顺序
		if (regionNum === 1 && productNum > 1){
			// 将第一列单元格添加进firRowTd数组
			firRowTd.push(tdOfRegion);
			trOfData.appendChild(tdOfRegion);
			trOfData.appendChild(tdOfProduct);
			
		}else {
			// 将第一列单元格添加进firRowTd数组
			firRowTd.push(tdOfProduct);
			trOfData.appendChild(tdOfProduct);
			trOfData.appendChild(tdOfRegion);
		}
		
		// 添加月销售额单元格
		var saleList = dataList[k].sale;
		for (var l = 0; l < saleList.length; l++) {
			var tdOfSale = document.createElement("td");
			tdOfSale.innerText = saleList[l];
			trOfData.appendChild(tdOfSale);
		}
		firRowTd.sort(function(a, b){
			var indexa = -1, indexb = -1;
			if (regionArray.indexOf(a.innerText) !== -1) {
				indexa = regionArray.indexOf(a.innerText);
				indexb = regionArray.indexOf(b.innerText);
			}else if (productArray.indexOf(a.innerText) !== -1){
				indexa = productArray.indexOf(a.innerText);
				indexb = productArray.indexOf(b.innerText);
			}
			return indexa - indexb;
		});
		trOffirRowTd.splice(0);
		firRowTd.map(function(el){
			trOffirRowTd.push(el.parentNode);
		});
		// 将数据行添加进table
		trOffirRowTd.map(function(el){
			table.appendChild(el);
		});
	}
	
	// 合并第一列同名单元格
	var noRepeitionFirRowTd = removeRepetition(firRowTd);
	noRepeitionFirRowTd.tdArr.map(function(el, i){
		el.setAttribute("rowspan", noRepeitionFirRowTd.numArr[i]);
	});
}

/*
 * 功能: 去除数组重复元素
 * 函数名: removeRepetition(arr, trArr)
 * 返回值: noRepeitionArr--Array-->去重后的数组
 * 参数1: arr--Array-->需要去重的数组(存的时表格第一列的单元格用来去重,同时会将重复的单元格重数组和DOM元素tr中都删除)
 */
function removeRepetition(arr){
	var num = 0;
	var temp = [];
	var tempNumArr = [];
	var tempHtmlStr = [];
	for (var i = 0; i < arr.length; i++) {
		if (tempHtmlStr.indexOf(arr[i].outerHTML) === -1) {
			tempHtmlStr.push(arr[i].outerHTML);
			temp.push(arr[i]);
		}else {
			arr[i].parentNode.removeChild(arr[i]);
		}
	}
	
	temp.map(function(el){
		num = 0;
		arr.map(function(el2){
			if (el.outerHTML === el2.outerHTML) {
				num++;
			}
		});
		tempNumArr.push(num);
	});
	var noRepeitionArr = {
		tdArr: temp,
		numArr: tempNumArr
	};
	return noRepeitionArr;
}