import React, { ReactElement, useState } from 'react';
import { View,Text } from 'react-native';
import { element, Table } from './types';


type UIinner = {
    id: number,
    value? : string,
    table? : Table[],
    list? : {id: number, value: string}[]
    uri? : string,
    name? : string,
    type? : string
}

type file = {
    uri: string,
    name: string,
    type: string
}

type props = {
    post: {
        id: number,
        Post: ReactElement
    }[],
    posdData: UIinner[],
}

export async function elementToJson({post, posdData}:props){
    const marking : element = {
        component: "View",
        styles: {},
        key: "",
        value: "",
        children: []
    }
    const files : file[] = []
    let FileCounter = 0

    

    if(post !== undefined){
        post.forEach(({id, Post})=>{
            const data = posdData.find(el => el.id === id);
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
                        name: `file${FileCounter}`,
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

