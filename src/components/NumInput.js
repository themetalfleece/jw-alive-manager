import React from 'react';

const numInput = props => {
    const finalVal = props.value || 0;

    if (props.locked) {
        return finalVal;
    }

    return <input
        className="numInput form-control"
        type="number"
        value={finalVal}
        onChange={props.onChange}
        disabled={props.disabled}
    />

};

export default numInput;