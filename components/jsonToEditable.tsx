import { ComponentProps, ReactElement } from "react";
import { element, Table } from "./types";
import { PostTableInput } from "./PostTableInput";
import { Link } from "expo-router";
import { PostTextInput } from "./PostTextInput";
import { PostListInput } from "./PostListInput";
import { PostImageInput } from "./PostImageInput";


type UIinner = {
    id: number,
    value? : string,
    table? : Table[],
    list? : {id: number, value: string}[]
    uri? : string,
    name? : string,
    type? : string
}

type Post = {
    id: number,
    Post: ReactElement
}



type Props = Omit<ComponentProps<typeof Link>, 'href'> & 
{ 
    setText: (id: number, value: string,) => void, 
    setImage: (id: number, uri: string, name: string, type: string) => void,
    setTable: (id: number, table: Table[]) => void,
    setList: (id: number, data:  {id: number, value: string}[]) => void,
    addElement: (element: ReactElement, id: number) => void,
    onDelete: (id:number) => void,
};

export function JsonToEditable(marking: element, {setText, setImage, setTable, setList, addElement, onDelete }:Props) {
  const posd: Post[] = [];
  const posdData: UIinner[] = [];
  

  marking.children.forEach((child, idx) => {
    const id = idx;
    console.log(child)
    switch (child.component) {
      case "Text":
        posd.push({ id, Post: <PostTextInput key={id} id={id} setText={setText} onDelete={onDelete} data={posdData}/> });
        posdData.push({
          id,
          value: child.value,
        });
        break;

      case "Table":
        posd.push({ id, Post: <PostTableInput key={id} id={id} setTable={setTable} onDelete={onDelete} data={posdData}/> });
        posdData.push({
          id,
          table: child.children?.map(seg => ({
            key: seg.key || "",
            value: seg.value
          })) ?? [],
        });
        break;

      case "Image":
        posd.push({ id, Post: <PostImageInput key={id} id={id} setImage={setImage} onDelete={onDelete} data={posdData}/>});
        posdData.push({
          id,
          uri: child.value,
          type: ''
        });
        break;

      case "List":
        posd.push({ id, Post: <PostListInput key={id} id={id} setList={setList} onDelete={onDelete} data={posdData}/> });
        posdData.push({
          id,
          list: child.children?.map((item,idx) => ({
            id: idx + 1,
            value: item.value
          })) ?? [],
        });
        break;

      default:
        console.warn("Невідомий компонент:", child.component);
    }
  });
  console.log(posdData)
  return { posd, posdData };
}
