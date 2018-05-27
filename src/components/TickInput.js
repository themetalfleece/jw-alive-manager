import React from 'react';

const tickInput = props => {

    return <input
        className=""
        type="checkbox"
        checked={props.checked || false}
        onChange={props.onChange}
        disabled={props.disabled}
    />

};

export default tickInput;