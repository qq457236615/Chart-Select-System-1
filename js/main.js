// 获取所有选择列表的父元素,进行事件委托
var selectWrapper = document.getElementById("select-wrapper");
// 获取表格DOM
var table = document.getElementById("table-wrapper");
// 添加事件监听
selectWrapper.addEventListener("change", showTable);

// 进入页面先初始化一张默认的表格
showTable();

// 渲染一个表格
function showTable(){
	// 获取选择的数据
	var regionSelectData = getSelectedRegion();
	// 渲染成表格
	createTable(regionSelectData);
}

/*
 * 函数名: getSelectedRegion
 * 功能: 获取选择的数据
 * 参数: 无
 * 返回: dataList--Array-->根据用户选择筛选出的数据
*/
function getSelectedRegion(){
		/* 根据所选数据帅选出所需数据 */
		// 取出页面数据
		var regionData = document.getElementById("region-select").value;
		var productData = document.getElementById("product-select").value;
		// 根据选择的数据进行筛选
		// 数组-->存储筛选出的数据
		var dataList = []
		for (var i = 0; i < sourceData.length; i++) {
			if (sourceData[i].region === regionData && sourceData[i].product === productData) {
				dataList.push(sourceData[i]);
			}
		}
		// 返回筛选出的数据数组
		return dataList;
	}

/* 
 * 函数名: createTable
 * 功能: 渲染表格
 * 参数: dataList--Array-->获取的页面选择数据
 * 返回: 无
 */
function createTable(dataList){
	/* 先清空当前table */
	table.innerHTML = "";
	
	/* 创建表头 */
	var tableHeadDataList = ["商品", "地区", "1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"];
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
		trOfData.appendChild(tdOfProduct);
		
		// 添加地区单元格
		var regionName = dataList[k].region;
		var tdOfRegion = document.createElement("td");
		tdOfRegion.innerText = regionName;
		trOfData.appendChild(tdOfRegion);
		
		// 添加月销售额单元格
		var saleList = dataList[k].sale;
		for (var l = 0; l < saleList.length; l++) {
			var tdOfSale = document.createElement("td");
			tdOfSale.innerText = saleList[l];
			trOfData.appendChild(tdOfSale);
		}
		// 将数据行添加进table
		table.appendChild(trOfData);
	}
}