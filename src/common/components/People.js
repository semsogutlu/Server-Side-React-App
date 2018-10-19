import React from 'react'
import { connect } from 'react-redux'
import { fetchPeople } from '../api/people';
import logo from '../../client/static/logo.svg';
import './People.scss';


class People extends React.Component {
  
  
 
  render() {
    return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1 className="App-title">Example Server Side Rendering</h1>
      </header>
      <div className="App-intro">
      <p>Try disabling JS and reload the page!</p>
        <ul>
          {this.props.people.map(function(person){
              return <li key={ person }>{person}</li>;
            })}
        </ul>
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

