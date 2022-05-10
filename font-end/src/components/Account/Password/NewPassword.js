import React from 'react';
import { Button, Form, Input } from 'antd';
import { LockOutlined } from '@ant-design/icons';
import style from './style.module.scss';
// import PropTypes from 'prop-types';

const layout = {
	labelCol: { span: 6 },
	wrapperCol: { span: 12 },
};
const tailLayout = {
	wrapperCol: { offset: 6, span: 18 },
};
function NewPassword() {
	const [form] = Form.useForm();
	const onFinish = (values) => {
		console.log(values);
	};
	return (
		<div>
			<div className={style.title_header_pass}>
				<div className={style.title_header_pass_item}>Đổi Mật Khẩu</div>
				<div>Để bảo mật tài khoản, vui lòng không chia sẻ mật khẩu cho người khác</div>
			</div>
			<div className={style.content_header_pass}>
				<Form {...layout} form={form} name="control-hooks" onFinish={onFinish}>
					<Form.Item label="Mật khẩu HT:" name={'password'}>
						<Input.Password
							prefix={<LockOutlined className="site-form-item-icon" />}
							type="password"
							placeholder="Password"
						/>
					</Form.Item>
					<Form.Item label="Mật khẩu mới :" name={'new_password'}>
						<Input.Password
							prefix={<LockOutlined className="site-form-item-icon" />}
							type="password"
							placeholder="Password"
						/>
					</Form.Item>
					<Form.Item label="Nhập lại mật khẩu :" name={'check_new_password'}>
						<Input.Password
							prefix={<LockOutlined className="site-form-item-icon" />}
							type="password"
							placeholder="Password"
						/>
					</Form.Item>
					<Form.Item {...tailLayout}>
						<Button
							type="primary"
							htmlType="submit"
							style={{
								backgroundColor: 'rgb(238, 77, 45)',
								color: 'rgb(255, 255, 255)',
								border: '#fff',
							}}
						>
							Lưu
						</Button>
					</Form.Item>
				</Form>
			</div>
		</div>
	);
}

NewPassword.propTypes = {};

NewPassword.defaultProps = {};

export default React.memo(NewPassword);
