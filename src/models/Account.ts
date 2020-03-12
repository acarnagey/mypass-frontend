import ShareRequest from './ShareRequest';

interface Account {
  username: string;
  email: string;
  role: string;
  didAddress: string;
  didPrivateKey: string;
  hash: string;
  salt: string;
  documents: [Document];
  shareRequests: [ShareRequest];
}

export default Account;
