import { ThemeUtils } from "@lotexiu/typescript/theme/utils";
import Color from "colorjs.io";
import { warn } from "console";

export const synthwaveBuilder = ThemeUtils.themeSchema(
  ["background", "foreground", "primary", "accent"],
  {
    // Base
    card: (c) => c.background.mix(c.foreground, 0.1, { space: "lch" }),
    popover: (c) => c.background.mix(c.primary, 0.15, { space: "lch" }),

    // Funcionais
    secondary: (c) => c.primary.mix(c.accent, 0.4, { space: "lch" }),
    destructive: (c) => new Color("#ff0055"),
    muted: (c) => c.background.mix(c.foreground, 0.25, { space: "lch" }),
    border: (c) => c.foreground.mix(c.background, 0.7),
    input: (c) => c.foreground.mix(c.background, 0.85),
    ring: (c) => c.accent.mix(c.primary, 0.3, { space: "lch" }),

    // Charts (neon vibes)
    chart1: "#ff0080",
    chart2: "#00fff0",
    chart3: "#ffea00",
    chart4: "#a855f7",
    chart5: "#ff4500",

    // Sidebar
    Sidebar: (c) => c.background.mix(c.primary, 0.2),
    SidebarPrimary: (c) => c.primary.mix(c.accent, 0.3),
    SidebarAccent: (c) => c.accent.mix(c.primary, 0.2),
    SidebarBorder: (c) => c.foreground.mix(c.background, 0.8),
    SidebarRing: (c) => c.accent.mix(c.foreground, 0.3),
  }
);

export const synthwaveTheme = synthwaveBuilder({
  background: "#0a0025",
  foreground: "#3232b3ff",
  primary: "#ff00c8ff",
  accent: "#368b86ff",
});

const primary = "#ad75a1";
