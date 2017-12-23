import React from 'react'
import { connect } from 'react-redux'
import * as Actions from '../actions'
import { fetchPeople } from '../api/people';
import logo from '../../client/static/logo.svg';
import PropTypes from 'prop-types';
import './People.scss';


class People extends React.Component {
  componentDidMount() {
    this.props.fetchPeople();
  }
  
 
  render() {
    return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1 className="App-title">Welcome to React</h1>
      </header>
      <div className="App-intro">
        <div dangerouslySetInnerHTML={{__html: this.props.people ? this.props.people[0] : ""}} />
      </div>
    </div>  
    );
  }
}

const mapStateToProps = (state) => ({
  people: state.people
})

const mapDispatchToProps = (dispatch) => {
  return {
    fetchPeople: () => dispatch(fetchPeople()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(People)

