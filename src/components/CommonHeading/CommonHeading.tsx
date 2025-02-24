import React from "react";
import './CommonHeading.css'

interface Props {
    title: String
}

const CommonHeading: React.FC<Props> = ({ title }) => {
    return (
        <div className="heading-container">
            {/* <p>CommonHeading</p> */}
            <h1 className="heading-text">{title}</h1>
        </div>
    )
}

export default CommonHeading;