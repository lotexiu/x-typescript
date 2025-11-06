import { ThemeUtils } from "@lotexiu/typescript/theme/utils";
import Color from "colorjs.io";

export const DefaultReactThemeBuilder = ThemeUtils.themeSchema(
  ["background", "foreground", "primary", "accent"],"background",
  {
    card: ({background, foreground}) => foreground.mix(background, 0.9, {space: 'lch'}),
    popover: ({background, foreground}) => foreground.mix(background, 0.8, {space: 'lch'}),
    // Functional
    secondary: ({primary, accent}) => primary.mix(accent, 0.5, {space: 'lch'}),
    destructive: ({accent})=> new Color("red").mix(accent, 0.4, {space: 'lch'}),
    muted: ({background, foreground}) => background.mix(foreground, 0.8, {space: 'lch'}),
    border: ({primary, foreground}) => primary.mix(foreground, 0.1, {space: 'lch'}),
    input: ({primary, foreground}) => primary.mix(foreground, 0.25, {space: 'lch'}),
    ring: ({primary, foreground}) => primary.mix(foreground, 0.4, {space: 'lch'}),
    // Charts 
    "chart-1": ({background})=> new Color("#003f5c").mix(background, 0.3, {space: 'lch'}),
    "chart-2": ({background})=> new Color("#444e86").mix(background, 0.3, {space: 'lch'}),
    "chart-3": ({background})=> new Color("#955196").mix(background, 0.3, {space: 'lch'}),
    "chart-4": ({background})=> new Color("#dd5182").mix(background, 0.3, {space: 'lch'}),
    "chart-5": ({background})=> new Color("#ff6e54").mix(background, 0.3, {space: 'lch'}),
    "chart-6": ({background})=> new Color("#ffa600").mix(background, 0.3, {space: 'lch'}),
    // Sidebar
    sidebar: ({background, primary}) => background.mix(primary, 0.2),
    sidebarPrimary: ({primary, accent}) => primary.mix(accent, 0.3),
    sidebarAccent: ({accent, primary}) => accent.mix(primary, 0.2),
    sidebarBorder: ({foreground, background}) => foreground.mix(background, 0.8),
    sidebarRing: ({accent, foreground}) => accent.mix(foreground, 0.3),
    // Base
    error: ({foreground})=> new Color("red").mix(foreground, 0.15, {space: 'lch'}),
    warning: ({accent})=> new Color("orange").mix(accent, 0.2, {space: 'lch'}),
    success: ({accent})=> new Color("rgb(0,220,80)").mix(accent, 0.2, {space: 'lch'}),
  }, {
    cardForeground: ({card}) => ThemeUtils.oppositeColor(card, {l:"full", s:"decrease"}),
    popoverForeground: ({popover}) => ThemeUtils.oppositeColor(popover, {l:"full", s:"decrease"}),
    primaryForeground: ({primary}) => ThemeUtils.oppositeColor(primary, {l:"full", s:"decrease"}),
    secondaryForeground: ({secondary}) => ThemeUtils.oppositeColor(secondary, {l:"full", s:"decrease"}),
    mutedForeground: ({muted}) => ThemeUtils.oppositeColor(muted, {l:"full", s:"decrease"}),
    accentForeground: ({accent}) => ThemeUtils.oppositeColor(accent, {l:"full", s:"decrease"}),
    sidebarForeground: ({sidebar}) => ThemeUtils.oppositeColor(sidebar, {l:"full", s:"decrease"}),
    sidebarPrimaryForeground: ({sidebarPrimary}) => ThemeUtils.oppositeColor(sidebarPrimary, {l:"full", s:"decrease"}),
    sidebarAccentForeground: ({sidebarAccent}) => ThemeUtils.oppositeColor(sidebarAccent, {l:"full", s:"decrease"}),
  }, (theme) => {
    theme.getVariations.forEach((key) => {
      const fontKey = `${key}Foreground`;
      if (fontKey in theme) {
        const contrast = theme[key].contrast((theme as any)[fontKey], 'WCAG21');
        if (contrast < 4.5) {
          console.error(`[WCAG21][VARIATION] Insufficient contrast (${contrast.toFixed(2)}). Minimum is 4.5 between '${key}' and '${fontKey}'. ${theme[key].toString()} vs ${(theme as any)[fontKey].toString()}`);
        }
        if (contrast < 7) {
          console.warn(`[WCAG21][FONT] Low contrast (${contrast.toFixed(2)}). Recommended to be above 7 between '${key}' and '${fontKey}'. ${theme[key].toString()} vs ${(theme as any)[fontKey].toString()}`);
        } 
      }
    })
  }
);

export const darkReactTheme = DefaultReactThemeBuilder({
  background: "rgb(40,0,60)",
  foreground: "rgb(245,245,245)",
  primary: "rgb(0,120,200)",
  accent: "rgb(255,20,90)",
});

export const lightReactTheme = DefaultReactThemeBuilder({
  background: "rgb(245, 247, 250)",
  foreground: "rgb(28, 28, 30)",
  primary: "rgb(0, 122, 255)",
  accent: "rgb(255, 149, 0)",
});