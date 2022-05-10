/* eslint-disable */
import React from 'react';
import Chung from '../../Chung';
import { Input, Form, Button, Tooltip } from 'antd';
// import PropTypes from 'prop-types';
import style from './styles.module.css';
import Footer from '../../../Footer/footer';
const { TextArea } = Input;
function formatNumber(value) {
	value += '';
	const list = value.split('.');
	const prefix = list[0].charAt(0) === '-' ? '-' : '';
	let num = prefix ? list[0].slice(1) : list[0];
	let result = '';
	while (num.length > 3) {
		result = `,${num.slice(-3)}${result}`;
		num = num.slice(0, num.length - 3);
	}
	if (num) {
		result = num + result;
	}
	return `${prefix}${result}${list[1] ? `.${list[1]}` : ''}`;
}
function NumericInput(props) {
	const { value, onChange } = props;
	const onChangeItem = (e) => {
		const { value } = e.target;
		const reg = /^-?\d*(\.\d*)?$/;
		if ((!isNaN(value) && reg.test(value)) || value === '' || value === '-') {
			onChange(value);
		}
	};
	const onBlur = (props) => {
		const { value, onChangeItem } = props;
		let valueTemp = value;
		if (value.charAt(value.length - 1) === '.' || value === '-') {
			valueTemp = value.slice(0, -1);
		}
		onChangeItem(valueTemp.replace(/0*(\d+)/, '$1'));
		if (onBlur) {
			onBlur();
		}
	};
	const title = value ? (
		<span className="numeric-input-title">
			{value !== '-' ? formatNumber(value) : '-'}
		</span>
	) : (
		'Input a phone number'
	);
	return (
		<Tooltip
			trigger={['focus']}
			title={title}
			placement="topLeft"
			overlayClassName="numeric-input"
		>
			<Input
				{...props}
				onChange={(e) => onChangeItem(e)}
				onBlur={(value, onChangeItem) => onBlur(value, onChangeItem)}
				placeholder="Input a phone number"
				maxLength={12}
			/>
		</Tooltip>
	);
}
function LienHe() {
	const [state, setState] = React.useState('');
	const layout = {
		labelCol: { span: 3 },
		wrapperCol: { span: 21 },
	};
	const tailLayout = {
		wrapperCol: { offset: 10, span: 16 },
	};
	const onFinish = (values) => {
		console.log('Success:', values);
	};

	const onFinishFailed = (errorInfo) => {
		console.log('Failed:', errorInfo);
	};
	const onChange = (value) => {
		setState({ value });
	};
	return (
		<div>
			<Chung />
			<div className={style.content_lien_he}>
				<div className={style.content_lien_he_1}>
					<div className={style.row}>
						<h2 className={style.title_lien_he}>
							<span>XEM BẢN ĐỒ CHỈ DẪN TỚI CÔNG TY CHÚNG TÔI</span>
						</h2>
					</div>
					<div className={style.map}>
						<iframe
							src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1107.4799429693205!2d105.81303308400632!3d20.988481635851777!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135acecd9bf5349%3A0x613eb52d7cbab8ea!2zTmfDtSAzODcsIEtoxrDGoW5nIMSQw6xuaCwgVGhhbmggWHXDom4sIEjDoCBO4buZaSwgVmnhu4d0IE5hbQ!5e0!3m2!1svi!2s!4v1619422693698!5m2!1svi!2s"
							style={{ width: '100%', height: '600px', border: 0 }}
							allowFullScreen=""
							loading="lazy"
						/>
					</div>
					<div className={style.row}>
						<h2 className={style.title_lien_he}>
							<span>THÔNG TIN LIÊN HỆ</span>
						</h2>
					</div>
					<div className={style.map}>
						<span>
							ĐA NGÀNH SHOP Sản xuất và phân phối đồ chơi gỗ , nội thất cho bé
							<br /> Gia công và cung cấp các loại nút chai, màng co, tấm bần.
							<br /> Địa chỉ: Thanh liệt, thanh trì, HN
							<br /> Điện thoại:0982.586.908 Zalo/Viber: 0982.586.908
							<br /> Email: marketing.grov@gmail.com
						</span>
					</div>
					<div className={style.row}>
						<h2 className={style.title_lien_he}>
							<span>LIÊN HỆ</span>
						</h2>
					</div>
					<div className={style.map}>
						<Form
							{...layout}
							name="basic"
							initialValues={{ remember: true }}
							onFinish={onFinish}
							onFinishFailed={onFinishFailed}
							className={style.form_lien_he}
						>
							<div className={style.input}>
								<Form.Item
									name="username"
									rules={[{ required: true, message: 'Please input your username!' }]}
									className={style.form_item_0}
								>
									<Input placeholder="Họ tên" />
								</Form.Item>
								<Form.Item
									name="sdt"
									rules={[
										{
											type: 'number',
											message: 'The input is not valid number!',
										},
										{ required: true, message: 'Please input your phone number!' },
									]}
									className={style.form_item_1}
								>
									<NumericInput value={(e) => e.target.value} onChange={onChange} />
								</Form.Item>
							</div>
							<div className={style.input}>
								<Form.Item
									name="address"
									rules={[{ required: true, message: 'Please input your address!' }]}
									className={style.form_item_0}
								>
									<Input placeholder="Địa chỉ" />
								</Form.Item>
								<Form.Item
									name="email"
									rules={[
										{
											type: 'email',
											message: 'The input is not valid E-mail!',
										},
										{
											required: true,
											message: 'Please input your Email!',
										},
									]}
									className={style.form_item_1}
								>
									<Input placeholder="Email" />
								</Form.Item>
							</div>
							<div>
								<Form.Item
									name="title"
									rules={[{ required: true, message: 'Please input your title!' }]}
									className={style.form_item_2}
								>
									<Input placeholder="Tiêu đề" />
								</Form.Item>
							</div>
							<div>
								<Form.Item
									name="content"
									rules={[{ required: true, message: 'Please input your content!' }]}
									className={style.form_item_2}
								>
									<TextArea rows={4} placeholder="Nội dung" />
								</Form.Item>
							</div>
							<div>
								<Form.Item {...tailLayout}>
									<Button
										type="primary"
										htmlType="submit"
										className={style.btn_submit_lien_he}
									>
										Gửi
									</Button>
								</Form.Item>
							</div>
						</Form>
					</div>
				</div>
			</div>
			<Footer />
		</div>
	);
}

LienHe.propTypes = {};

LienHe.defaultProps = {};

export default React.memo(LienHe);
