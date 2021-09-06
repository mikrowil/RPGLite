import * as React from 'react';
import {StackActions} from "react-navigation";

export const navigationRef:any = React.createRef();

export function navigate(name:any, params:any) {
    // @ts-ignore
    navigationRef.current?.navigate(name, params);
}

export function replace(name:any){
    // @ts-ignore
   // navigationRef.current?.replace(name)
}
