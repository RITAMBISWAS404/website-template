import { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { SiteProvider } from './context/SiteContext.jsx';
import { OverlayProvider } from './context/OverlayContext.jsx';
import Header from './components/site/Header.jsx';
import Footer from './components/site/Footer.jsx';
import PlanSwitcher from './components/site/PlanSwitcher.jsx';
import HomePage from './pages/HomePage.jsx';
import PropertyPage from './pages/PropertyPage.jsx';
import NotFound from './pages/NotFound.jsx';

/** Scroll to a hash target if there is one, otherwise to the top on route change. */
function ScrollManager() {
  const { pathname, hash, key } = useLocation();
  useEffect(() => {
    if (hash) {
      // Wait a frame so the target section exists after a route change.
      const id = requestAnimationFrame(() => {
        document.getElementById(hash.slice(1))?.scrollIntoView({ block: 'start' });
      });
      return () => cancelAnimationFrame(id);
    }
    window.scrollTo(0, 0);
    return undefined;
  }, [pathname, hash, key]);
  return null;
}

export default function App() {
  return (
    <SiteProvider>
      <OverlayProvider>
        <a href="#main" className="skip-link">Skip to content</a>
        <ScrollManager />
        <Header />
        <main id="main">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/property/:id" element={<PropertyPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
        <PlanSwitcher />
      </OverlayProvider>
    </SiteProvider>
  );
}
