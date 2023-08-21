import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

const DataProvider = (props) => {
  const [allValues, setAllValues] = useState({
    data: [],
    loaded: false,
    placeholder: "Loading...",
  });

  useEffect(() => {
    fetch(props.endpoint)
      .then((response) => {
        if (response.status !== 200) {
          return setAllValues({
            ...allValues, 
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