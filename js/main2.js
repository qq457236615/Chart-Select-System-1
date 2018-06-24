/* 生成地区选项卡 */
// 1: 获取容器
var regionCheckboxWrapper = document.getElementById("region-checkbox-wrapper");
// 2: 获取地区数据
var regionArray = ["华东", "华北", "华南"];
// 3: 生成选项卡
createCheckboxs(regionCheckboxWrapper, regionArray, "region");

/* 生成产品选项卡 */
// 1: 获取容器
var regionCheckboxWrapper = document.getElementById("product-checkbox-wrapper");
// 2: 获取产品数据
var productArray = ["手机", "笔记本", "智能音箱"];
// 3: 生成选项卡
createCheckboxs(regionCheckboxWrapper, productArray, "product");

// - 定义一个对象存储所有选项checkbox的键值对name: value
var keyValueObj = {
	region: [], // 地区名
	product: [] // 产品名
};

/*
 * 功能: 生成一组选项卡 
 * 函数名: createCheckboxs(wrapper, dataArray)
 * 参数1: wrapper-->checkbox的父容器
 * 参数2: dataArray-->用于生成checkbox内容的数据数组
 * 参数3: name-->选项卡的共同name
 */
function createCheckboxs(wrapper, dataArray, name){
	// 1: 生成选项卡
	// 定义数组存储所有子选项卡
	var childCheckboxArr = [];
	/* 先生成全选 */
	var allLabel = document.createElement("label");
	var allCheckbox = document.createElement("input");
	allCheckbox.setAttribute("type", "checkbox");
	// 设置自定义属性all,表示全选
	allCheckbox.setAttribute("checkbox-type", "all");
	// 创建文本节点
	var contentAll = document.createTextNode("全选");
	// 添加各节点
	allLabel.appendChild(allCheckbox);
	allLabel.appendChild(contentAll);
	
	/* 在生成子选项 */
	for (var i = 0; i < dataArray.length; i++) {
		var childLabel = document.createElement("label");
		var childCheckbox = document.createElement("input");
		childCheckbox.setAttribute("type", "checkbox");
		childCheckbox.name = name;
		// 设置自定义属性child,表示子选项
		childCheckbox.setAttribute("checkbox-type", "child");
		childCheckbox.value = dataArray[i];
		// 添加checkbox
		childLabel.appendChild(childCheckbox);
		// 创建文本节点
		var content = document.createTextNode(dataArray[i]);
		// 添加文本节点
		childLabel.appendChild(content);
		// 将checkbox保存到数组中
		childCheckboxArr.push(childCheckbox);
		// 先添加子选项到容器
		wrapper.appendChild(childLabel);
	}
	
	// 最后添加全选按钮到容器中
	wrapper.appendChild(allLabel);
    // 2: 添加事件监听(事件委托)
    wrapper.addEventListener("change", function(e){
    	var target = e.target || window.srcElement;
    	var selfType = target.getAttribute("checkbox-type");
    	if (selfType === "child") {
			// 点击子选项时实时同步全选checkbox的状态
    		allCheckbox.checked = getFlagOfAllChecked(childCheckboxArr);
    		// 如果是子选项
    		var flag = target.checked;
    		// 被选中时触发事件
			var name = target.name;
			var value = target.value;
			if (flag) {
    			// - 如果勾选了则将value存入keyValueObj对应选项(地区region或产品product)中
				keyValueObj[name].push(value);
    		}else {
				// - 如果取消勾选则删除keyValueObj中的对应选选个的值
				var delIndex = keyValueObj[name].indexOf(value);
				keyValueObj[name].splice(delIndex, 1);
			}
			// 1: 获得数据
				// - 参数1: dataObj-->Object-->keyValueObj[--页面勾选数据对象--]
			var data = getData(keyValueObj);
			// 2: 使用数据生成表格
			createTable(data);
    	}else if (selfType === "all") {
    		// 如果是全选
			var flagAll = target.checked;
    		childCheckboxArr.map(function(el){
				// 使所有子选项和全选按钮状态一致
    			el.checked = flagAll;
				var name = el.name;
				if (flagAll) {
					// 如果勾选了全选按钮则将keyValueObj对应选项中没有的值添加进去，知道填满
					var index = keyValueObj[name].indexOf(el.value);
					if (index === -1) {
						keyValueObj[name].push(el.value);
					}				
				}else {
					// 如果取消全选则清空keyValueObj对应选项中的数据
					keyValueObj[name].splice(0);
				}
    		});
			
			// 1: 获得数据
				// - 参数1: dataObj-->Object-->keyValueObj[--页面勾选数据对象--]
			var data = getData(keyValueObj);
			// 2: 使用数据生成表格
			createTable(data);
    	}
    });
}

/* 
 * 功能: 确定所有checkbox是否被全选
 * 函数: getFlagOfAllChecked(checkboxArr)
 * 返回值: flag--bool-->是否所有checkbox都被勾选
 * 参数1: checkboxArr-->Array-->各组所有子选项checkbox
 */
function getFlagOfAllChecked(checkboxArr){
	var checkedLength = 0;
	checkboxArr.map(function(el){
		if (el.checked) {
			checkedLength++;
		}
	});
	return checkedLength === checkboxArr.length ? true : false;
}

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
	if (productNum === 1 && regionNum > 1){
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
		if (productNum === 1 && regionNum > 1){
			// 将第一列单元格添加进firRowTd数组
			firRowTd.push(tdOfProduct);
			trOfData.appendChild(tdOfProduct);
			trOfData.appendChild(tdOfRegion);
			
		}else {
			// 将第一列单元格添加进firRowTd数组
			firRowTd.push(tdOfRegion);
			trOfData.appendChild(tdOfRegion);
			trOfData.appendChild(tdOfProduct);
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

/* 
 * 功能: 获取数据
 * 函数: getData(name, value)
 * 参数1: dataObj-->Object-->所有勾中的选项卡checkbox的value值(地区和产品的值)
 */
function getData(dataObj){
	// 根据name: value 形式的键值对 从sourceData中返回对应数据
	var regionDataArr = dataObj.region;
	var productDataArr = dataObj.product;
	var resultArr = [];
	var tempArr = [];
	
	if (regionDataArr.length !== 0 && productDataArr.length === 0) {
		resultArr = getDataBySanmeName("region", regionDataArr, sourceData);
	}else if (regionDataArr.length === 0 && productDataArr.length !== 0) {
		resultArr = getDataBySanmeName("product", productDataArr, sourceData);
	}else if (regionDataArr.length !== 0 && productDataArr.length !== 0) {
		resultArr =  getDataBySanmeName("product", productDataArr, getDataBySanmeName("region", regionDataArr, sourceData));
	}
	return resultArr;
}


function getDataBySanmeName(name, nameArr, soureDataArr){
	var tempArr = [];
	for (var i = 0; i < nameArr.length; i++) {
		for (var k = 0; k < soureDataArr.length; k++) {
			if (soureDataArr[k][name] === nameArr[i]) {
				tempArr.push(soureDataArr[k]);
			}
		}
	}
	return tempArr;
}