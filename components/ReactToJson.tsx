import React, { ReactElement, useState } from 'react';
import { View,Text } from 'react-native';
import { element, Table } from './types';


type UIinner = {
    value? : string,
    table? : Table[],
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
    post: ReactElement[],
    posdData: UIinner[],
    counter: number
}

export async function elementToJson(post: React.ReactElement<unknown, string | React.JSXElementConstructor<any>>[], postData: { value?: string; table?: Table[]; uri?: string; name?: string; type?: string; }[], counter: number){
    const marking : element = {
        component: "View",
        styles: {},
        key: "",
        value: "",
        children: []
    }
    const files : file[] = []
    let FileCounter = 0

    

    if(typeof post !== undefined){
        post.map((el, index)=>{
            const new_component : element = {
                component: "View",
                styles: {},
                key: "",
                value: "",
                children: []
            }
            const { type, props } = el;
            const component_name= {type: typeof type === 'string' ? type : (type as any)?.name || 'Component'}

            switch(component_name.type){
                case "PostTextInput":
                    new_component.component = "Text"
                    new_component.value = postData[index].value
                    marking.children.push(new_component)
                    break
                case "PostTableInput":
                    new_component.component = "Table"
                    new_component.children = 
                    postData[index].table.map((el)=>({
                        component: "TableSegment",
                        styles: {},
                        key: el.key,
                        value: el.value,
                        children: []
                    }))
                    break
                case "PostImageInput":
                    new_component.component = "Image"
                    new_component.value = `file${FileCounter}`
                    const new_file = {
                        uri: "",
                        name: "",
                        type: ""
                    }
                    files.push(new_file)
                    files[FileCounter].name = `file${FileCounter}`
                    files[FileCounter].type = postData[index].type
                    files[FileCounter].uri = postData[index].uri
                    FileCounter += 1
                    break
            }
            marking.children.push(new_component)
        })

    }
  return { marking, files};
}

