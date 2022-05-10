/* eslint-disable */
import React, { useState } from 'react';
import { Affix, Button } from 'antd';
import Chung from '../Chung';
// import PropTypes from 'prop-types';
import banner from '../../../img/Banner-Tro-giup.jpg';
import hotro1 from '../../../img/hotro.PNG';
import hotro2 from '../../../img/hotrotimkiemSP.PNG';
import hotro4 from '../../../img/Muahang.PNG';
import hotro5 from '../../../img/Giohang.png';
import hotro6 from '../../../img/Giohang1.png';
import hotro7 from '../../../img/Dangnhap.png';
import hotro9 from '../../../img/Dathang.png';
import hotro10 from '../../../img/DathangTC.png';
import style from './style.module.scss';
import Footer from '../../Footer/footer';

// const
const TYPE_BUTTON = {
	GUIDER: 'Hướng dẫn mua hàng',
	RULES: 'Điều khoản sử dụng',
};
function ShoppingGuider() {
	const [top, setTop] = useState(195);
	const [typeActiveButton, setTypeActiveButton] = useState('');

	let ComponentContent = <React.Fragment />;

	// handle func
	const handleButton = (type) => {
		setTypeActiveButton(type);
	};

	// JSX logic
	const content1 = (
		<div className={style.help_detail}>
			<div className={style.help_title}>
				<span>Hướng dẫn mua hàng</span>
			</div>
			<div className={style.m_support_detail}>
				<p>
					<strong>
						<span style={{ fontSize: 16 }}>
							Quý khách hàng tiến hành mua hàng theo quy trình như sau:
						</span>
					</strong>
				</p>
				<p>
					<strong style={{ fontSize: 14 }}>
						Bước 1. Truy cập vào Website ChildrenToy.com.vn để lựa chọn sản phẩm
					</strong>
				</p>
				<p style={{ textAlign: 'center' }}>
					<img src={hotro1} style={{ height: 366, display: 'inline' }} />
				</p>
				<p style={{ textAlign: 'center' }}>
					<strong>
						<em>Bước 1: Truy cập vào website http://ChildrenToy.com.vn</em>
					</strong>
				</p>
				<p style={{ textAlign: 'center' }}>
					<img
						src={hotro2}
						style={{ width: '667.89px', height: 366, display: 'inline' }}
					/>
				</p>
				<p style={{ textAlign: 'justify' }}>
					Tại trang chủ của hệ thống Website ChildrenToy.com.vn bạn có thể lựa chọn sản
					phẩm qua thanh công cụ tìm kiếm hoặc qua các danh mục đã được cài đặt sẵn.
				</p>
				<p>
					<span style={{ fontSize: 14 }}>
						<strong>Bước 2. Chọn sản phẩm</strong>
					</span>
				</p>
				<p style={{ textAlign: 'center' }}>
					<img
						src={hotro2}
						style={{ width: '667.89px', height: 366, display: 'inline' }}
					/>
				</p>
				<p>
					Sau khi tìm được sản phẩm mong muốn, bấm vào hình ảnh để xem chi tiết và thông
					tin sản phẩm. Tại trang chi tiết bấm
					<strong>“Mua ngay”</strong> để đến trang giỏ hàng.
				</p>
				<p>
					<span style={{ fontSize: 14 }}>
						<strong>Bước 3: Mua ngay</strong>
					</span>
				</p>
				<p style={{ textAlign: 'center' }}>
					<img
						src={hotro4}
						style={{ width: '667.89px', height: 366, display: 'inline' }}
					/>
				</p>
				<p>
					<span style={{ fontSize: 14 }}>
						<strong>Bước 4: Giỏ hàng của tôi</strong>
					</span>
				</p>
				<p style={{ textAlign: 'center' }}>
					<img
						src={hotro5}
						style={{ width: '667.89px', height: 366, display: 'inline' }}
					/>
				</p>
				{/*<p style={{ textAlign: 'center' }}>*/}
				{/*	<img*/}
				{/*		src={hotro6}*/}
				{/*		style={{*/}
				{/*			width: '667.89px',*/}
				{/*			height: 166,*/}
				{/*			display: 'inline',*/}
				{/*			marginTop: 5,*/}
				{/*		}}*/}
				{/*	/>*/}
				{/*</p>*/}
				<p>
					Tại trang giỏ hàng, bạn hãy lựa chọn <strong>"Số lượng" </strong>sản phẩm muốn
					mua.
				</p>
				<p>
					Nếu bạn chưa quyết định mua ngay hoặc muốn tìm thêm sản phẩm khác thì bấm
					<strong>"Tiếp tục mua hàng"</strong> để chọn sản phẩm kế tiếp. Nếu đã quyết định
					mua hàng thì bấm nút “<strong>Thanh toán”</strong> để tiếp tục.
				</p>
				<p>
					<span style={{ fontSize: 14 }}>
						<strong>Bước 5: Các bước thanh toán</strong>
					</span>
				</p>
				<p>
					<span style={{ fontSize: 14 }}>
						<strong>
							&nbsp;&nbsp;&nbsp;
							<em>
								<strong>a. Đăng nhập</strong>
							</em>
						</strong>
					</span>
				</p>
				<p style={{ textAlign: 'center' }}>
					<img
						src={hotro7}
						style={{
							width: '667.89px',
							height: 366,
							display: 'inline',
							marginTop: 5,
						}}
					/>
				</p>
				<p>Tại trang chủ chọn chức năng đăng nhập nếu bạn đã có tài khoản !</p>
				<p style={{ textAlign: 'justify' }}>
					Nếu bạn là khách hàng mua lần đầu tiên hãy bấm vào
					<strong>“Đăng kí mới”</strong> Còn nếu đã có tài khoản, bạn nhập email hoặc số
					tài khoản, mật khẩu để <strong>"Đăng nhập".</strong> Nếu quên tài khoản bạn
					click vào "<strong>quên mật khẩu"</strong> để lấy lại mật khẩu
				</p>
				<p>
					<span style={{ fontSize: 14 }}>
						<strong>
							&nbsp;&nbsp;&nbsp;
							<em>
								<strong>b. Địa chỉ giao dịch</strong>
							</em>
						</strong>
					</span>
				</p>
				<p style={{ textAlign: 'center' }}>
					<img
						src={hotro9}
						style={{
							width: '667.89px',
							height: 366,
							display: 'inline',
							marginTop: 5,
						}}
					/>
				</p>
				<p style={{ textAlign: 'justify' }}>
					Tại đây, bạn vui lòng điền đầy đủ thông tin cá nhân, họ tên, số điện thoại, tỉnh
					thành, quận huyện, số nhà, tên đường, phường xã cụ thể để nhân viên giao hàng
					mang đến tận nơi. Nếu bạn muốn hệ thống giao hàng đến địa chỉ khác thì bấm vào{' '}
					<strong>“Thêm địa chỉ nhận hàng”</strong>. Tại đây, bạn cũng nhập thông tin cá
					nhân tương tự, địa chỉ muốn nhận hàng và bấm<strong> “Lưu địa chỉ”</strong>. Sau
					đó, chọn thời gian nhận hàng mà bạn mong muốn. Thêm ghi chú nếu bạn có yêu cầu
					khác như:&nbsp;<strong>"Xuất hóa đơn tài chính"</strong> và điền thông tin công
					ty, mã số thuế, địa chỉ đăng ký kinh doanh.
				</p>
				<p style={{ textAlign: 'justify' }}>
					Sau đó chọn hình thức thanh toán như:
					<strong>"Thanh toán khi nhận hàng (COD)"</strong>,
					<strong>"Chuyển khoản qua ngân hàng".</strong>
				</p>
				<p>
					<span style={{ fontSize: 14 }}>
						<strong>Bước 6: Đặt hàng thành công</strong>
					</span>
				</p>
				<p style={{ textAlign: 'center' }}>
					<img
						src={hotro10}
						style={{
							width: '667.89px',
							height: 366,
							display: 'inline',
							marginTop: 5,
						}}
					/>
				</p>
				<p>
					Sau khi đặt hàng thành công hệ thống hiển thi trang đơn đặt hàng cua bạn và kèm
					theo
					<strong>“Mã đơn hàng”</strong> trong mỗi đơn hàng.
				</p>
				<p>
					<strong>
						<span style={{ fontSize: '16px' }}>
							<span style={{ color: 'rgb(255, 0, 0)' }}>
								<em>
									Chúc các bạn có những trải nghiệm mua sắm tuyệt vời tại Website:
									www.ChildrenToy.com.vn
								</em>
							</span>
						</span>
					</strong>
				</p>
			</div>
		</div>
	);
	const content2 = (
		<div className={style.help_detail2}>
			<div className={style.help_title}>
				<span>Điều khoản sử dụng</span>
			</div>
			<div className={style.m_support_detail}>
				<p style={{ textAlign: 'justify' }}>
					Chào mừng Quý khách hàng đến mua sắm tại ChildrenToy.com.vn. Sau khi truy cập
					vào website ChildrenToy.com.vn để xem thông tin sản phẩm, dịch vụ hoặc mua sắm,
					khách hàng đã đồng ý tuân thủ và ràng buộc với những quy định của
					ChildrenToy.com.vn. Quý khách hàng vui lòng xem kỹ các quy định của chúng tôi và
					hợp tác với chúng tôi để cùng nhau xây dựng hệ thống website ChildrenToy.com.vn
					ngày một thân thiện, tiện tích để phục vụ tốt nhất những yêu cầu của khách hàng.
					Ngoài ra, nếu có bất cứ câu hỏi nào về những thỏa thuận trên đây, vui lòng email
					cho chúng tôi qua địa chỉ email
				</p>
				<p style={{ textAlign: 'justify' }}>
					<strong>Tài khoản của khách hàng</strong>
				</p>
				<p style={{ textAlign: 'justify' }}>
					Khi sử dụng dịch vụ của ChildrenToy.com.vn, khách hàng sẽ cung cấp cho chúng tôi
					thông tin về địa chỉ email, mật khẩu và thông tin cá nhân để có được 1 tài khoản
					tại website. Việc sử dụng và bảo mật thông tin tài khoản là trách nhiệm và quyền
					lợi của khách hàng khi sử dụng ChildrenToy.com.vn. Ngoài ra, những thông tin
					khác trong tài khoản như tên tuổi, địa chỉ, điện thoại.... là những thông tin
					của khách hàng giúp cho ChildrenToy.com.vn phục vụ khách hàng tốt nhất. Trong
					trường hợp thông tin do khách hàng cung cấp không đầy đủ hoặc sai dẫn đến việc
					chúng tôi không đủ cơ sở để giao hàng cho khách hàng, chúng tôi có quyền đình
					chỉ hoặc từ chối phục vụ, giao hàng mà không phải chịu bất cứ trách nhiệm nào
					đối với khách hàng. Khi có những thay đổi thông tin cá nhân của khách hàng, quý
					khách vui lòng đăng nhập hệ thống sau đó cập nhật lại thông tin trong tài khoản
					tại ChildrenToy.com.vn. Khách hàng phải giữ kín mật khẩu và tài khoản, khách
					hàng cũng phải hoàn toàn chịu trách nhiệm đối với tất cả các hoạt động diễn ra
					thông qua việc sử dụng mật khẩu hoặc tài khoản của mình. Khách hàng nên đảm bảo
					thoát khỏi tài khoản tại ChildrenToy.com.vn sau mỗi lần sử dụng để bảo mật thông
					tin của mình an toàn hơn.
				</p>
				<p style={{ textAlign: 'justify' }}>
					<strong>Quyền lợi bảo mật thông tin của khách hàng</strong>
				</p>
				<p style={{ textAlign: 'justify' }}>
					Khi sử dụng dịch vụ của chúng tôi tại website ChildrenToy.com.vn, khách hàng
					được đảm bảo rằng những thông tin cá nhân mà khách hàng cung cấp cho chúng tôi
					sẽ chỉ được dùng để nâng cao chất lượng dịch vụ chăm sóc khách hàng của
					ChildrenToy.com.vn và sẽ không được chuyển giao cho 1 bên thứ ba nào khác vì bất
					kỳ mục đích nào. Thông tin của khách hàng tại ChildrenToy.com.vn sẽ được chúng
					tôi bảo mật và chỉ trong trường hợp pháp luật yêu cầu, chúng tôi mới cung cấp
					những thông tin này cho các cơ quan pháp luật.
				</p>
				<p style={{ textAlign: 'justify' }}>
					<strong>
						Trách nhiệm của khách hàng khi sử dụng dịch vụ của ChildrenToy.com.vn
					</strong>
				</p>
				<p style={{ textAlign: 'justify' }}>
					Khách hàng tuyệt đối không được sử dụng bất kỳ công cụ, phương pháp nào để can
					thiệp, xâm nhập bất hợp pháp vào hệ thống hay làm thay đổi cấu trúc dữ liệu tại
					website ChildrenToy.com.vn. Khách hàng không được có những hành động khuyến
					khích hay việc can thiệp, xâm nhập dữ liệu của ChildrenToy.com.vn cũng như hệ
					thống máy chủ của chúng tôi. Ngoài ra, xin vui lòng thông báo cho quản trị web
					của ChildrenToy.com.vn ngay khi khách hàng phát hiện ra lỗi hệ thống theo số
					điện thoại 1900 6483&nbsp;hoặc email cskh@knic.vn.
				</p>
				<p style={{ textAlign: 'justify' }}>
					Khách hàng không được đưa ra những nhận xét, đánh giá có ý xúc phạm, quấy rối,
					làm phiền hoặc có bất cứ hành vi nào thiếu văn hóa đối với khách hàng khác.
					Không nêu ra những nhận xét có liên quan tới chính trị ( như tuyên truyền, chống
					phá, xuyên tạc nhà nước …), kỳ thị tôn giáo, giới tính, sắc tộc.... Tuyệt đối
					cấm mọi hành giả mạo, cố ý tạo sự nhầm lẫn mình là một khách hàng khác hoặc là
					thành viên của Ban Quản Trị ChildrenToy.com.vn
				</p>
				<p style={{ textAlign: 'justify' }}>
					<strong>Trách nhiệm và quyền lợi của ChildrenToy.com.vn</strong>
				</p>
				<p style={{ textAlign: 'justify' }}>
					Trong trường hợp có những phát sinh ngoài ý muốn hoặc trách nhiệm của của chúng
					tôi, ChildrenToy.com.vn sẽ không chịu trách nhiệm về mọi tổn thất phát sinh.
					Ngoài ra, chúng tôi không cho phép các tổ chức, cá nhân khác quảng bá sản phẩm
					tại website ChildrenToy.com.vn mà chưa có sự xác nhận của KNiC Group. Các thỏa
					thuận và quy định trong <strong>Điều khoản sử dụng</strong> có thể thay đổi vào
					bất cứ lúc nào nhưng sẽ được chúng tôi thông báo cụ thể trên website
					ChildrenToy.com.vn.
				</p>
				<p>
					<strong>
						Nếu bạn cần hỗ trợ xin vui lòng gọi tới số Hotline&nbsp;1900 6483
					</strong>
				</p>
				<p>
					<strong>Xin chân thành cảm ơn!</strong>
				</p>
			</div>
		</div>
	);
	switch (typeActiveButton) {
		case TYPE_BUTTON.RULES:
			ComponentContent = content2;
			break;
		case TYPE_BUTTON.GUIDER:
			// code block
			ComponentContent = content1;
			break;
		default:
			ComponentContent = content1;
		// code block
	}

	return (
		<div>
			<Chung />
			<div style={{ display: 'flex', justifyContent: 'center' }}>
				<div style={{ width: '1200px', marginTop: '191px' }}>
					<div className={style.content_ho_tro}>
						<div className={style.content_ho_tro_banner}>
							<img src={banner} style={{ width: '100%' }} />
						</div>
						<div className={style.support_content}>
							{/*hai button*/}
							<div className={style.help_list}>
								<Affix offsetTop={top}>
									<div className={style.block_btn}>
										<Button
											className={style.btn_buy_course}
											onClick={() => handleButton(TYPE_BUTTON.GUIDER)}
										>
											Hướng dẫn mua hàng
										</Button>
										<Button
											className={style.btn_cart_course}
											onClick={() => handleButton(TYPE_BUTTON.RULES)}
										>
											Điều khoản sử dụng
										</Button>
									</div>
								</Affix>
							</div>
							{/*div content*/}
							{ComponentContent}
						</div>
					</div>
				</div>
			</div>
			<Footer />
		</div>
	);
}

ShoppingGuider.propTypes = {};

ShoppingGuider.defaultProps = {};

export default React.memo(ShoppingGuider);
