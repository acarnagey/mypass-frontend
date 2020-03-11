import AgentService from './APIService';

const PATH = '/accounts';

class AccountService extends AgentService {

  static async login(request: any): Promise<any> {
    const response = await super.post(`${PATH}/login`, request);
    return response;
  }

}

export default AccountService;
