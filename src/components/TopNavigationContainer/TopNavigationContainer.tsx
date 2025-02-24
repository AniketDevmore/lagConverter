import React from "react";
import './TopNavigationContainer.css'

const TopNavigationContainer: React.FC = () => {
    const navigationTags = ['1','2','3','4','5','6','7','8','9','10'];
    // const width = 
    return (
        <div className="navigation-container">
            {/* <p>TopNavigationContainer</p> */}
            {navigationTags.map(ele=> (
                <h4 className="nav-tags">{ele}</h4>
            ))}
            <i className="fa-solid fa-bars" />
        </div>
    )
}

export default TopNavigationContainer;