import { Plus } from 'lucide-react';
import SectionHeading from '../ui/SectionHeading.jsx';
import { useSite } from '../../context/SiteContext.jsx';

export default function FAQ() {
  const { faqs } = useSite();
  if (!faqs.length) return null; // omitted cleanly when the owner has no FAQ content

  return (
    <section className="section section--canvas" id="faq" aria-labelledby="faq-title">
      <div className="container faq">
        <SectionHeading id="faq-title" meta="FAQ" title="Questions, answered" description="Quick answers before you get in touch." />
        <div className="faq__list">
          {faqs.map((f) => (
            <details key={f.id} name="faq" className="faq__item">
              <summary className="faq__q">
                <span>{f.q}</span>
                <span className="faq__icon" aria-hidden="true">
                  <Plus size={18} strokeWidth={2} />
                </span>
              </summary>
              <p className="faq__a">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
