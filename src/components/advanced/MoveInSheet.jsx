import { useState } from 'react';
import Sheet from '../ui/Sheet.jsx';
import { Field, RadioTiles, SuccessPanel, TextInput } from '../ui/Form.jsx';
import PropertyChip from './PropertyChip.jsx';
import { useSite } from '../../context/SiteContext.jsx';
import { useOverlays } from '../../context/OverlayContext.jsx';
import { submitMoveInRequest } from '../../data/api.js';
import { formatLongDate, formatShortDate, todayISO } from '../../lib/dates.js';
import { formatMobile, formatRent, normalizeIndianMobile } from '../../lib/format.js';
import { checkMoveIn } from '../../lib/property.js';

function MoveInForm({ property, roomTypeId, onClose }) {
  const { owner, capabilities } = useSite();
  const { openEnquiry } = useOverlays();
  const [roomId, setRoomId] = useState(roomTypeId ?? property.roomTypes[0]?.id ?? null);
  const [date, setDate] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [errors, setErrors] = useState({});
  const [busy, setBusy] = useState(false);
  const [ref, setRef] = useState(null);

  const room = property.roomTypes.find((r) => r.id === roomId);
  const check = room && date ? checkMoveIn(room, date) : null;

  const submit = async (e) => {
    e.preventDefault();
    const next = {};
    if (!date) next.date = 'Choose a move-in date.';
    else if (check?.result !== 'available') next.date = 'Pick a date the room can be available.';
    if (!name.trim()) next.name = 'Enter your name.';
    const mobile = normalizeIndianMobile(phone);
    if (!mobile) next.phone = 'Enter a valid 10-digit mobile number.';
    setErrors(next);
    if (Object.keys(next).length) return;
    setBusy(true);
    const res = await submitMoveInRequest({ propertyId: property.id, roomTypeId: roomId, moveIn: date, name: name.trim(), phone: mobile });
    setRef(res.ref);
    setBusy(false);
  };

  if (ref) {
    return (
      <SuccessPanel
        title="Request sent"
        actions={<button type="button" className="btn btn--primary btn--block" onClick={onClose}>Done</button>}
      >
        <dl className="summary">
          <div><dt>Property</dt><dd>{property.name}</dd></div>
          <div><dt>Room</dt><dd>{room.label}</dd></div>
          <div><dt>Move-in</dt><dd>{formatLongDate(date)}</dd></div>
          <div><dt>Status</dt><dd>Awaiting owner approval</dd></div>
        </dl>
        <p>{owner.name} will review your request and confirm on {formatMobile(phone)}. No payment is taken now. Reference {ref}.</p>
      </SuccessPanel>
    );
  }

  const options = property.roomTypes.map((r) => ({
    value: r.id,
    content: (
      <>
        <span className="tile__title">{r.label}</span>
        <span className="tile__sub">{formatRent(r.monthlyRent)} / month</span>
      </>
    ),
  }));

  return (
    <form onSubmit={submit} noValidate className="form">
      <PropertyChip property={property} />
      <RadioTiles legend="Room type" name="movein-room" value={roomId} onChange={setRoomId} options={options} layout="wrap" />

      <Field label="Move-in date" error={errors.date}>
        {(p) => <TextInput {...p} type="date" min={todayISO()} value={date} onChange={(e) => setDate(e.target.value)} />}
      </Field>

      {check?.result === 'available' && <p className="notice notice--ok" role="status">{room.label} can be available on {formatShortDate(date)}.</p>}
      {check?.result === 'later' && (
        <p className="notice" role="status">
          {room.label} isn’t available on {formatShortDate(date)}. The earliest date is {formatShortDate(check.availableFrom)}.{' '}
          <button type="button" className="link-btn" onClick={() => setDate(check.availableFrom)}>
            Use {formatShortDate(check.availableFrom)}
          </button>
        </p>
      )}
      {check?.result === 'unavailable' && (
        <p className="notice" role="status">
          {room.label} has no availability right now.
          {capabilities.enquiry && (
            <>
              {' '}
              <button type="button" className="link-btn" onClick={() => openEnquiry(property.id)}>Send an enquiry instead</button>
            </>
          )}
        </p>
      )}

      <Field label="Your name" error={errors.name}>
        {(p) => <TextInput {...p} value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" />}
      </Field>
      <Field label="Mobile number" error={errors.phone}>
        {(p) => <TextInput {...p} type="tel" inputMode="tel" autoComplete="tel" placeholder="98450 12345" value={phone} onChange={(e) => setPhone(e.target.value)} />}
      </Field>

      <button type="submit" className="btn btn--primary btn--block" disabled={busy}>
        {busy ? 'Sending request…' : 'Send move-in request'}
      </button>
      <p className="field__hint">Sending a request doesn’t confirm a booking. The owner approves it first.</p>
    </form>
  );
}

export default function MoveInSheet({ open, onClose, propertyId, roomTypeId }) {
  const { getProperty } = useSite();
  const property = getProperty(propertyId);
  if (!property || !property.roomTypes.length) return null;
  return (
    <Sheet open={open} onClose={onClose} title="Request move-in" size="md">
      <MoveInForm property={property} roomTypeId={roomTypeId} onClose={onClose} />
    </Sheet>
  );
}
