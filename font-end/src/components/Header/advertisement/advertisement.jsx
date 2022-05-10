import React from 'react';
import './style.scss';
import logo from '../../../img/sale-gia-soc-boc-ngay-thoi-1190-x-60.png';

Advertisement.propTypes = {};

function Advertisement(props) {
	return (
		<div className="wrap">
			<img src={logo} alt="Chúc mừng 8/3 - Ưu đãi cho mẹ - Qùa tặng cho bé" />
		</div>
	);
}

export default React.memo(Advertisement);
