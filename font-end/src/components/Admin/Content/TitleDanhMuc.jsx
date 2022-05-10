import React from 'react';
import PropTypes from 'prop-types';
import { Avatar, Popover, Popconfirm, Button } from 'antd';
import {
	AppstoreOutlined,
	DeleteFilled,
	SettingOutlined,
	EditTwoTone,
	FolderAddFilled,
	EyeInvisibleOutlined,
	EyeOutlined,
	RightOutlined,
} from '@ant-design/icons';
import { BASE_URL_IMAGE } from '../../../util/TypeApi';
import useProductLogicData from '../../../hooks/useProductLogicData';
import useCategoryLogicData from '../../../hooks/useCategoryLogicData';

// const
const stylesContent = {
	display: 'flex',
	flexDirection: 'row',
	justifyContent: 'center',
	alignItems: 'center',
};
const stylesIndex = { cursor: 'pointer', marginRight: 7 };
const stylesDelete = { color: 'red', ...stylesIndex };

const defaultFunc = () => {};

function TitleDanhMuc({
	item,
	handleAdd,
	handleDelete,
	handleEdit,
	listCategoryFollowParamId,
}) {
	// hooks
	const { product } = useProductLogicData();
	const { updateCategory } = useCategoryLogicData();

	const numberProduct = Object.values(product).filter(
		(itemProduct) => itemProduct.catalog_id === item._id
	).length;

	const numberCategory = listCategoryFollowParamId(item._id).length;
	const isStatus = !!item['status'];
	const stylesName = isStatus
		? {}
		: {
				textDecorationLine: 'line-through',
				color: 'red',
		  };

	const handleConfirm = () => {
		handleDelete(item._id);
	};
	const hiddenItem = () => {
		item['status'] = !isStatus;
		updateCategory(item).catch((err) => console.log('error', err));
	};
	const handleAddChildren = (event) => {
		event.stopPropagation();
		handleAdd(item._id);
	};
	const onEdit = () => {
		handleEdit(item);
	};
	const content = (
		<div style={stylesContent}>
			<EditTwoTone style={{ cursor: 'pointer', marginRight: 7 }} onClick={onEdit} />
			{numberProduct === 0 && numberCategory === 0 ? (
				<Popconfirm
					placement="right"
					title={'Bạn có chắc chắn muốn xóa nó ?'}
					onConfirm={handleConfirm}
					okText="Phải"
					cancelText="Không"
				>
					<DeleteFilled
						style={stylesDelete}
						// onClick={(event) => event.stopPropagation()}
					/>
				</Popconfirm>
			) : (
				<Popconfirm
					placement={'right'}
					title={`Bạn có chắc chắn muốn ${!isStatus ? 'mở' : 'ẩn'} không?`}
					onConfirm={hiddenItem}
					okText={'Phải'}
					cancelText={'Không'}
				>
					{!isStatus ? (
						<EyeOutlined style={{ color: 'blue', ...stylesIndex }} />
					) : (
						<EyeInvisibleOutlined style={stylesDelete} />
					)}
				</Popconfirm>
			)}

			{item.paramId === '-1' && (
				<FolderAddFilled
					style={{ cursor: 'pointer', color: 'green' }}
					onClick={handleAddChildren}
				/>
			)}
		</div>
	);
	return (
		<>
			{numberCategory === 0 ? (
				<div>
					<Avatar
						style={{ backgroundColor: '#87d068' }}
						icon={<AppstoreOutlined />}
						src={BASE_URL_IMAGE + item.icon}
					/>
					<span style={{ marginLeft: 5, ...stylesName }}>{item && item.name}</span>
					<Popover placement={'right'} content={content} title={null}>
						<SettingOutlined style={{ marginLeft: 10 }} />
					</Popover>
				</div>
			) : (
				<div>
					<Avatar
						style={{ backgroundColor: '#87d068' }}
						icon={<AppstoreOutlined />}
						src={BASE_URL_IMAGE + item.icon}
					/>
					<span style={{ marginLeft: 5, ...stylesName }}>{item && item.name}</span>
					<Popover placement={'right'} content={content} title={null}>
						<SettingOutlined style={{ marginLeft: 8, marginTop: '10px' }} />
					</Popover>
					<RightOutlined />
				</div>
			)}
		</>
	);
}

TitleDanhMuc.propTypes = {
	item: PropTypes.object,
	handleDelete: PropTypes.func,
	setModal: PropTypes.func,
	setParamId: PropTypes.func,
	handleEdit: PropTypes.func,
	listCategoryFollowParamId: PropTypes.func,
};

TitleDanhMuc.defaultProps = {
	item: {},
	handleDelete: defaultFunc,
	handleAdd: defaultFunc,
	handleEdit: defaultFunc,
	listCategoryFollowParamId: () => [],
};

export default React.memo(TitleDanhMuc);
