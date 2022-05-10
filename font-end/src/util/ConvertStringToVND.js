function ConvertStringToVND(number = 0, type = ' VNĐ') {
	const money =
		(Math.round(number) * 1000).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + type;
	return money;
}

export default ConvertStringToVND;
