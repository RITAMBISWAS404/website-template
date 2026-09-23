import Picture from '../ui/Picture.jsx';

/** Reminds the visitor which property an action is attached to. */
export default function PropertyChip({ property }) {
  return (
    <div className="pchip">
      {property.images[0] ? (
        <div className="pchip__thumb"><Picture src={property.images[0].src} alt="" sizes="64px" /></div>
      ) : (
        <div className="pchip__thumb" />
      )}
      <div className="pchip__text">
        <p className="pchip__name">{property.name}</p>
        <p className="pchip__meta">{property.propertyType} · {property.locality}, {property.city}</p>
      </div>
    </div>
  );
}
