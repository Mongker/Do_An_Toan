/* eslint-disable */
import React from 'react';
import './App.css';
import 'antd/dist/antd.css';
import 'ant-design-pro/dist/ant-design-pro.css';
import { useDispatch } from 'react-redux';
import { LoginUser } from './actions/userAction';
import { ContextApp } from './context/contextApp';
//import react router
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import MessengerCustomerChat from 'react-messenger-customer-chat';

// component lazy
const Login = React.lazy(() => import('./components/Login'));
const Register = React.lazy(() => import('./components/Register/register'));
const MainLayout = React.lazy(() => import('./components/MainLayout'));
const TestAPI = React.lazy(() => import('./components/Demo/testMaiDao'));
const LayoutAdmin = React.lazy(() => import('./components/Admin'));
const DetailProduct = React.lazy(() =>
	import('./components/Content/DetailProduct/DetailProduct')
);
const IntroduceProduct = React.lazy(() =>
	import('./components/Header/slider/introduceProduct/introduceProduct')
);
const BuyProduct = React.lazy(() =>
	import('./components/Content/DetailProduct/BuyProduct/BuyProduct')
);
const CartProduct = React.lazy(() => import('./components/CartProduct/CartProduct'));
const AccountMe = React.lazy(() => import('./components/Account/AccountMe'));
const LienHe = React.lazy(() =>
	import('./components/Header/slider/LienHeChungToi/LienHe')
);
const LoginAdmin = React.lazy(() => import('./components/Admin/Login/LoginAdmin'));
const TatCaSP = React.lazy(() => import('./components/Content/GoiYChoBan/TatCaSP'));
const WatchCatagory = React.lazy(() => import('./components/AllProduct/WatchCatagory'));
const AllFlashSale = React.lazy(() =>
	import('./components/Content/FlashSale/AllFlashSale/AllFlashSale')
);
const AllNoiBat = React.lazy(() =>
	import('./components/Content/Sanphamnoibat/AllNoiBat/AllNoiBat')
);

const RegisterAdmin = React.lazy(() =>
	import('./components/Admin/Register/registerAdmin')
);
const MenuAntd = React.lazy(() => import('./components/Admin/TestAntd/menuAntd'));
const ShoppingGuider = React.lazy(() =>
	import('./components/Header/ShoppingGuide/ShoppingGuide')
);

// hooks
import useProductLogicData from './hooks/useProductLogicData';

// util
import LoadingBase from './baseComponent/LoadingBase';

function App() {
	// hooks
	const dispatch = useDispatch();
	const { getListProduct } = useProductLogicData();

	// state
	const [selectedRowKeys, setSelectedRowKeys] = React.useState([]);
	const [textSearch, setTextSearch] = React.useState('');

	// Vòng đời
	React.useEffect(() => {
		localStorage && dispatch(LoginUser(localStorage));
		getListProduct();
	}, []);

	return (
		<ContextApp.Provider
			value={{ selectedRowKeys, setSelectedRowKeys, textSearch, setTextSearch }}
		>
			<React.Suspense fallback={<LoadingBase />}>
				<Router>
					<Switch>
						<Route path="/login" exact component={Login} />
						<Route path="/register" exact component={Register} />
						<Route path="/demo" exact component={TestAPI} />
						<Route path="/test" exact component={MenuAntd} />
						<Route path="/" exact component={MainLayout} />
						<Route path="/homeAdmin" exact component={LayoutAdmin} />
						<Route path="/admin" exact component={LoginAdmin} />
						<Route path="/registerAdmin" exact component={RegisterAdmin} />
						<Route path="/detail/:id" exact component={DetailProduct} />
						<Route path="/gioithieu" exact component={IntroduceProduct} />
						<Route path="/buyproduct" exact component={BuyProduct} />
						{/*<Route path="/buyproduct/:id" exact component={BuyProduct} />*/}
						<Route path="/cart" exact component={CartProduct} />
						<Route path="/account" exact component={AccountMe} />
						<Route path="/lienhe" exact component={LienHe} />
						<Route path="/tatca" exact component={TatCaSP} />
						<Route path="/xemtheomenu" exact component={WatchCatagory} />
						<Route path="/flashsale" exact component={AllFlashSale} />
						<Route path="/allnoibat" exact component={AllNoiBat} />
						<Route path="/guider" exact component={ShoppingGuider} />
					</Switch>
				</Router>
			</React.Suspense>
			<MessengerCustomerChat pageId="106941058270737" appId="168962168507958" />
		</ContextApp.Provider>
	);
}

export default React.memo(App);
