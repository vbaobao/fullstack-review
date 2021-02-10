import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      repos: []
    }
  }

  componentDidMount() {
    $.ajax({
      method: 'GET',
      url: '/repos',
      success: (res) => {this.setState({repos: res})}
    })
  }

  search (term) {
    $.ajax({
      method: 'POST',
      url: '/repos',
      data: {user_name: term},
      success: (res) => {this.setState({repos: res})}
    })
  }

  render () {
    return (<div>
      <h1>Github Fetcher</h1>
      <RepoList repos={this.state.repos}/>
      <Search onSearch={this.search.bind(this)}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));