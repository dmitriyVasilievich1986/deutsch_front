import PropTypes from 'prop-types';
import className from 'classnames';
import Option from './Option';
import React from 'react';


function Select(props) {
  const optionsList = React.Children.toArray(props.children)
    .filter(c => React.isValidElement(c) && c.type === Option)
    .map((c, i) => (
      <Option
        className={className("group_item")}
        value={c.props.value}
        key={i}
        onClick={_ => {
          setValue(c.props.value)
          setShow(false)
        }}
      >
        {c.props.children || c.props.value}
      </Option>
    ));

  const [value, setValue] = React.useState(props.value || "");
  const [filter, setFilter] = React.useState("");
  const [show, setShow] = React.useState(false);
  const listRef = React.useRef(null)

  React.useEffect(_ => {
    getValueForFilter(value);
    props?.changeHandler && props.changeHandler(value);
  }, [value])

  React.useEffect(_ => {
    if (show) {
      setFilter("");
    } else {
      const fl = filteredList();
      getValueForFilter(fl.length === 1 ? fl[0].props.value : value);
    }
  }, [show])

  React.useEffect(_ => {
    const clickPoutsideHandler = e => {
      if (listRef.current && !listRef.current.contains(e.target)) {
        setShow(false);
      }
    }
    document.addEventListener("mousedown", clickPoutsideHandler);
    return _ => { document.removeEventListener("mousedown", clickPoutsideHandler) }
  }, [listRef])

  const getValueForFilter = newValue => {
    const item = optionsList.find(c => c.props.value === newValue);
    setFilter(item ? item.props.children : newValue);
  }

  const filteredList = _ => {
    return optionsList.filter(o => (
      filter === "" || o.props.children.toLocaleLowerCase().includes(filter.toLocaleLowerCase())
    ));
  }

  const keyDownHandler = e => {
    if (e.code === "Enter") {
      e.target.blur();
      setShow(false);
    } else if (e.code === "Escape") {
      getValueForFilter(value);
      e.target.blur();
      setShow(false);
    }
  }

  return (
    <div className={className('group_list_wrapper')}>
      <input
        onChange={e => setFilter(e.target.value)}
        className={className("input")}
        onFocus={_ => setShow(true)}
        onKeyDown={keyDownHandler}
        value={filter}
        type="text"
      />

      <div
        className={className("group_list", { show })}
        ref={listRef}
      >
        {show && filteredList()}
      </div>
    </div>
  );
}

Select.PropTypes = {
  changeHandler: PropTypes.func,
  value: PropTypes.string,
}

export default Select