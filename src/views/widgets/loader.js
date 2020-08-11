import React from 'react';

const loader = ({loading}) => {
  return (loading ? <div className="loader"><i className="fa fa-sync fa-spin center" /></div> : '');
}

export default loader
