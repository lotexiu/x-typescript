"use client";

import "@lotexiu/typescript/global";
import { darkReactTheme } from "@lotexiu/react/theme/implementations";
import { ThemeUtils } from "@lotexiu/typescript/theme/utils";
import { useEffect } from "react";

export function Theme() {
  useEffect(()=>{
    ThemeUtils.applyThemeToDocument(darkReactTheme);
  },[])

  return (<></>)
}