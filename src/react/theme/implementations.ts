import { ThemeUtils } from "@ts/theme/utils"
import Color from "colorjs.io"

export const DefaultReactThemeBuilder = ThemeUtils.themeSchema(
  ["background", "foreground", "primary", "accent"], {
    error: ({accent})=> new Color("rgb(255,0,0)"),
    warning: ({accent})=> new Color("rgb(255,150,0)"),
    success: ({accent})=> new Color("rgb(0,255,0)"),
    card: () => new Color("rgb(255,255,255)"),
    popover: () => new Color("rgb(255,255,255)"),
    secondary: () => new Color("rgb(255,255,255)"),
    muted: () => new Color("rgb(255,255,255)"),
    destructive: () => new Color("rgb(255,255,255)"),
    border: () => new Color("rgb(255,255,255)"),
    input: () => new Color("rgb(255,255,255)"),
    ring: () => new Color("rgb(255,255,255)"),
    radius: () => new Color("rgb(255,255,255)"),
    chart1: () => new Color("rgb(255,255,255)"),
    chart2: () => new Color("rgb(255,255,255)"),
    chart3: () => new Color("rgb(255,255,255)"),
    chart4: () => new Color("rgb(255,255,255)"),
    chart5: () => new Color("rgb(255,255,255)"),
    chart6: () => new Color("rgb(255,255,255)"),
    sidebarBackground: () => new Color("rgb(255,255,255)"),
    sidebarPrimary: () => new Color("rgb(255,255,255)"),
    sidebarAccent: () => new Color("rgb(255,255,255)"),
    sidebarBorder: () => new Color("rgb(255,255,255)"),
    sidebarRing: () => new Color("rgb(255,255,255)"),
    cardForeground: () => new Color("rgb(255,255,255)"),
    popoverForeground: () => new Color("rgb(255,255,255)"),
    primaryForeground: () => new Color("rgb(255,255,255)"),
    secondaryForeground: () => new Color("rgb(255,255,255)"),
    mutedForeground: () => new Color("rgb(255,255,255)"),
    accentForeground: () => new Color("rgb(255,255,255)"),
    destructiveForeground: () => new Color("rgb(255,255,255)"),
    sidebarForeground: () => new Color("rgb(255,255,255)"),
    sidebarPrimaryForeground: () => new Color("rgb(255,255,255)"),
    sidebarAccentForeground: () => new Color("rgb(255,255,255)"),
  }
)

export const DefaultReactTheme = DefaultReactThemeBuilder({
  background: "rgb(25, 25, 25)",
  foreground: "rgb(240, 240, 240)",
  primary: "rgb(0, 120, 212)",
  accent: "rgb(255, 165, 0)",
})