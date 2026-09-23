import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSite } from '../context/SiteContext.jsx';

export default function NotFound() {
  const { owner } = useSite();
  useEffect(() => {
    document.title = `Page not found | ${owner.name}`;
  }, [owner.name]);
  return (
    <div className="container notfound">
      <h1 className="sh__title">We couldn’t find that page</h1>
      <p className="prose">The property may no longer be listed, or the link is incorrect.</p>
      <Link to="/" className="btn btn--primary">See all properties</Link>
    </div>
  );
}
