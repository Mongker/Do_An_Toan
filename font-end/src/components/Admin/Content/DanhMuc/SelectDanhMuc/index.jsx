import React from 'react';
import { Select } from 'antd';
// import PropTypes from 'prop-types';
// const
function SelectDanhMuc({ onChange, getList, catalog, value }) {
	const [OptionsValue, setOptionsValue] = React.useState([]);

	React.useEffect(() => {
		getList();
	}, []);
	React.useEffect(() => {
		setOptionsValue(Object.values(catalog));
	}, [catalog]);
	return (
		<Select
			placeholder="Chọn danh mục"
			onChange={onChange}
			style={{ width: '100%' }}
			defaultValue={value}
		>
			{OptionsValue.length > 0 &&
				OptionsValue.map((item) => (
					<Select.Option key={item._id} value={item._id}>
						{/*{item.paramId === '-1' ? item.name : `${catalog[item.paramId].name}/${item.name}`}*/}
						{item.name}
					</Select.Option>
				))}
		</Select>
	);
}

SelectDanhMuc.propTypes = {};

SelectDanhMuc.defaultProps = {};

export default React.memo(SelectDanhMuc);
