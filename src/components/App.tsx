import React, {Component} from 'react';
import LoginPage from './auth/LoginPage';

export interface AppState { isLoggedIn: boolean; account?: object; }

class App extends Component<{}, AppState> {
  constructor(props: any) {
    super(props);

    this.state = {
      isLoggedIn: false,
      account: undefined
    };
  }

  handleLogin = async (loginResponse: { account: any; }): Promise<void> => {
    let { isLoggedIn, account } = { ...this.state };
    if(loginResponse && loginResponse.account && loginResponse.account.accountId ) {
      isLoggedIn = true;
      ({ account } = { ...loginResponse });
    }
    this.setState({ isLoggedIn, account });
  };

  public render() {
    return (
      <div>
        <LoginPage handleLogin={this.handleLogin}/>
      </div>
    );
  }
}

export default App;
