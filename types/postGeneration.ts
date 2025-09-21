import { ReactElement } from "react"
import { FileType, User } from "./globals"

export type Post = {
    id: number,
    Post: ReactElement
}

export type Table = {
    key: string,
    value: string,
}

export type List = {
    id: number, value: string
}

export type UIinner = {
    id: number,
    value? : string,
    table? : Table[],
    list? : List[],
    uri? : string,
    name? : string,
    type? : string
}


export type element = {
  component: string,
  styles: {},
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


export type post_short = {
  id: string,
  title: string,
  description: string,
  title_picture: string,
  likes: object,
  views: number,
  creator: User,
  date: string
  tags: Tag[],
  likeCount: number,
  messagesCount: number,
  createDateTime?: Date
}


export type Country = {
    name: string;
    key: string;
}

export type Lang = {
    lang : Object
}




export type Tag = {
  content: string,
  id: string
}



export type reg_response = {
  nickname: string, 
  email: string,
  profile_picture: string
}


export type PostData = {
    marking: element, 
    files: FileType[]
}