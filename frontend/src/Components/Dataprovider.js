import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

const mId = sessionStorage.getItem('mId');

const DataProvider = (props) => {
  const [allValues, setAllValues] = useState({
    data: [],
    loaded: false,
    placeholder: "",
  });

  //   只要每次重新渲染後 props.endpoint 內的元素沒有改變，任何 useEffect 裡面的函式就不會被執行！
  useEffect(() => {
      fetch(props.endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ mId })
      })
      .then((response) => {
        if (response.status !== 200) {
          return setAllValues({
            ...allValues,  // The JavaScript spread operator (...) allows us to quickly copy all or part of an existing array or object into another array or object.
            placeholder: "Something went wrong",
          });
        }
        return response.json();
      })
      .then((data) => setAllValues({ data: data, loaded: true }));
  }, [props.endpoint]); 


  const { data, loaded, placeholder } = allValues;
  return loaded ? props.render(data) : <p>{placeholder}</p>;
};

DataProvider.propTypes = {
  endpoint: PropTypes.string.isRequired,
  render: PropTypes.func.isRequired,
};

export default DataProvider;
