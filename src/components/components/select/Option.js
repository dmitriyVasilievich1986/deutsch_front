import PropTypes from 'prop-types';
import React from 'react';

function Option(props) {
  return (
    <div
      className={props.className}
      onClick={props.onClick}
    >
      {
        (React.Children.count(props.children) !== 1 || typeof (React.Children.toArray(props.children)[0]) !== "string") ?
          props.value : props.children
      }
    </div>
  );
}

Option.PropTypes = {
  value: PropTypes.string.isRequired,
};

export default Option