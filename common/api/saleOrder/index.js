import api from "@/common/libs/api.request.js";
const baseUrl = "/sale";

function post(url, params) {
	return api.post(baseUrl + url, params);
}

function get(url, params) {
	return api.get(baseUrl + url, params);
}

// 销货单列表
export const getSaleOrderList = ({
	orderNumber,
	customerName,
	state,
	tradeMode,
	paymentStatus,
	orderSource,
	salesman,
	companyId,
	pageSize,
	pageNum,
	count,
	auditState,
	logisticsSheet,
	printing,
	stateTime,
	sTime,
	eTime
}) => {
	return post('/order/list', {
		orderNumber,
		customerName,
		state,
		tradeMode,
		paymentStatus,
		orderSource,
		salesman,
		companyId,
		pageSize,
		pageNum,
		count,
		auditState,
		logisticsSheet,
		printing,
		stateTime,
		sTime,
		eTime
	})
}

// 销货单详情
export const getSaleOrderInfo = ({
	saleOrder,
	state
}) => {
	return post('/order/details', {
		saleOrder,
		state
	})
}
export const cashierAdd = ({
	totalMoney,
	deliveryType
}) => {
	return post('/order/cashier/add', {
		totalMoney,
		deliveryType
	})
}

