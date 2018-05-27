import React from 'react';

const numInput = props => {
    const finalVal = props.value || '';

    if (props.locked) {
        return finalVal;
    }

    return <input
        className="nameInput"
        type="text"
        value={finalVal}
        onChange={props.onChange}
        disabled={props.disabled}
    />

};

export default numInput;