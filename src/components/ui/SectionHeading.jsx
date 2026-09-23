/**
 * The one section-heading pattern used across the site: a vertical accent bar
 * spanning a small metadata label and the heading beneath it.
 * `as` sets the heading level; `size="sm"` is for secondary rows.
 */
export default function SectionHeading({ id, meta, title, description, as: Tag = 'h2', size = 'md', className = '' }) {
  return (
    <div className={`sh ${size === 'sm' ? 'sh--sm' : ''} ${className}`}>
      {meta && <p className="sh__meta">{meta}</p>}
      <Tag id={id} className="sh__title">
        {title}
      </Tag>
      {description && <p className="sh__desc">{description}</p>}
    </div>
  );
}
