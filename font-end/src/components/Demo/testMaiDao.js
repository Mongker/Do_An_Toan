import React from 'react';
import axios from 'axios';
// import PropTypes from 'prop-types';

function TestAPI() {
	const [dataObj, setDataObj] = React.useState({});
	const getAPI = async () => {
		return await axios
			.get('http://localhost:1999/api/slider')
			.then((res) => setDataObj(res.data))
			.catch((err) => console.log(err));
	};
	React.useEffect(() => {
		getAPI();
	}, []);
	const array = Object.keys(dataObj);
	return (
		<div>
			{array.map((item) => (
				<h1>{dataObj[item].name}</h1>
			))}
		</div>
	);
}

TestAPI.propTypes = {};

TestAPI.defaultProps = {};

export default React.memo(TestAPI);
