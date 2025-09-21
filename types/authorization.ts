export type User = {
  id: string;
  nickname: string;
  email: string;
};

export type UserData = {
  profile_picture: string;
  age: string;
  description: string;
};

export type Tokens = {
  access_token: string;
  refresh_token: string;
};

export type RegistrationData = {
  nickname: string, 
  email: string,
  password: string,
  password2: string
}

export type Response = {
  result: User,
  access: string,
  refresh: string
}

export type AuthorizationData = {
  email: string,
  password: string,
}

export type BadRequestError = {
  message: string[],
  error: string,
  statusCode: number
}