import React from 'react';

import style from './styles/index.module.scss';

import useImageZoom from 'react-image-zoom-hook';

function AppWithZoomCustomization(props) {
	const {
		previewImg,
		img,
		previewLensHeight,
		lensWidth,
		lensHeight,
		imgWidth,
		imgHeight,
	} = props;
	/**

	 * Necessary inputs for useImageZoomHook

	 */

	/**

	 * The ratio of lens height and width on main image and the zoom image also

	 * should remain same for correct working.

	 */
	const {
		moveLens,

		imgDimesions,

		lensDimensions,

		previewLensDimensions,

		previewImgDimensions,

		imgContainerDimesions,

		imgRefCallback,

		meshRefCallback,

		imagePreviewRefCallback,
	} = useImageZoom({
		imgHeight,

		imgWidth,

		lensHeight,

		lensWidth,

		previewLensHeight,

		img,

		previewImg,
	});

	/**

	 * Two images are involved here, user need to have a actual image and

	 * one good quality image with higher resolution

	 */

	return (
		<div className={style.container}>
			<div
				className={style['img-main-container']}
				onMouseMove={moveLens}
				style={{
					...imgContainerDimesions,
				}}
			>
				<div
					ref={meshRefCallback}
					className="mesh"
					style={{
						...lensDimensions,
					}}
				/>

				<img
					style={{
						...imgDimesions,
					}}
					ref={imgRefCallback}
					alt="test"
					src={img}
				/>
			</div>

			<div
				className={style['img-preview-section-container']}
				// ref={imagePreviewRefContainer}

				style={{
					...previewLensDimensions,
				}}
			>
				<img
					ref={imagePreviewRefCallback}
					alt="test-preview"
					src={previewImg}
					style={{
						...previewImgDimensions,
					}}
					className={style['img-preview-section']}
				/>
			</div>
		</div>
	);
}
AppWithZoomCustomization.defaultProps = {
	imgHeight: 416,
	imgWidth: 376,
	lensHeight: 100,
	lensWidth: 100,
	previewLensHeight: 600,
	img:
		'https://rukminim1.flixcart.com/image/416/416/jz30nm80/bedsheet/q/z/s/comfort-living-100-cotton-double-bedsheet-with-2-pillow-covers-original-imafj69wjzahmcw5.jpeg?q=70',
	previewImg:
		'https://rukminim1.flixcart.com/image/1664/1664/jz30nm80/bedsheet/q/z/s/comfort-living-100-cotton-double-bedsheet-with-2-pillow-covers-original-imafj69wjzahmcw5.jpeg?q=90',
};
export default React.memo(AppWithZoomCustomization);
