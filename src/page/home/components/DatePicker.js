// // 头部 选择时间插件
// import React from 'react';
// import { connect } from 'react-redux';
// import colors from "json/color"
// import {
//     Icon
// } from "antd"

// let temp = null;
// class DatePicker extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             weekList: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
//             // weekList:['日','一','二','三','四','五','六'],
//             // monthList:[1,2,3,4,5,6,7,8,9,10,11,12],
//             monthList: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
//             dateList: [],
//             year: new Date().getFullYear(),
//             month: new Date().getMonth() + 1,
//             currentDay: new Date().getDate(),
//             today: this.setYMD(),
//             ymd: this.setYMD(new Date(+new Date() - 0 * 24 * 60 * 60 * 1000)),
//         }
//         this.dateArr = this.dateArr.bind(this)
//         this.getCountDays = this.getCountDays.bind(this)
//         this.getUpDay = this.getUpDay.bind(this)
//         this.setYMD = this.setYMD.bind(this)
//         this.changeMonth = this.changeMonth.bind(this)
//         this.isActive = this.isActive.bind(this)
//         this.addClassName = this.addClassName.bind(this)
//         this.changeData = this.changeData.bind(this)
//         this.formatChangeData = this.formatChangeData.bind(this)
//     }
//     UNSAFE_componentWillMount() {
//         let { currentDay, month, year } = this.state;
//         this.dateArr(year + '-' + month + '-' + currentDay)
//     }
//     componentDidMount() {
//         let { ymd } = this.state;
//         this.props.changeDate(ymd.join('-'))
//         let { DTpickerheader, DTpicker_t, DTpicker } = this.refs;
//         if (!DTpickerheader || !DTpicker_t || !DTpicker) return;

//     }
//     getColors = () => {
//         var color = this.getRandomArr(7, 16)
//         var site = [2, 3, 4, 5, 6, 7, 8];
//         var lists = []

//         for (var l = color.length, i = 0; i < l; i++) {
//             var list = colors[color[i]].shades
//             var arr = []
//             for (let len = site.length, index = 0; index < len; index++) {
//                 arr.push(list[site[index]].hex)
//             }
//             lists.push(arr)
//         }
//         return lists

//     }
//     getRandomArr = (length, max, min = 0) => {
//         var arr = []
//         if (!length || !max) return arr
//         while (arr.length < length) {
//             var random = Math.floor(Math.random() * (max - min) + min);
//             if (!arr.includes(random)) {
//                 arr.push(random)
//             }
//         }
//         return arr
//     }
//     setYMD(date) {   //设置年月日
//         date = date || new Date();
//         let year = date.getFullYear();
//         let month = date.getMonth() + 1;
//         let currentDay = date.getDate();
//         return [year, month, currentDay]
//     }
//     getCountDays(timeFormat) { //返回某月天数
//         var arr = timeFormat.split('-');
//         var date = new Date(Number(arr[0]), Number(arr[1]), 0);
//         return date.getDate();
//     }
//     getUpDay(date) { //返回上个月的天数
//         var arr = date.split('-'), timeFormat;
//         if (arr[1] == 1) {
//             timeFormat = arr[0] - 1 + '-' + 12 + '-' + 1;
//         } else {
//             timeFormat = arr[0] + '-' + (arr[1] - 1) + '-' + 1;
//         }
//         return this.getCountDays(timeFormat);
//     }
//     dateArr(date) {   //设置listArr

