import { Link } from 'expo-router';
import { useState, type ComponentProps } from 'react';
import { StyleSheet ,TouchableOpacity, View, Text } from 'react-native';
import {Image} from "expo-image";
import { User } from './types';
import React from 'react';

type element = {
  component: string,
  styles: Object,
  value?: string,
  children: element[]
}

type Props = Omit<ComponentProps<typeof Link>, 'href'> & {marking: element};

export const JsonToReact =  ({marking}: Props) => {
    const ReturnEl: any = (el: element, ky: number) => {
        switch(el.component){
            case 'View':
                return React.createElement(View, {style:el.styles, key:ky}, [el.children.map((elem, index) => ReturnEl(elem, index))])
            case 'Text':
                return React.createElement(Text, {key:ky}, [el.value])
            case 'Image':
                return React.createElement(Image, {style:el.styles,source: el.value,key:ky})
            case 'List':
                break
      }
    }
    return React.createElement(View, {}, [marking.children.map((comp, index) => ReturnEl(comp, index))])
}


const styles = StyleSheet.create({
});
