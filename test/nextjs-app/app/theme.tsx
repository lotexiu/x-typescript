"use client";

import "@lotexiu/typescript/global";
import { darkReactTheme, DefaultReactThemeBuilder, lightReactTheme } from "@lotexiu/react/theme/implementations";
import { ThemeUtils } from "@lotexiu/typescript/theme/utils";
import { useEffect } from "react";

export function Theme() {
  const test = DefaultReactThemeBuilder({
    accent:"rgb(0,130,255)",
    background:"rgb(15,0,30)",
    foreground:"rgb(255,130,0)",
    primary:"rgb(0,200,200)"
  })
  useEffect(()=>{
    ThemeUtils.applyThemeToDocument(test);
  },[test])

  return null
}