//         let listArr = [];
//         var arr = date.split('-');
//         let startDay = this.getUpDay(date);
//         let cDate = this.getCountDays(date);
//         let startWeek = new Date(arr[0] + '-' + arr[1] + '-' + 1).getDay();
//         let endWeek = new Date(arr[0] + '-' + arr[1] + '-' + cDate).getDay();
//         let year = Number(arr[0])
//         let month = Number(arr[1])
//         let next;
//         let last;
//         if (month <= 1) {
//             last = [year - 1, 12];
//         } else {
//             last = [year, month - 1];
//         }
//         if (month >= 12) {
//             next = [year + 1, 1];
//         } else {
//             next = [year, month + 1];
//         }
//         for (var i = 1; i <= cDate; i++) {
//             listArr.push({
//                 year: year,
//                 month: month,
//                 day: i,
//                 sign: 1
//             });
//         }
//         if (startWeek != 0) {
//             for (var i = startDay; i > startDay - startWeek; i--) {
//                 listArr.unshift({
//                     year: last[0],
//                     month: last[1],
//                     day: i,
//                     sign: 0
//                 });
//             };
//         }
//         if (endWeek != 6) {
//             for (var i = 1; i <= 6 - endWeek; i++) {
//                 listArr.push({
//                     year: next[0],
//                     month: next[1],
//                     day: i,
//                     sign: 2
//                 });
//             };
//         }
//         if (i > 5) {
//             i = 0;
//         }
//         this.setState({
//             dateList: listArr
//         })
//     }
//     changeMonth(num) {   // 改变月份
//         let timeFormat;
//         let { year, month, currentDay } = this.state;
//         if (month <= 1 && num < 0) {
//             year -= 1;
//             month = 12;
//         } else if (month >= 12 && num > 0) {
//             year += 1;
//             month = 1;
//         } else {
//             month += num
//         }
//         timeFormat = year + '-' + month + '-' + currentDay
//         this.dateArr(timeFormat)
//         this.setState({
//             year, month, currentDay
//         })
//     }
//     isActive(params) { // 判断是否为选中的时间
//         let { ymd } = this.state;
//         let { y, m, d } = params;
//         if (ymd[0] == y && ymd[1] == m && ymd[2] == d) {
//             return true
//         }
//         return false;
//     }
//     addClassName(params) {
//         let className = '';
//         if (this.isActive(params)) {
//             className += ' active'
//         }
//         return className
//     }
//     formatChangeData(params) {
//         let { y, m, d, sign } = params;
//         let format = [y, m, d]
//         return this.changeData(format)
//     }
//     changeData(params) {

//         this.props.changeDate(params.join('-'))
//         this.setState({
//             ymd: params
//         })
//     }
//     render() {
//         let { date, changeDate } = this.props;
//         let { weekList, dateList, ymd, monthList, month, year, today } = this.state;
//         let y = today[0];
//         let m = today[1];
//         let d = today[2];
//         if (dateList.length <= 0) return <div />
//         var colorlist = this.getColors()
//         let list = [
//             dateList.slice(0, 7),
//             dateList.slice(7, 14),
//             dateList.slice(14, 21),
//             dateList.slice(21, 28),
//             dateList.slice(28, 35),
//         ];
//         if (dateList.length > 35) {
//             list.push(dateList.slice(35))
//         }
//         return (
//             <div ref="DTpicker" id="DTpicker" className="DTpicker">
//                 <div className="DTpicker_t" ref="DTpicker_t">
//                     <p><span>{monthList[month - 1]}</span></p>
//                 </div>
//                 <span onClick={() => this.changeMonth(-1)} className="DTpicker_t_l"> <Icon type="left" /> </span>
//                 <span onClick={() => this.changeMonth(1)} className="DTpicker_t_r"> <Icon type="right" /> </span>
//                 <div className="DTpicker_m">
//                     <ul className="DTpicker_head" key="thead">
//                         {
//                             weekList.map((v, k) => {
//                                 return <li key={k}>{v}</li>
//                             })
//                         }
//                     </ul>
//                     {
//                         list.map((v, k) => {
//                             var color = colorlist[k]
//                             var className = k == 0 ? "DTpicker_content mt5" : "DTpicker_content"
//                             return <ul className={className} key={"tr" + k}>
//                                 {
//                                     v.map((value, key) => {
//                                         let { year, month, day, sign } = value;
//                                         if (sign != 1) {
//                                             return <li style={{ backgroundColor: color[key] }} key={key}></li>
//                                         }
//                                         return <li style={{ backgroundColor: color[key] }} key={key}>{day}</li>
//                                     })
//                                 }
//                             </ul>
//                         })
//                     }
//                 </div>
//             </div>
//         )
//     }
// }
// // const mapStateToProps = (state, ownprop) => {
// //     return {
// //         date: ownprop.date
// //     }
// // }
// export default DatePicker