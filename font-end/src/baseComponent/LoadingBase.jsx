import React from 'react';
import PropTypes from 'prop-types';

// styles
import styles from './styles/index.module.scss';

function LoadingBase({ objectStyle }) {
	return (
		<div className={styles.loading_container} style={objectStyle && objectStyle}>
			<div className={styles.loading_base} />
		</div>
	);
}
LoadingBase.propTypes = {
	objectStyle: PropTypes.object,
};
LoadingBase.defaultProps = {
	objectStyle: null,
};

export default LoadingBase;
