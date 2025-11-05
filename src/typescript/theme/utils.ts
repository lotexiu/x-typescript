import { _Theme } from "./implementations";

class ThemeUtils {
  static themeSchema = _Theme.themeSchema;
  static applyThemeToDocument = _Theme.applyThemeToDocument;
}

export {
  ThemeUtils
}