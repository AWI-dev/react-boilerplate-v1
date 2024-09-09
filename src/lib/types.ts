import { type ReactNode } from "react";

export type TProviderProps = {
    children: ReactNode;
    className?: string;
}
export type TLogoProps = {
    className?: string | null;
    size?: number
}


export type TSidebarItemProps ={
    title:string;
    path:string;
    icon:ReactNode
}

type TSidebarGroupItem = {
    title: string;
    path: string;
  };
  
  export type TSidebarItemGroupProps = {
    title: string;
    children: TSidebarGroupItem[]; // Array of TSidebarGroupItem
    icon: ReactNode;
  };