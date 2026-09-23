const initials = (name) =>
  name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase();

/** Owner mark: the uploaded logo when present, otherwise a monogram in the accent colour. */
export function LogoMark({ owner, size = 36 }) {
  if (owner.logo) {
    return <img src={owner.logo} alt="" width={size} height={size} className="logo-mark logo-mark--img" />;
  }
  return (
    <span className="logo-mark" style={{ width: size, height: size, fontSize: size * 0.4 }} aria-hidden="true">
      {initials(owner.name)}
    </span>
  );
}

export function Brand({ owner, size = 36, as: Tag = 'span' }) {
  return (
    <Tag className="brand">
      <LogoMark owner={owner} size={size} />
      <span className="brand__name">{owner.name}</span>
    </Tag>
  );
}
