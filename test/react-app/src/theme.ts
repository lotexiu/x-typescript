import { ThemeUtils } from "@lotexiu/typescript/theme/utils";
import Color from "colorjs.io";
import { warn } from "console";

export const synthwaveBuilder = ThemeUtils.themeSchema(
  ["background", "foreground", "primary", "accent"],
  {
    // Base
    error: ({foreground})=> new Color("red").mix(foreground, 0.15, {space: 'lch'}),
    warning: ({accent})=> new Color("orange").mix(accent, 0.2, {space: 'lch'}),
    success: ({accent})=> new Color("rgb(0,220,80)").mix(accent, 0.2, {space: 'lch'}),
    
    card: ({background}) => new Color("white").mix(background, 0.9, {space: 'lch'}),
    popover: ({background}) => new Color("white").mix(background, 0.8, {space: 'lch'}),
    // Funcionais
    secondary: ({primary, accent}) => primary.mix(accent, 0.5, {space: 'lch'}),
    destructive: ({accent})=> new Color("red").mix(accent, 0.4, {space: 'lch'}),
    muted: ({background, foreground}) => background.mix(foreground, 0.8, {space: 'lch'}),
    border: ({primary, foreground}) => primary.mix(foreground, 0.1, {space: 'lch'}),
    input: ({primary, foreground}) => primary.mix(foreground, 0.25, {space: 'lch'}),
    ring: ({primary, foreground}) => primary.mix(foreground, 0.4, {space: 'lch'}),

    // Charts (neon vibes)
    "chart-1": ({background})=> new Color("#003f5c").mix(background, 0.3, {space: 'lch'}),
    "chart-2": ({background})=> new Color("#444e86").mix(background, 0.3, {space: 'lch'}),
    "chart-3": ({background})=> new Color("#955196").mix(background, 0.3, {space: 'lch'}),
    "chart-4": ({background})=> new Color("#dd5182").mix(background, 0.3, {space: 'lch'}),
    "chart-5": ({background})=> new Color("#ff6e54").mix(background, 0.3, {space: 'lch'}),
    "chart-6": ({background})=> new Color("#ffa600").mix(background, 0.3, {space: 'lch'}),

    // Sidebar
    Sidebar: (c) => c.background.mix(c.primary, 0.2),
    SidebarPrimary: (c) => c.primary.mix(c.accent, 0.3),
    SidebarAccent: (c) => c.accent.mix(c.primary, 0.2),
    SidebarBorder: (c) => c.foreground.mix(c.background, 0.8),
    SidebarRing: (c) => c.accent.mix(c.foreground, 0.3),
  }
);

// export const synthwaveTheme = synthwaveBuilder({
//   background: "rgb(40,0,60)",
//   foreground: "rgb(245,245,245)",
//   primary: "rgb(0,120,200)",
//   accent: "rgb(255,20,90)",
// });

// export const synthwaveTheme = synthwaveBuilder({
//   background: "rgb(245, 247, 250)",
//   foreground: "rgb(28, 28, 30)",
//   primary: "rgb(0, 122, 255)",
//   accent: "rgb(255, 149, 0)",
// });