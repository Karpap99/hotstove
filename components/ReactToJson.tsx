import { ReactElement } from 'react';
import { element, UIinner } from '@/types/postGeneration';
import { FileType } from '@/types/globals';


type props = {
    post: {
        id: number,
        Post: ReactElement
    }[],
    postData: UIinner[],
}

export async function elementToJson({post, postData} :props){
    const marking : element = {
        component: "View",
        styles: {},
        key: "",
        value: "",
        children: []
    }
    const files : FileType[] = []
    let FileCounter = 0

    

    if(post !== undefined){
        post.forEach(({id, Post})=>{
            const data = postData.find(el => el.id === id);
            if (!data) return;

            const new_component : element = {
                component: "View",
                styles: {},
                key: "",
                value: "",
                children: []
            }

            const { type } = Post;
            const component_name= { type: typeof type === 'string' ? type : (type as any)?.name || 'Component' }

            switch(component_name.type){
                case "PostTextInput":
                    new_component.component = "Text"
                    new_component.value = data.value ?? ""
                    break
                case "PostTableInput":
                    new_component.component = "Table"
                    new_component.children = (data.table ?? []).map(el => ({
                        component: "TableSegment",
                        styles: {},
                        key: el.key,
                        value: el.value,
                        children: [],
                    }));
                    break
                case "PostImageInput":
                    new_component.component = "Image"
                    new_component.value = `file${FileCounter}`;
                    files.push({
                        file: `file${FileCounter}`,
                        uri: data.uri ?? "",
                        type: data.type ?? "",
                    });
                    FileCounter += 1;
                    break;
                case "PostListInput":
                    new_component.component = "List"
                    new_component.children = (data.list ?? []).map(el => ({
                        component: "ListSegment",
                        styles: {},
                        key: "",
                        value: el.value,
                        children: [],
                    }));

                    FileCounter += 1;
                    break
            }
            marking.children.push(new_component)
        })

    }
  return { marking, files};
}

