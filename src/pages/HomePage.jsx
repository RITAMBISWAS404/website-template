import { useEffect } from 'react';
import Hero from '../components/site/Hero.jsx';
import About from '../components/site/About.jsx';
import PropertyList from '../components/site/PropertyList.jsx';
import FAQ from '../components/site/FAQ.jsx';
import { useSite } from '../context/SiteContext.jsx';

/** Header / Hero / About / Properties / FAQ (when it exists) / Footer. Nothing else. */
export default function HomePage() {
  const { owner } = useSite();
  useEffect(() => {
    document.title = `${owner.name} | PG and co-living homes`;
  }, [owner.name]);

  return (
    <>
      <Hero />
      <About />
      <PropertyList />
      <FAQ />
    </>
  );
}
