"use client";

import "@lotexiu/typescript/global";
import { DefaultReactThemes } from "@lotexiu/react/theme/implementations";
import { ThemeUtils } from "@lotexiu/typescript/theme/utils";
import { ReactNode, useEffect } from "react";
import { ReactWrapper } from "@lotexiu/react/components/implementations";
import { ReactClientComponent } from "@lotexiu/react/components/ReactComponent/ReactClientComponent";
import { TTheme } from "@lotexiu/typescript/theme/type";


export const Theme = ReactWrapper(
  class extends ReactClientComponent {
    setupHooks(): void {
      const theme: TTheme = DefaultReactThemes.synthwave.dark
      useEffect(() => {
        ThemeUtils.applyThemeToDocument(theme);
      });
    }

    render(component: this): ReactNode {
      return null;
    }
  }
)
