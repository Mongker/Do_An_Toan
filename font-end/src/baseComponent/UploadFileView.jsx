/* eslint-disable */
import React from 'react';
import { Upload, message } from 'antd';
import PropTypes from 'prop-types';

// Util
import { BASE_URL_IMAGE } from '../util/TypeApi';

// styles
import _styles from './styles/index.module.scss';
import baseAPI from '../axios/baseAPI';

function beforeUpload(file) {
	// const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
	const isJpgOrPng = file.type.includes('image');
	if (!isJpgOrPng) {
		message.error('You can only upload JPG/PNG file!');
	}
	const isLt2M = file.size / 1024 / 1024 < 2;
	if (!isLt2M) {
		message.error('Image must smaller than 2MB!');
	}
	return isJpgOrPng && isLt2M;
}

// const
const getBase64 = async (file) => {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = () => resolve(reader.result);
		reader.onerror = (error) => reject(error);
	});
};
function UploadFileView(props) {
	const {
		refFunc,
		Img,
		styles,
		imgDefault,
		callback = () => {},
		fileListUtil,
		linkFileUtil,
		setLinkFileUtil,
		setFileListUtil,
		limit,
		listLinkFileUtil,
		setListLinkFileUtil,
		accept,
	} = props;
	const [linkFile, setLinkFile] = React.useState('');
	const [listLinkFile, setListLinkFile] = React.useState([]);
	const [fileList, setFileList] = React.useState([]);
	const [isNext, setIsNext] = React.useState(true);

	// const linkFileView = linkFile ? BASE_URL_IMAGE + linkFile : imgDefault;

	// handle func
	const onChange = (info) => {
		setFileList(info.fileList);
		setFileListUtil(info.fileList);
		setIsNext(false);
		switch (info.file.status) {
			case 'uploading':
				break;
			case 'done':
				// message.success('Thêm thành công');
				setLinkFile(info.file.response.fileNameInServer);
				setLinkFileUtil(info.file.response.fileNameInServer);
				// Note:
				setIsNext(true);
				listLinkFile.push(info.file.response.fileNameInServer);
				setListLinkFile([...listLinkFile]);

				const fileList = [...info.fileList];
				fileList.splice(info.fileList.length - 1, 1, {
					uid: info.file.response.fileNameInServer,
					name: info.file.response.fileNameInServer,
					status: 'done',
					url: BASE_URL_IMAGE + info.file.response.fileNameInServer,
				});
				console.log('info.file', info.file.response); // MongLV log fix bug
				setFileListUtil(fileList);

				break;
			case 'removed':
				const listFilter = listLinkFile.filter((item) => item !== info.file.uid);
				setListLinkFile([...listFilter]);
				setListLinkFileUtil([...listFilter]);
				if (listFilter.length === 0) {
					setLinkFile('');
					setLinkFileUtil('');
					setFileList([]);
				}
				setIsNext(true);
				break;
			default:
				// message.error(`${info.file.name}`);
				setLinkFile('');
				setLinkFileUtil('');
				break;
		}
	};

	const handleResetState = () => {
		setLinkFile('');
		setListLinkFile([]);
		setFileList([]);
		setIsNext(true);
	};

	// Props
	const UpFile = {
		name: 'file',
		action: `${BASE_URL_IMAGE}/upload`,
		multiple: true,
		onChange: (info) => onChange(info),
	};

	// Vòng đời
	React.useEffect(() => {
		// Gán ref cho phần tử cha sử dụng lại
		refFunc.current = {
			linkFile,
			setLinkFile,
			setFileList,
			handleResetState,
		};
	});
	React.useEffect(() => {
		linkFile && callback(linkFile);
	}, [linkFile, fileList, listLinkFile]);

	React.useEffect(() => {
		setFileList(fileListUtil);
		setLinkFile(linkFileUtil);
		setListLinkFile(listLinkFileUtil);
	}, [fileListUtil, linkFileUtil, listLinkFileUtil]);

	// React.useEffect(() => {
	// 	listLinkFilesetListLinkFileUtil(listLinkFile);
	// }, [listLinkFile]);

	return (
		<div className={styles.upload_file}>
			<Upload
				{...UpFile}
				fileList={fileList}
				listType="picture-card"
				accept={accept}
				beforeUpload={beforeUpload}
			>
				{fileList.length <= limit && isNext ? (
					<img
						alt="example"
						src={imgDefault}
						style={{ width: Img.width, height: Img.height }}
					/>
				) : null}
			</Upload>
		</div>
	);
}
UploadFileView.propTypes = {
	refFunc: PropTypes.object,
	styles: PropTypes.object,
	Img: PropTypes.object,

	imgDefault: PropTypes.string,
	linkFileUtil: PropTypes.string,
	accept: PropTypes.string,

	callback: PropTypes.func,
	setLinkFileUtil: PropTypes.func,
	setFileListUtil: PropTypes.func,
	setListLinkFileUtil: PropTypes.func,

	fileListUtil: PropTypes.array,
	listLinkFileUtil: PropTypes.array,

	// refFunc, Img, styles, imgDefault, callback = () => {}
	limit: PropTypes.number,
};

UploadFileView.defaultProps = {
	Img: { width: 50, height: 50 },
	refFunc: { current: null },
	styles: _styles,
	imgDefault: 'https://img.icons8.com/cotton/344/image--v1.png',
	setLinkFileUtil: () => null,
	setFileListUtil: () => null,
	setListLinkFileUtil: () => null,
	linkFileUtil: '',
	fileListUtil: [],
	listLinkFileUtil: [],
	limit: 0,
	accept: 'image/png, image/jpeg',
};
export default React.memo(UploadFileView);
