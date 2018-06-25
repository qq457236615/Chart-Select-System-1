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