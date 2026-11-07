export type ThemeId = "winter" | "blue" | "pink" | "green";

export const THEMES: ThemeId[] = ["winter", "blue", "pink", "green"];

/** Default until after New Year — then flip to "blue". */
export const DEFAULT_THEME: ThemeId = "winter";

export const THEME_STORAGE_KEY = "novaya-orbita.theme";

export function isThemeId(value: string | null | undefined): value is ThemeId {
  return (
    value === "winter" ||
    value === "blue" ||
    value === "pink" ||
    value === "green"
  );
}
