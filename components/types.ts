

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