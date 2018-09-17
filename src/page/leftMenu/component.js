import {
	Menu,
	Icon
} from 'antd';
import { Link } from 'react-router-dom'
import React from "react"
import logo from "images/logo.jpg"
import weijie from "images/name.png"
import "./css.css"
const SubMenu = Menu.SubMenu;

export default class LeftMenu extends React.Component {

	submenuKeys = {};
	state = {
		openKeys: [],
		selectedKeys: [],
		keys: []
	};
	// goRecord = (e,value)=>{
	// e.stopPropagation();
	// e.preventDefault()
	// history.push("/record/"+value._id )
	// console.log(value)
	// }
	getMenuList = () => {
		this.submenuKeys = {}
		var { menuInfos } = this.props;
		var menuList = menuInfos.menuList || []

		return menuList.map((v, k) => {
			return this.getMenu(v, k)
		})
	}
	getMenu = (obj, index = 0, temp = "r") => {
		var key = temp + "-" + index
		var childrens = obj.childrens;
		if (!childrens || !childrens.length) {
			// if(obj.manner == "record"){

			// return  <Menu.Item key={key}>
			// 			<a href="javascript:;" onClick={(e)=>this.goRecord(e,obj)}>{obj.title}</a>
			// 		</Menu.Item>
			// }
			return <Menu.Item key={key}>
				<Link to={obj.url}>{obj.title}</Link>
			</Menu.Item>
		} else {
			if (!this.submenuKeys[temp]) {
				this.submenuKeys[temp] = []
			}
			this.submenuKeys[temp].push(key)
			return <SubMenu title={obj.title} key={key}>
				{
					childrens.map((val, i) => {
						return this.getMenu(val, i, key)
					})
				}
			</SubMenu>
		}
	}
	onSelectedItem = (obj) => {
		this.setState({
			selectedKeys: [obj.key]
		});
	}
	empty = () => { }

	clickHandle = () => {
		this.props.menutoggleAction(false)
	}
	leftClickHandle = (e) => {
		var target = e.target;
		if (target.tagName !== "A") {
			e.nativeEvent.stopPropagation()
			e.stopPropagation()
		}
	}
	render() {
		var { menutoggleModel } = this.props
		return (
			<div ref="wrap" className={menutoggleModel ? "left-warp" : ""} onClick={menutoggleModel ? this.clickHandle : this.empty}>
				<div className="left" onClick={menutoggleModel ? this.leftClickHandle : this.empty}>
					{
						menutoggleModel ? <Icon type="close" onClick={this.clickHandle} className="left-close" /> : null
					}
					<div className="wrap-logo">
						<div className="logo">
							<img src={logo} alt="" />
						</div>
						<div className="name">
							<img src={weijie} alt="" />
						</div>
						<p className="description">选择你的热爱，或者热爱你的选择</p>
					</div>
					<div className="left-menu">
						<Menu mode="inline">
							{
								this.getMenuList()
							}
						</Menu>
					</div>
				</div>
			</div>
		);
	}
}
