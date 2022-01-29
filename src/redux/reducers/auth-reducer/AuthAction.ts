import AuthState from './AuthState';

interface AuthAction extends Partial<AuthState>{
  type: string,
}

export default AuthAction;
