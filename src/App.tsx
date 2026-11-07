import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { BrandCursor } from "./cursor/BrandCursor";
import { LocaleProvider } from "./i18n/LocaleProvider";
import { PageShell } from "./layout/PageShell";
import { DesignSystemDemo } from "./pages/DesignSystemDemo";
import { StubPage } from "./pages/StubPage";
import { ThemeProvider } from "./theme/ThemeProvider";

export default function App() {
  return (
    <ThemeProvider>
      <LocaleProvider>
        <BrandCursor />
        <BrowserRouter basename={import.meta.env.BASE_URL}>
          <Routes>
            <Route element={<PageShell />}>
              <Route index element={<StubPage page="home" />} />
              <Route path="about" element={<StubPage page="about" />} />
              <Route path="directions" element={<StubPage page="directions" />} />
              <Route path="events" element={<StubPage page="events" />} />
              <Route path="projects" element={<StubPage page="projects" />} />
              <Route path="members" element={<StubPage page="members" />} />
              <Route path="partners" element={<StubPage page="partners" />} />
              <Route path="news" element={<StubPage page="news" />} />
              <Route path="contacts" element={<StubPage page="contacts" />} />
              <Route path="join" element={<StubPage page="join" />} />
            </Route>

            <Route path="design-system" element={<DesignSystemDemo />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </LocaleProvider>
    </ThemeProvider>
  );
}
