/* eslint-disable */
import React from 'react';
import { Card } from 'antd';
import img1 from '../../../img/xau-vong-trang-suc-dong-ho-5.jpg';
import img2 from '../../../img/do-choi-go-doan-tau-cho-thu-3.jpg';
import img3 from '../../../img/ban-tinh-hoc-toan-cho-be-1.jpg';
import img4 from '../../../img/bo-so-dem-toan-hoc-2.jpg';
import img5 from '../../../img/domino-toan-hoc-do04-3.jpg';
//style
import './styleXuHuong.css';

const { Meta } = Card;

ProductListXuHuong.propTypes = {};

function ProductListXuHuong(props) {
	return (
		<div className="list_hot">
			<div className="content_host_tim_kien">
				<div className="title_tim_kien">
					<span>XU HƯỚNG TÌM KIẾM</span>
				</div>
				<hr
					style={{
						height: '2px',
						borderWidth: '0',
						color: '#5deccf',
						backgroundColor: '#efdada',
					}}
				/>
				<div className="content_tim_kien">
					<div className="content_tim_kien_item">
						<div className="title">
							<div>Xâu vòng trang sức</div>
							<div>409k+ sản phẩm</div>
						</div>
						<div className="img">
							<img src={img1} />
						</div>
					</div>
					<div className="content_tim_kien_item">
						<div className="title">
							<div>Đoàn tàu chở thứ</div>
							<div>185k+ sản phẩm</div>
						</div>
						<div className="img">
							<img src={img2} />
						</div>
					</div>
					<div className="content_tim_kien_item">
						<div className="title">
							<div>Bàn tính học toán BA01</div>
							<div>70k+ sản phẩm</div>
						</div>
						<div className="img">
							<img src={img3} />
						</div>
					</div>
					<div className="content_tim_kien_item">
						<div className="title">
							<div>Bảng số đếm</div>
							<div>159k+ sản phẩm</div>
						</div>
						<div className="img">
							<img src={img4} />
						</div>
					</div>
					<div className="content_tim_kien_item">
						<div className="title">
							<div>Domino Toán học</div>
							<div>279k+ sản phẩm</div>
						</div>
						<div className="img">
							<img src={img5} />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default React.memo(ProductListXuHuong);
