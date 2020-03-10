import React, { Component } from 'react';
import LoginPage from "./auth/LoginPage";

class App extends Component<{}, {}> {
    constructor(props: any) {
        super(props);
    }

    public render() {
        return (
            <div>
              <LoginPage />
            </div>
        );
    }
}

export default App;
