import { element, List, Post, Table, UIinner } from "@/types/postGeneration";
import { ReactElement } from "react";
import { PostImageInput, PostListInput, PostTableInput, PostTextInput } from "..";



type Props = { 
    setText: (id: number, value: string,) => void, 
    setImage: (id: number, uri: string, name: string, type: string) => void,
    setTable: (id: number, table: Table[]) => void,
    setList: (id: number, list:  List[]) => void,
    addElement: (element: ReactElement, id: number) => void,
    onDelete: (id:number) => void,
};

export function JsonToEditable(marking: element, {setText, setImage, setTable, setList, addElement, onDelete }:Props) {
  const post: Post[] = [];
  const postData: UIinner[] = [];
  

  marking.children.forEach((child, idx) => {
    const id = idx;
    switch (child.component) {
      case "Text":
        post.push({ id, Post: <PostTextInput key={id} id={id} setText={setText} onDelete={onDelete} data={postData}/> });
        postData.push({
          id,
          value: child.value,
        });
        break;

      case "Table":
        post.push({ id, Post: <PostTableInput key={id} id={id} setTable={setTable} onDelete={onDelete} data={postData}/> });
        postData.push({
          id,
          table: child.children?.map(seg => ({
            key: seg.key || "",
            value: seg.value
          })) ?? [],
        });
        break;

      case "Image":
        post.push({ id, Post: <PostImageInput key={id} id={id} setImage={setImage} onDelete={onDelete} data={postData}/>});
        postData.push({
          id,
          uri: child.value,
          type: ''
        });
        break;

      case "List":
        post.push({ id, Post: <PostListInput key={id} id={id} setList={setList} onDelete={onDelete} data={postData}/> });
        postData.push({
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
  return { post, postData };
}
