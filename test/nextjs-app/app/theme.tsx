"use client";

import { DefaultReactThemes } from "@lotexiu/react/theme/implementations";
import { ThemeUtils } from "@lotexiu/typescript/theme/utils";
import { ReactNode, useEffect } from "react";
import { ReactWrapper } from "@lotexiu/react/components/implementations";
import { ReactClientComponent } from "@lotexiu/react/components/ReactComponent/ReactClientComponent";
import { TTheme } from "@lotexiu/typescript/theme/types";
import { Property } from "@lotexiu/typescript/natives/object/proxy/types";


export const Theme = ReactWrapper(
  class extends ReactClientComponent {
    setupHooks(): void {
      const theme: TTheme = DefaultReactThemes.oceanic.dark
      useEffect(() => {
        ThemeUtils.applyThemeToDocument(theme);
      });
    }

    onChanges(property: Property<this, keyof this>): void {
    }

    render(): ReactNode {
      return null;
    }
  }
)
