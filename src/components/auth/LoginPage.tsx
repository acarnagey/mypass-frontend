import React, {ChangeEvent, Component, FormEvent} from 'react';
// import APIService from '../../api/APIService';
import {
  Button,
  Card,
  CardBody, CardImg,
  CardSubtitle,
  CardText,
  CardTitle,
  Form,
  FormFeedback,
  FormGroup,
  Input,
  Label
} from 'reactstrap';
import folderImage from '../../img/folder.png';
import AccountService from '../../services/AccountService';

export interface LoginProps { handleLogin: (loginResponse: any) => Promise<void>; }
export interface LoginState { email: string; password: string; errorMessage: string; }

class LoginPage extends Component<LoginProps, LoginState> {

  constructor(props: LoginProps) {
    super(props);

    this.state = {
      email: '',
      password: '',
      errorMessage: ''
    };

  }

  handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const key = e.target.name;

    if(Object.keys(this.state).includes(key)) {
      this.setState({ [key]: value } as Pick<LoginState, keyof LoginState>);
    }
  };

  handleLogin = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    const { handleLogin } = { ...this.props };
    const { email, password } = { ...this.state };
    let { errorMessage } = { ...this.state };

    try {
      const loginResponse = await AccountService.login({account: { email, password }} );
      console.log(JSON.stringify(loginResponse));
      await handleLogin(loginResponse);
      return;
    } catch (err) {
      if (err && err.error && err.error.message) {
        errorMessage = err.error.message;
      } else {
        errorMessage = 'Oops, something went wrong. Please try again in a few minutes.';
      }
    }
    this.setState({ errorMessage });
  };

  render() {
    const { email, password, errorMessage } = { ...this.state };

    return (
      <div style={{width: '320px', margin: 'auto'}}>
        <Card style={{margin: '24px'}}>
          <CardBody>
            <img style={{display: 'inline-block', width: '60px', height: '60px', objectFit: 'contain'}} className="logo" src={folderImage} alt="Logo" />
            <div style={{display: 'inline-block', fontSize: '24px', marginLeft: '24px'}}>MyPass</div>
            <div style={{fontSize: '18px', borderBottom: '1px solid #ccc', marginBottom: '18px'}}>Login</div>
            <Form onSubmit={this.handleLogin}>
              { errorMessage && <div className="error">{errorMessage}</div>}
              <FormGroup>
                <Label for="email">Email</Label>
                <Input type="email" name="email" id="email" value={email} onChange={this.handleInputChange} placeholder="Email" />
              </FormGroup>
              <FormGroup>
                <Label for="password">Password</Label>
                <Input type="password" name="password" id="password" value={password} onChange={this.handleInputChange} placeholder="Password" />
              </FormGroup>
              <Button type="submit">Login</Button>
            </Form>
          </CardBody>
        </Card>
      </div>
    );
  }
}

export default LoginPage;
