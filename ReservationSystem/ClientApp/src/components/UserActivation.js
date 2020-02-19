import React, { Component, ReactDOM } from 'react';
import Axios from 'axios';
import Loader from './Loader';

export default class UserActivation extends Component {
  displayName = UserActivation.name;

  constructor(props) {
    super(props);

    this.state = {message: '', loading: true};
  }

  componentDidMount() {
    let params = this.props.match.params;

    Axios.get("/api/user/activate/" + params.email + "/" + params.code)
      .then(() => this.setState({message: "Twoje konto zostało aktywowane!"}))
      .catch(() => this.setState({message: "Niestety, weryfikacja nie powiodła się. Na twój email wysłaliśmy nowy link aktywacyjny. Spróbuj ponownie."}))
      .finally(() => this.setState({loading: false}));
  }

  render() {
    return (
      <React.Fragment>
        <Loader isLoading={this.state.loading} />
        <h2 className="pt-5" style={{textAlign: 'center'}}>{this.state.message}</h2>
      </React.Fragment>
    );
  }
}