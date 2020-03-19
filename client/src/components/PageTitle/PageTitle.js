import React from 'react';
import './PageTitle.scss';



class PageTitle extends React.Component {

  render() { 
    return (
      <h1 className="page-title">{this.props.text}</h1>
    );
  }
}

export default PageTitle;