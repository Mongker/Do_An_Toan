import React from 'react';
// import PropTypes from 'prop-types';
import './styleSlider.module.css';
import { Carousel } from 'antd';
import slider1 from '../../../img/slider1.jpg';
import slider2 from '../../../img/slider2.jpg';
import slider3 from '../../../img/slider3.jpg';
import slider4 from '../../../img/slider4.jpg';
import slider5 from '../../../img/slider5.png';
const contentStyle = {
	width: '950px',
	height: '518px',
	color: '#fff',
	lineHeight: '160px',
	textAlign: 'center',
	background: '#364d79',
};

function HoverMenu() {
	return (
		<ul className="sub-menu">
			<div className="center_slider">
				<Carousel autoplay className="picture_slider">
					<div>
						<h3 style={contentStyle}>
							<img src={slider1} alt="Bỉm Moony" />
						</h3>
					</div>
					<div>
						<h3 style={contentStyle}>
							<img src={slider2} alt="Chúc mừng 8/3 - Ưu đãi cho mẹ - Qùa tặng cho bé" />
						</h3>
					</div>
					<div>
						<h3 style={contentStyle}>
							<img src={slider3} alt="Joie giá tốt quà chất" />
						</h3>
					</div>
					<div>
						<h3 style={contentStyle}>
							<img src={slider4} alt="Quét VNPay giảm 15k" />
						</h3>
					</div>
					<div>
						<h3 style={contentStyle}>
							<img src={slider5} alt="Uống sữa Friso nhận ngàn quà tặng MB" />
						</h3>
					</div>
				</Carousel>
			</div>
			<div className="right_slider">
				<img
					src="https://media.shoptretho.com.vn/upload/image/banner/20210301/quet-vnpay-giam-15k-190-x-204.png"
					alt="Quét VNPay giảm 15k"
				/>
				<img
					src="https://media.shoptretho.com.vn/upload/image/banner/20210301/chuc-mung-8-3-uu-dai-cho-me-qua-tang-cho-be-190-x-204-1.png"
					alt="Chúc mừng 8/3 - Ưu đãi cho mẹ - Qùa tặng cho bé"
				/>
			</div>
		</ul>
	);
}

HoverMenu.propTypes = {};

HoverMenu.defaultProps = {};

export default React.memo(HoverMenu);
