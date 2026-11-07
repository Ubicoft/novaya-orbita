import { useTheme } from "../theme/ThemeProvider";
import { Snow } from "./Snow";
import { ThemeAmbient } from "./ThemeAmbient";
import { WinterDecor } from "./WinterDecor";

export function WinterAtmosphere() {
  const { isWinter } = useTheme();

  return (
    <>
      <ThemeAmbient />
      {isWinter ? (
        <>
          <Snow />
          <WinterDecor />
        </>
      ) : null}
    </>
  );
}
