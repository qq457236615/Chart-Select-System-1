// 1: 获取容器
var regionCheckboxWrapper = document.getElementById("region-checkbox-wrapper");
// 2: 获取地区数据
var regionArray = ["华东", "华北", "华南"];

// 1: 获取容器
var productCheckboxWrapper = document.getElementById("product-checkbox-wrapper");
// 2: 获取产品数据
var productArray = ["手机", "笔记本", "智能音箱"];

// - 定义一个对象存储所有选项checkbox的键值对name: value
var keyValueObj = {
	region: [], // 地区名
	product: [] // 产品名
};