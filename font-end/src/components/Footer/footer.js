/* eslint-disable */
import React from 'react';
import { Input, Space } from 'antd';
import { AudioOutlined, FacebookOutlined } from '@ant-design/icons';
//style
import './footer.css';
//img
import footer1 from '../../img/footer1.png';
import footer2 from '../../img/payment-logo.png';

//const
const { Search } = Input;

const suffix = (
	<AudioOutlined
		style={{
			fontSize: 16,
			color: '#1890ff',
		}}
	/>
);

const onSearch = (value) => console.log(value);

Footer.propTypes = {};

function Footer(props) {
	return (
		<div style={{ width: '100%', height: '100%', backgroundColor: '#d9f3f4' }}>
			<div className="border_footer" />
			<div className="form_footer">
				<div className="list_footer">
					<div className="list_footer_item">
						<h3>
							<b>THÔNG TIN CÔNG TY</b>
						</h3>
						<ul className="footer_link">
							<li>
								<a href="#">Giới thiệu về Shop Children Toy</a>
							</li>
							<li>
								<a href="#">Hệ thống cửa hàng</a>
							</li>
							<li>
								<a href="#">Liên hệ & góp ý</a>
							</li>
							<li>
								<a href="#">Tuyển dụng </a>
							</li>
							<li>
								<a href="#">Mua sỉ/mua buôn</a>
							</li>
							<li>
								<a href="#">Hoạt động thiện nguyện</a>
							</li>
						</ul>
					</div>
					<div>
						<h3>
							<b>HỖ TRỢ KHÁCH HÀNG</b>
						</h3>
						<ul className="footer_link">
							<li>
								<a href="">Hướng dẫn mua hàng</a>
							</li>
							<li>
								<a href="">Thanh toán qua ngân hàng</a>
							</li>
							<li>
								<a href="">Bảo mật thông tin</a>
							</li>
							<li>
								<a href="">Chính sách bảo hành</a>
							</li>
							<li>
								<a href="">Chính sách đổi hàng</a>
							</li>
							<li>
								<a href="">Chính sách tích điểm</a>
							</li>
							<li>
								<a href="">Chính sách vận chuyển</a>
							</li>
						</ul>
					</div>
					<div>
						<h3>
							<b>TỔNG ĐÀI BÁN HÀNG</b>
						</h3>
						<p>Đặt hàng gọi miễn phí</p>
						<p>
							<a>1800 6066</a>(8h - 21h30)
						</p>
						<p>Đổi hàng, bảo hành, khiếu nại:</p>
						<p>
							<a>1900 6483</a>(8h - 17h00)
						</p>
					</div>
					<div>
						<h3>
							<b>ĐĂNG KÝ NHẬN TIN KHUYẾN MẠI</b>
						</h3>
						<Search
							placeholder="input search text"
							allowClear
							enterButton="Đăng ký"
							size="large"
							onSearch={onSearch}
						/>
						{/*<div>*/}
						{/*    <FacebookOutlined />*/}
						{/*</div>*/}
					</div>
				</div>
				<div>
					<hr />
				</div>
				<div className="footer_end">
					<div className="footer_end_item">
						<p>
							© 2021 ChildrenToy.com.vn - Thiên đường cho bé! GPĐKKD số 0104406702 do sở
							KHĐT TP.Hà Nội cấp ngày 28/01/2010
							<br /> VPGD: Số63C ngách 35/69, ngõ 387 phố Vũ Tông Phan, Phường Khương
							Đình, Quận Thanh Xuân, Thành phố Hà Nội
						</p>
					</div>
					<div className="footer_end_item_tow">
						<div className="footer_end_item_tow_item">
							<img src={footer2} style={{ width: '228px', height: '30px' }} />
						</div>
						<div className="footer_end_item_tow_item">
							<img src={footer1} style={{ width: '129px', height: '48px' }} />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Footer;
