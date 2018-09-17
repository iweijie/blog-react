
import React, { Component } from 'react';

class Aside extends Component {
    gotoDom = (id) => {
        var element = document.getElementById(id);
        element.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
    }
    getNav = (arr, level = 1, per = "") => {
        var className = "articl-aside-level-" + level
        return <ul className="articl-aside-ul">
            {
                arr.map((v, k) => {
                    return (<li key={v.id}>
                        <p className={className}>
                            {per ? <span>{per}</span> : null}
                            <span style={{ paddingRight: "15px" }}>{k + 1}.</span>
                            <span className="articl-aside-name" onClick={() => this.gotoDom(v.id)}>{v.name}</span>
                        </p>
                        {
                            v.child && v.child.length ?
                                this.getNav(v.child, level + 1, per + level + ".")
                                : null

                        }
                    </li>)
                })
            }
        </ul>
    }
    render() {
        var { nav } = this.props
        var child = nav ? this.getNav(nav) : null
        // var className = isShow && nav ? "articl-aside" : "articl-aside none"
        return (
            <div className="articl-aside">
                {child}
            </div>
        );
    }
}
export default Aside
