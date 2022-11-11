import { AppRouter } from "./router/AppRouter";
import { AppTheme } from "./theme";

export const NoiseApp = () => {
  return (
    <>
      <AppTheme>
        <AppRouter />
      </AppTheme>
    </>
  );
};
