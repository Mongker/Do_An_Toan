import React from 'react';
import FileSaver from 'file-saver';
import XLSX from 'xlsx';
import { Button } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';

const ExportCSV = ({ csvData, fileName, wscols }) => {
	// ******** XLSX with object key as header *************
	// const fileType =
	//   "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
	// const fileExtension = ".xlsx";

	// const exportToCSV = (csvData, fileName) => {
	//   const ws = XLSX.utils.json_to_sheet(csvData);
	//   const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
	//   const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
	//   const data = new Blob([excelBuffer], { type: fileType });
	//   FileSaver.saveAs(data, fileName + fileExtension);
	// };

	// ******** XLSX with new header *************
	const fileType =
		'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
	const fileExtension = '.xlsx';

	const Heading = [
		{
			_id: 'Mã sản phẩm',
			name: 'Tên sản phẩm',
			catalog_id: 'Danh mục',
			price: 'Gía tiền',
			amount: 'Số lượng',
			price_seo: 'Giá sale',
			status: 'Trạng thái',
			sold: 'Đã bán',
			view_user: 'Lượt xem',
			vote_user: 'Lượt vote',
			created: 'Ngày tạo',
			update_created: 'Ngày cập nhật',
		},
	];

	const exportToCSV = (csvData, fileName, wscols) => {
		const ws = XLSX.utils.json_to_sheet(Heading, {
			header: [
				'_id',
				'name',
				'catalog_id',
				'price',
				'amount',
				'price_seo',
				'status',
				'sold',
				'view_user',
				'vote_user',
				'created',
				'update_created',
			],
			skipHeader: true,
			origin: 0, //ok
		});
		ws['!cols'] = wscols;
		XLSX.utils.sheet_add_json(ws, csvData, {
			header: [
				'_id',
				'name',
				'catalog_id',
				'price',
				'amount',
				'price_seo',
				'status',
				'sold',
				'view_user',
				'vote_user',
				'created',
				'update_created',
			],
			skipHeader: true,
			origin: -1, //ok
		});
		const wb = { Sheets: { data: ws }, SheetNames: ['data'] };
		const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
		const data = new Blob([excelBuffer], { type: fileType });
		FileSaver.saveAs(data, fileName + fileExtension);
	};

	return (
		<Button
			style={{
				marginBottom: 15,
				marginRight: 5,
				backgroundColor: '#94ea95',
				borderRadius: 15,
			}}
			variant="warning"
			onClick={(e) => exportToCSV(csvData, fileName, wscols)}
			icon={<DownloadOutlined />}
		>
			Export XLSX
		</Button>
	);
};

export default ExportCSV;

// This component is a presentational component which takes the data to download and file name as props. The exportToCSV method is invoked when the export button is clicked on line 20.
