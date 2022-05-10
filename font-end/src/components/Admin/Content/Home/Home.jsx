import React from 'react';
import { Badge, Calendar, Tabs } from 'antd';
import { AndroidOutlined, AppleOutlined } from '@ant-design/icons';
import style from './styles.module.scss';
import moment from 'moment';
import Dashboard from './Dashboard/Dashboard';
// import PropTypes from 'prop-types';
const { TabPane } = Tabs;
const visitData = [];
const beginDay = new Date().getTime();
for (let i = 0; i < 20; i += 1) {
	visitData.push({
		x: moment(new Date(beginDay + 1000 * 60 * 60 * 24 * i)).format('YYYY-MM-DD'),
		y: Math.floor(Math.random() * 100) + 10,
	});
}
function Home() {
	function getListData(value) {
		let listData;
		switch (value.date()) {
			case 8:
				listData = [
					{ type: 'warning', content: 'This is warning event.' },
					{ type: 'success', content: 'This is usual event.' },
				];
				break;
			case 10:
				listData = [
					{ type: 'warning', content: 'This is warning event.' },
					{ type: 'success', content: 'This is usual event.' },
					{ type: 'error', content: 'This is error event.' },
				];
				break;
			case 15:
				listData = [
					{ type: 'warning', content: 'This is warning event' },
					{ type: 'success', content: 'This is very long usual event。。....' },
					{ type: 'error', content: 'This is error event 1.' },
					{ type: 'error', content: 'This is error event 2.' },
					{ type: 'error', content: 'This is error event 3.' },
					{ type: 'error', content: 'This is error event 4.' },
				];
				break;
			default:
		}
		return listData || [];
	}
	function dateCellRender(value) {
		const listData = getListData(value);
		return (
			<ul className="events">
				{listData.map((item) => (
					<li key={item.content}>
						<Badge status={item.type} text={item.content} />
					</li>
				))}
			</ul>
		);
	}
	function getMonthData(value) {
		if (value.month() === 8) {
			return 1394;
		}
	}
	function monthCellRender(value) {
		const num = getMonthData(value);
		return num ? (
			<div className="notes-month">
				<section>{num}</section>
				<span>Backlog number</span>
			</div>
		) : null;
	}
	return (
		<div className={style.app_main}>
			<Tabs defaultActiveKey="1">
				<TabPane
					tab={
						<span>
							<AppleOutlined />
							Biểu đồ
						</span>
					}
					key="1"
				>
					<Dashboard />
				</TabPane>
				<TabPane
					tab={
						<span>
							<AndroidOutlined />
							Lịch
						</span>
					}
					key="2"
				>
					<div className={style.lich}>
						<Calendar dateCellRender={dateCellRender} monthCellRender={monthCellRender} />
					</div>
				</TabPane>
			</Tabs>
		</div>
	);
}

Home.propTypes = {};

Home.defaultProps = {};

export default React.memo(Home);
