

export type Country = {
    name: string;
    key: string;
}

export type Lang = {
    lang : Object
}

export type File = {
  uri : string,
  name: string | undefined,
  type : string | undefined
}

export type User = {
  id: string,
  nickname: string,
  profile_picture: string
}


export type post = { 
  marking: element,
  user?: User
}

export type element = {
  component: string,
  styles: Object,
  value?: string,
  children: element[]
}


export type reg_response = {
  nickname: string, 
  email: string,
  profile_picture: string
}