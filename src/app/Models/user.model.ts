export interface User {
  email:     string;
  password:  string;
  firstName: string;
  lastName:  string;
}
export interface UserLogin {
  email:     string;
  password:  string;

}

export interface AuthenticatedUser {
  email:     string;
  firstName: string;
  lastName:  string;
}
