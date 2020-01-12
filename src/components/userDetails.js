import React, { useEffect } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import { fetchUseDetails } from "../modules/userDetails";

const UserDetails = props => {
  useEffect(
    () => props.fetchUseDetails(props.match.params.userId),
    // eslint-disable-next-line
    []
  );
  return <h1>{JSON.stringify(props.userDetails)}</h1>;
};

const mapStateToProps = (state, props) => ({
  userDetails: state.userDetails[props.match.params.userId]
    ? state.userDetails[props.match.params.userId]
    : {}
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchUseDetails
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(UserDetails);
