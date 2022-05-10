const columns = [
	{
		title: 'Ảnh',
		width: 100,
		dataIndex: 'image',
		key: 'image',
		fixed: 'left',
		align: 'center',
	},
	{
		title: 'Tên sản phẩm',
		width: 250,
		dataIndex: 'name',
		key: 'name',
		align: 'center',
	},
	{
		title: 'Giá',
		dataIndex: 'price',
		key: '1',
		width: 150,
		align: 'center',
	},
	{
		title: 'Số lượng',
		dataIndex: 'amount',
		width: 150,
		key: '2',
		align: 'center',
	},
	{
		title: 'Trạng thái',
		dataIndex: 'status',
		key: '3',
		width: 150,
		align: 'center',
	},
	{
		title: 'Giá sale',
		dataIndex: 'price_seo',
		key: '4',
		width: 150,
		align: 'center',
	},
	{
		title: 'Đã bán',
		dataIndex: 'sold',
		width: 150,
		key: '5',
		align: 'center',
	},
];
const data = [];
for (let i = 0; i < 100; i++) {
	data.push({
		key: i,
		name: `Edrward ${i}`,
		age: 32,
		address: `London Park no. ${i}`,
	});
}
export { columns, data };
