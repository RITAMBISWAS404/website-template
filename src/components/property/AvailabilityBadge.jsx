/** Monochrome status: the dot's fill carries the state, the text always says it. */
export default function AvailabilityBadge({ status, showDetail = false }) {
  if (!status) return null;
  return (
    <span className={`avail avail--${status.tone}`}>
      <span className="avail__dot" aria-hidden="true" />
      <span>
        {status.label}
        {showDetail && status.detail ? <span className="avail__detail"> · {status.detail}</span> : null}
      </span>
    </span>
  );
}
