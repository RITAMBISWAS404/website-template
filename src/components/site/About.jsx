import SectionHeading from '../ui/SectionHeading.jsx';
import { useSite } from '../../context/SiteContext.jsx';

const listFormat = new Intl.ListFormat('en', { style: 'long', type: 'conjunction' });

export default function About() {
  const { owner, properties } = useSite();
  const cities = [...new Set(properties.map((p) => p.city))];

  const facts = [
    owner.headquarters && { label: 'Based in', value: owner.headquarters },
    owner.foundedYear && { label: 'Operating since', value: String(owner.foundedYear) },
    cities.length > 0 && { label: 'Properties in', value: listFormat.format(cities) },
  ].filter(Boolean);

  return (
    <section className="section section--canvas section--about" id="about" aria-labelledby="about-title">
      <div className="container about">
        <SectionHeading id="about-title" meta="Who we are" title={`About ${owner.name}`} />
        <div className="about__body">
          {owner.about.paragraphs.map((text) => (
            <p key={text} className="prose">
              {text}
            </p>
          ))}
          {facts.length > 0 && (
            <dl className="facts">
              {facts.map((f) => (
                <div key={f.label} className="facts__row">
                  <dt>{f.label}</dt>
                  <dd>{f.value}</dd>
                </div>
              ))}
            </dl>
          )}
        </div>
      </div>
    </section>
  );
}
