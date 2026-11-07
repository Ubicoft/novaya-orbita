import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { BrandCursor } from "./cursor/BrandCursor";
import { ContentProvider } from "./content/ContentProvider";
import { LocaleProvider } from "./i18n/LocaleProvider";
import { LocaleUrlSync } from "./i18n/LocaleUrlSync";
import { PageShell } from "./layout/PageShell";
import { AdminPage } from "./pages/Admin/AdminPage";
import { AboutPage } from "./pages/About/AboutPage";
import { ContactsPage } from "./pages/Contacts/ContactsPage";
import { DesignSystemDemo } from "./pages/DesignSystemDemo";
import { DirectionsPage } from "./pages/Directions/DirectionsPage";
import { EventDetailPage } from "./pages/Events/EventDetailPage";
import { EventsPage } from "./pages/Events/EventsPage";
import { HomePage } from "./pages/Home/HomePage";
import { JoinPage } from "./pages/Join/JoinPage";
import { MemberDetailPage } from "./pages/Members/MemberDetailPage";
import { MembersPage } from "./pages/Members/MembersPage";
import { NewsDetailPage } from "./pages/News/NewsDetailPage";
import { NewsPage } from "./pages/News/NewsPage";
import { PartnerDetailPage } from "./pages/Partners/PartnerDetailPage";
import { PartnersPage } from "./pages/Partners/PartnersPage";
import { ProjectDetailPage } from "./pages/Projects/ProjectDetailPage";
import { ProjectsPage } from "./pages/Projects/ProjectsPage";
import { ThemeProvider } from "./theme/ThemeProvider";

export default function App() {
  return (
    <ThemeProvider>
      <LocaleProvider>
        <ContentProvider>
          <BrandCursor />
          <BrowserRouter basename={import.meta.env.BASE_URL}>
            <LocaleUrlSync />
            <Routes>
              <Route path="admin/*" element={<AdminPage />} />
              <Route path="design-system" element={<DesignSystemDemo />} />

              <Route element={<PageShell />}>
                <Route index element={<HomePage />} />
                <Route path="about" element={<AboutPage />} />
                <Route path="directions" element={<DirectionsPage />} />
                <Route path="events" element={<EventsPage />} />
                <Route path="events/:slug" element={<EventDetailPage />} />
                <Route path="projects" element={<ProjectsPage />} />
                <Route path="projects/:slug" element={<ProjectDetailPage />} />
                <Route path="members" element={<MembersPage />} />
                <Route path="members/:slug" element={<MemberDetailPage />} />
                <Route path="partners" element={<PartnersPage />} />
                <Route path="partners/:slug" element={<PartnerDetailPage />} />
                <Route path="news" element={<NewsPage />} />
                <Route path="news/:slug" element={<NewsDetailPage />} />
                <Route path="contacts" element={<ContactsPage />} />
                <Route path="join" element={<JoinPage />} />
              </Route>

              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </BrowserRouter>
        </ContentProvider>
      </LocaleProvider>
    </ThemeProvider>
  );
}
