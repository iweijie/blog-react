
import React, { PureComponent } from 'react';
import tagsJson from "json/tags"
class Tags extends PureComponent {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <ul className="home-tags clearfix">
                {
                    tagsJson.map(v => {
                        return <li key={v.id}>{v.tagname} <span>[{v.sum}]</span></li>
                    })
                }
            </ul>
        )
    }
}

export default Tags