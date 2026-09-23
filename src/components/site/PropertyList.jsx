import { useMemo, useState } from 'react';
import { useSite } from '../../context/SiteContext.jsx';
import SectionHeading from '../ui/SectionHeading.jsx';
import PropertyCard from '../property/PropertyCard.jsx';
import { plural } from '../../lib/format.js';

const listFormat = new Intl.ListFormat('en', { style: 'long', type: 'conjunction' });

export default function PropertyList() {
  const { properties } = useSite();
  const cities = useMemo(() => [...new Set(properties.map((p) => p.city))], [properties]);
  const [city, setCity] = useState('all');

  const visible = city === 'all' ? properties : properties.filter((p) => p.city === city);

  return (
    <section className="section" id="properties" aria-labelledby="properties-title">
      <div className="container">
        <div className="section-head">
          <SectionHeading
            id="properties-title"
            meta="Find your place"
            title="Our properties"
            description={
              properties.length > 0
                ? `${plural(properties.length, 'property', 'properties')} in ${listFormat.format(cities)}`
                : undefined
            }
          />

          {cities.length > 1 && (
            <div className="chips" role="group" aria-label="Filter by city">
              {['all', ...cities].map((c) => (
                <button
                  key={c}
                  type="button"
                  className="chip"
                  aria-pressed={city === c}
                  onClick={() => setCity(c)}
                >
                  {c === 'all' ? 'All' : c}
                </button>
              ))}
            </div>
          )}
        </div>

        {visible.length > 0 ? (
          <ul className="grid">
            {visible.map((p) => (
              <li key={p.id}>
                <PropertyCard property={p} />
              </li>
            ))}
          </ul>
        ) : (
          <p className="empty">Properties will appear here soon. Contact the owner to learn what is coming up.</p>
        )}
      </div>
    </section>
  );
}
