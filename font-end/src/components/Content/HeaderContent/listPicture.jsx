/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
//import css
import './styleListPicture.css';
//import img banner
import banner1 from '../../../img/dochoidep.jpg';
import banner2 from '../../../img/banner2.png';
import banner3 from '../../../img/banner3.jpg';

ListPicture.propTypes = {};

function ListPicture(props) {
	return (
		<div className="list_banner">
			<div className="item_banner tow">
				<div className="img_banner">
					<a href="#">
						<img src={banner2} alt="" />
					</a>
				</div>
			</div>
			<div className="item_banner one">
				<div className="img_banner">
					<a href="#">
						<img
							style={{
								width: '380px',
								height: '198px',
								objectFit: 'cover',
							}}
							src={banner1}
							alt=""
						/>
					</a>
				</div>
			</div>
			<div className="item_banner three">
				<div className="img_banner">
					<a href="#">
						<img src={banner3} alt="" />
					</a>
				</div>
			</div>
		</div>
	);
}

export default React.memo(ListPicture);
