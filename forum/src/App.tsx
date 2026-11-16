import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { BrandCursor } from "./cursor/BrandCursor";
import { LocaleProvider } from "./i18n/LocaleProvider";
import { LocaleUrlSync } from "./i18n/LocaleUrlSync";
import { PageShell } from "./layout/PageShell";
import { AboutPage } from "./pages/AboutPage";
import { CategoriesPage } from "./pages/CategoriesPage";
import { CategoryPage } from "./pages/CategoryPage";
import { HomePage } from "./pages/HomePage";
import { SimpleEmptyPage } from "./pages/SimpleEmptyPage";
import { SubsectionPage } from "./pages/SubsectionPage";
import { useLocale } from "./i18n/LocaleProvider";
import { ThemeProvider } from "./theme/ThemeProvider";

function RecentPage() {
  const { t } = useLocale();
  return (
    <SimpleEmptyPage
      brand={t.nav.recent}
      title={t.recentPage.title}
      lead={t.recentPage.lead}
      empty={t.recentPage.empty}
      withSearch
    />
  );
}

function PopularPage() {
  const { t } = useLocale();
  return (
    <SimpleEmptyPage
      brand={t.nav.popular}
      title={t.popularPage.title}
      lead={t.popularPage.lead}
      empty={t.popularPage.empty}
    />
  );
}

function QaPage() {
  const { t } = useLocale();
  return (
    <SimpleEmptyPage
      brand={t.nav.qa}
      title={t.qaPage.title}
      lead={t.qaPage.lead}
      empty={t.qaPage.empty}
    />
  );
}

function MembersPage() {
  const { t } = useLocale();
  return (
    <SimpleEmptyPage
      brand={t.nav.members}
      title={t.membersPage.title}
      lead={t.membersPage.lead}
      empty={t.membersPage.empty}
    />
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <LocaleProvider>
        <BrandCursor />
        <BrowserRouter basename={import.meta.env.BASE_URL}>
          <LocaleUrlSync />
          <Routes>
            <Route element={<PageShell />}>
              <Route index element={<HomePage />} />
              <Route path="categories" element={<CategoriesPage />} />
              <Route path="categories/:categoryId" element={<CategoryPage />} />
              <Route
                path="categories/:categoryId/:subsectionId"
                element={<SubsectionPage />}
              />
              <Route path="recent" element={<RecentPage />} />
              <Route path="popular" element={<PopularPage />} />
              <Route path="qa" element={<QaPage />} />
              <Route path="members" element={<MembersPage />} />
              <Route path="about" element={<AboutPage />} />
            </Route>
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </LocaleProvider>
    </ThemeProvider>
  );
}
