import request from '../utils/request'
import authHeader from './auth-header';

const API_URL = 'api/login';

class UserService {
  getPublicContent() {
    return request.get(API_URL + 'all');
  }

  getUserBoard() {
    return request.get(API_URL + 'user', { headers: authHeader() });
  }

  getAdminBoard() {
    return request.get(API_URL + 'admin', { headers: authHeader() });
  }
}
export default new UserService();