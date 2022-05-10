import React from 'react';
import SliderHeader from './slider/slider';

//import style
import './styleForm.css';
import Chung from './Chung';
//style
const styleHeader = {
	display: 'flex',
	flexDirection: 'column',
	width: '100%',
	height: '100%',
	float: 'left',
};

function IndexHeader() {
	return (
		<div style={styleHeader}>
			<Chung />
			<div className="form_slider">
				<div style={{ display: 'flex', height: '100%', width: '1200px', float: 'left' }}>
					<SliderHeader />
				</div>
			</div>
		</div>
	);
}

export default React.memo(IndexHeader);
