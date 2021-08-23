import React, { useState } from "react"
import { useShopify } from "../hooks"
import Drawer from 'react-modern-drawer'
import 'react-modern-drawer/dist/index.css'
import { Article, FaGem, FaHeart } from "phosphor-react";
import ReactiveButton from 'reactive-button';
import { ProSidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
import { Navigation } from 'react-minimal-side-navigation';
import 'react-minimal-side-navigation/lib/ReactMinimalSideNavigation.css';

export default (props) => {
	const { shopDetails } = useShopify();

	const [isOpen, setIsOpen] = useState(false)
	const toggleDrawer = () => {
		setIsOpen((prevState) => !prevState)
	}

	const [state, setState] = useState('idle');

	const onClickHandler = () => {
		setState('loading');
		setTimeout(() => {
			setState('success');
		}, 2000);
	}

	return (
		<div>
			<div className="header">
				<button onClick={toggleDrawer}><Article size={48} weight="duotone" /></button>
				<Drawer open={isOpen} onClose={toggleDrawer} direction='left'>
					{/* <Menu iconShape="square">
						<MenuItem>Dashboard</MenuItem>
						<MenuItem title="Components">Components</MenuItem>
						<MenuItem title="1" >1</MenuItem>
						<MenuItem title="2" >2</MenuItem>
						<MenuItem title="3" >3</MenuItem>
						<MenuItem title="4" >4</MenuItem>
						<MenuItem title="5" >5</MenuItem>
						<MenuItem title="6" >6</MenuItem>
						<MenuItem title="7" >7</MenuItem>

					</Menu> */}
					<Navigation
						// you can use your own router's api to get pathname
						activeItemId="/management/members"
						onSelect={({ itemId }) => {
							// maybe push to the route
						}}
						items={[
							{
								title: 'Manu Item 1',
								itemId: '/manuitem1',
								// you can use your own custom Icon component as well
								// icon is optional
								// elemBefore: () => <Icon name="inbox" />,
							},
							{
								title: 'Manu Item 2',
								itemId: '/manitem2',
								// you can use your own custom Icon component as well
								// icon is optional
								// elemBefore: () => <Icon name="inbox" />,
							},
							{
								title: 'Manu Item 3',
								itemId: '/manuitem3',
								// you can use your own custom Icon component as well
								// icon is optional
								// elemBefore: () => <Icon name="inbox" />,
							},
							{
								title: 'Manu Item 4',
								itemId: '/manuitem4',
								// you can use your own custom Icon component as well
								// icon is optional
								// elemBefore: () => <Icon name="inbox" />,
							},
							{
								title: 'Manu Item 5',
								itemId: '/manuitem5',
								// you can use your own custom Icon component as well
								// icon is optional
								// elemBefore: () => <Icon name="inbox" />,
							},
							{
								title: 'Manu Item 6',
								itemId: '/manuitem6',
								// you can use your own custom Icon component as well
								// icon is optional
								// elemBefore: () => <Icon name="inbox" />,
							},
							{
								title: 'Manu Item 7',
								itemId: '/manuitem7',
								// you can use your own custom Icon component as well
								// icon is optional
								// elemBefore: () => <Icon name="inbox" />,
							},
							{
								title: 'Manu Item 8',
								itemId: '/manuitem8',
								// you can use your own custom Icon component as well
								// icon is optional
								// elemBefore: () => <Icon name="inbox" />,
							},


							{
								title: 'Manu Item 9',
								itemId: '/manuitem9',
								subNav: [

								],
							},
						]}
					/>
				</Drawer>
				<div>
					<ReactiveButton
						buttonState={state}
						onClick={onClickHandler}
						color="light"
						size='small'
					/>
				</div>
			</div>

			<header className="App__header">

				<div className="App__title">
					<h1>{shopDetails.name}: React / Redux Example</h1>
					<h2>{shopDetails.description}</h2>
				</div>
			</header>
		</div>
	)
}
