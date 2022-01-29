interface AuthState {
  isAuth: boolean,
  accessToken: string | null,
  refreshToken: string | null,
}

export default AuthState;
