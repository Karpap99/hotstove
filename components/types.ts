

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

export type Tag = {
  name: string,
  id: string
}


export type post_short = {
  id: string,
  title: string,
  description: string,
  title_picture: string,
  likes: object[],
  views: number,
  creator: User,
  date: string
  tags: Tag[],
  likeCount: number,
  createDateTime?: Date
}

export type marking = {
  marking: element,
}

export type element = {
  component: string,
  styles: Object,
  key?: string,
  value: string,
  children: element[]
}



export type creationElement = {
  component: string,
  styles: Object,
  value: {
    id: number,
    text: string
  },
  children: element[]
}



export type reg_response = {
  nickname: string, 
  email: string,
  profile_picture: string
}

export type Table = {
    key: string,
    value: string
}
