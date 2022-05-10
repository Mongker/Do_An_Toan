import React, { useState } from 'react';
import style from './styles.module.scss';
import { Button, Form, Input, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
// import PropTypes from 'prop-types';
const layout = {
	wrapperCol: { span: 24 },
};
const tailLayout = {
	wrapperCol: { offset: 8, span: 16 },
};
function NewAddress() {
	const [form] = Form.useForm();
	const [isModalVisible, setIsModalVisible] = useState(false);

	const showModal = () => {
		setIsModalVisible(true);
	};
	const handleCancel = () => {
		setIsModalVisible(false);
	};
	const onFinish = (values) => {
		console.log(values);
	};

	const onReset = () => {
		form.resetFields();
	};
	return (
		<div className={style.form_address}>
			<div className={style.container}>
				<div className={style.my_address_tab}>
					<div className={style.my_account_section}>
						<div className={style.my_account_section__header}>
							<div className={style.my_account_header_left}>Địa chỉ của tôi</div>
							<div className={style.my_account_header_btn}>
								<Button
									style={{ backgroundColor: '#ee4d2d', color: '#fff' }}
									icon={<PlusOutlined />}
									onClick={showModal}
								>
									Thêm địa chỉ mới
								</Button>
							</div>
							<Modal
								title="Thêm địa chỉ"
								visible={isModalVisible}
								onCancel={handleCancel}
								footer={null}
							>
								<Form {...layout} form={form} name="control-hooks" onFinish={onFinish}>
									<Form.Item name="name" rules={[{ required: true }]}>
										<Input placeholder="Họ và tên" />
									</Form.Item>
									<Form.Item name="phone" rules={[{ required: true }]}>
										<Input placeholder="Số điện thoại" />
									</Form.Item>
									<Form.Item name="address" rules={[{ required: true }]}>
										<Input.TextArea placeholder="Địa chỉ mới" rows={4} />
									</Form.Item>
									<Form.Item {...tailLayout}>
										<Button type="primary" htmlType="submit" style={{ marginRight: 10 }}>
											Submit
										</Button>
										<Button htmlType="button" onClick={onReset}>
											Reset
										</Button>
									</Form.Item>
								</Form>
							</Modal>
						</div>
						<div className={style.address_card}>
							<div className={style.address_display__left}>
								<div className={style.address_display__left_name}>
									<div className={style.title}>Họ và tên : </div>
									<div className={style.values}>
										<span>Đào Thị Thanh Mai</span>
										<div className={style.values_default}>Mặc định</div>
									</div>
								</div>
								<div className={style.address_display__left_sdt}>
									<div className={style.title}>Số điện thoại : </div>
									<div className={style.values}>0966382406</div>
								</div>
								<div className={style.address_display__left_diachi}>
									<div className={style.title}>Địa chỉ : </div>
									<div className={style.values}>
										<span>
											Toà nhà HH1 đường Dương Đình Nghệ
											<br />
											Phường Yên Hòa
											<br />
											Quận Cầu Giấy
											<br />
											Hà Nội
										</span>
									</div>
								</div>
							</div>
							<div className={style.address_display__ringth}>
								<div className={style.cart_btn_group}>
									<button className={style.btn_group_item}>Sửa</button>
									<button className={style.btn_group_item}>Xóa</button>
								</div>
								<div className={style.cart_btn_group}>
									<button className={style.btn_group_default}>Thiết lập mặc định</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

NewAddress.propTypes = {};

NewAddress.defaultProps = {};

export default React.memo(NewAddress);
