import React from 'react';
import { Tag } from 'antd';
// import PropTypes from 'prop-types';
import Styles from './style.module.css';
import Footer from '../../../Footer/footer';
import {
	TwitterOutlined,
	YoutubeOutlined,
	FacebookOutlined,
	LinkedinOutlined,
} from '@ant-design/icons';
import Chung from '../../Chung';

function IntroduceProduct() {
	return (
		<div>
			<Chung />
			<div className={Styles.form_content}>
				<div className={Styles.content_gioi_thieu}>
					<div className={Styles.title_gioi_thieu}>
						<h1>Thương hiệu GCB</h1>
					</div>
					<div className={Styles.link_gioi_thieu}>
						<>
							<Tag icon={<TwitterOutlined />} color="#55acee">
								Twitter
							</Tag>
							<Tag icon={<YoutubeOutlined />} color="#cd201f">
								Youtube
							</Tag>
							<Tag icon={<FacebookOutlined />} color="#3b5999">
								Facebook
							</Tag>
							<Tag icon={<LinkedinOutlined />} color="#55acee">
								LinkedIn
							</Tag>
						</>
					</div>
					<div className={Styles.tieu_de}>
						<b>Công Ty Cổ Phần Thương Mại Thiết Bị Đa Ngành ( GCB ):</b>
					</div>
					<div className={Styles.noi_dung}>
						<span>
							- Tên giao dịch: DA NGANH., JSC
							<br /> - Loại hình hoạt động: Công ty Cổ Phần - Mã số thuế: 0104397374
							<br /> - Địa chỉ: Số63C ngách 35/69, ngõ 387 phố Vũ Tông Phan, Phường Khương
							Đình, Quận Thanh Xuân, Thành phố Hà Nội
							<br /> - Đại diện pháp luật: Nguyễn Cương Quyết
							<br /> - Ngày cấp giấy phép: 25/01/2010
							<br /> - Ngày hoạt động: 25/01/2010 (Đã hoạt động 11 năm)
							<br /> - Điện thoại: 0466582188
							<br /> - Trạng thái: Đang hoạt động
							<br /> - Sản phẩm, dịch vụ : Đồ chơi, đồ chơi xây dựng, đồ dùng để câu cá,
							búp bê, thiết bị tập thể dục.
						</span>
					</div>
					<div className={Styles.tieu_de}>
						<b>SẢN PHẨM ĐỒ CHƠI GỖ :</b>
					</div>
					<div className={Styles.noi_dung}>
						<span>
							GCB là công ty chuyên cung cấp các loại đồ chơi gỗ mang tính giáo dục cao
							dành cho các bé. Các sản phẩm bằng gỗ tự nhiên và sơn an toàn, không dễ rơi
							vỡ, móp méo như đồ chơi nhựa nên bố mẹ yên tâm cho bé chơi.
							<br />
							<br />
							<b>Sứ mệnh:</b> Giúp các bé phát triển toàn diện cả về thể chất và trí não
							ngay từ những năm đầu đời.
							<br />
							<br />
							<b>Tiêu chí hoạt động:</b> Dùng tâm kinh doanh, lấy tín làm đầu! Sản phẩm
							chất lượng, giá cả rẻ nhất thị trường, dịch vụ tận tâm!
							<br />
							<br />
							Làm thế nào để các bố mẹ không phải lo lắng chuyện ép con học , con trẻ được
							chơi thoải mái mà vẫn nhận biết được chữ, số, hình khối, màu sắc, rèn luyện
							các kỹ năng… vào tận trong tiềm thức từ khi còn rất nhỏ.
							<br />
							<br />
							Làm thế nào để tiết kiệm túi tiền cho các bậc cha mẹ mà con cái của họ vẫn
							được chơi mà học đầy đủ kiến thức không thua kém ai.
							<br />
							<br />
							Chúng tôi cũng là những người làm cha làm mẹ, cũng hiểu rằng phải đầu tư cho
							con cái học hành và tiết kiệm tiền bạc cho rất nhiều chi tiêu khác. Vậy nên
							chúng tôi thấu hiểu và đồng hành cùng các bậc cha mẹ.
							<br />
							<br />
							Chúng tôi sản xuất ra những mặt hàng đồ chơi gỗ theo tiêu chuẩn của bộ giáo
							dục về các chủ đề , chủ điểm :<br />
							<br />
							+ nhận biết và học chữ, số, hình khối , màu sắc, âm thanh
							<br /> + nhận biết về chủ đề động vật, hoa quả , phương tiện giao thông
							<br /> + rèn luyện sự khéo léo, tinh tế, tư duy logic cho trẻ
							<br /> + rèn luyện cho trẻ kỹ năng làm việc theo nhóm và hòa đồng, kỹ năng
							sáng tạo.
							<br /> + rèn luyện thị giác, kỹ năng vận động nhanh nhạy, hoạt bát và sự
							chia sẻ, sự tự tin
							<br /> ………….
						</span>
					</div>
					<div className={Styles.tieu_de}>
						<b>Chất liệu tuyệt đối an toàn theo các tiêu chuẩn quốc tế:</b>{' '}
					</div>
					<div className={Styles.noi_dung}>
						<span>
							* Tiêu chuẩn ISO 9001: 2008 về hệ thống quản lý chất lượng
							<br /> * Tiêu chuẩn ASTM của Mỹ
							<br /> * Tiêu chuẩn EN - 71 của Châu Âu
							<br /> * Tiêu chuẩn ST của Mỹ
							<br /> * Quy chuẩn QCVN 03/BKHCN-2009 của Việt Nam
						</span>
					</div>
					<div className={Styles.tieu_de}>
						<b>Chủng loại sản phẩm đa dạng với trên 500 dòng sản phẩm.</b>
					</div>
					<div className={Styles.noi_dung}>
						<span style={{ verticalAlign: '15px' }}>
							Các sản phẩm bằng gỗ tự nhiên và sơn an toàn nên có thể các bố mẹ sẽ thấy
							giá cả cao hơn đồ chơi nhựa một chút nhưng đồ chơi gỗ đặc biệt rất bền,
							không dễ rơi vỡ, móp méo như đồ chơi nhựa.
							<br />
							<br /> Theo các nhà khoa học, 5 năm đầu đời là giai đoạn trẻ phát triển trí
							não với tốc độ nhanh và mạnh nhất. Đây chính là tiền đề cho sự phát triển
							của con trẻ sau này vì vậy đồ chơi của chúng tôi tập trung cho các bé trong
							giai đoạn lứa tuổi này.
							<br />
							<br /> Ngoài ra đồ chơi gỗ GCB còn mang lại những khoảnh khắc đầm ấm trong
							gia đình với những giây phút cả nhà quây quần, sum họp cùng chơi, tâm tình,
							trò chuyện, chia sẻ giúp gắn kết các thành viên.
						</span>
					</div>
				</div>
			</div>
			<div>
				<Footer />
			</div>
		</div>
	);
}

IntroduceProduct.propTypes = {};

IntroduceProduct.defaultProps = {};

export default React.memo(IntroduceProduct);
