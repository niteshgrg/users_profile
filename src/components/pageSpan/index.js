import React, { useEffect, useState } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import { changePageNumber, onChangeItemsPerPage } from "../../modules/pageInfo";

import "./pageSpan.scss";

function PageNumbers(props) {
  const [pageNumbers, setPageNumbers] = useState([]);

  useEffect(() => {
    let tempPageNumbers = [];
    for (
      let i = 1;
      i <= Math.ceil(props.pageInfo.total / props.pageInfo.per_page);
      i++
    ) {
      tempPageNumbers.push(i);
    }
    setPageNumbers(tempPageNumbers);
    // eslint-disable-next-line
  }, [props.pageInfo.total]);

  return [
    <div key="page-numbers">
      {pageNumbers.map(number => {
        let classes = props.pageInfo.current_page === number ? "active" : "";

        return (
          <span
            key={number}
            className={classes}
            onClick={() => props.changePageNumber(number)}
          >
            {number}
          </span>
        );
      })}
    </div>,
    <div key="items-dropdown" className="items_dropdown">
      <div>Items Per Page:</div>
      <select
        value={props.pageInfo.per_page}
        onChange={e => props.onChangeItemsPerPage(e.target.value)}
      >
        {Array.from(
          { length: props.pageInfo.total },
          (v, k) => k + Math.ceil(props.pageInfo.total / 10)
        ).map(number => (
          <option key={number} value={number}>
            {number}
          </option>
        ))}
      </select>
    </div>
  ];
}

const mapStateToProps = state => ({
  pageInfo: state.pageInfo
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      changePageNumber,
      onChangeItemsPerPage
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(PageNumbers);
