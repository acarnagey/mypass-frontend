import AgentService from './APIService';

const PATH = '/document';

class DocumentService extends AgentService {

  static async get(): Promise<any> {
    const response = await super.get(PATH);
    return response;
  }

  static async addDocument(newFile: File): Promise<any> {
    const response = await super.postDocument(newFile);
    return response;
  }

}

export default DocumentService;
