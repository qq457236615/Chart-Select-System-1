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