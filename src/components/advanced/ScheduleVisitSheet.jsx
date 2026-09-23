import { useCallback, useEffect, useMemo, useState } from 'react';
import { ArrowLeft, Building2, Video } from 'lucide-react';
import Sheet from '../ui/Sheet.jsx';
import { Field, RadioTiles, SuccessPanel, TextInput } from '../ui/Form.jsx';
import PropertyChip from './PropertyChip.jsx';
import { useSite } from '../../context/SiteContext.jsx';
import { getVisitConfig, submitVisitRequest } from '../../data/api.js';
import { getVisitDays, getVisitSlots } from '../../lib/visits.js';
import { dayOfMonth, formatLongDate, formatMonth, formatTime, formatWeekday } from '../../lib/dates.js';
import { formatMobile, normalizeIndianMobile } from '../../lib/format.js';

const TYPE_META = {
  physical: { label: 'In person', sub: 'Visit the property', Icon: Building2 },
  virtual: { label: 'Video call', sub: 'Walkthrough on video', Icon: Video },
};

function VisitFlow({ property, onClose, setBack }) {
  const { owner } = useSite();
  const [config, setConfig] = useState(undefined); // undefined = loading, null = not configured
  const [step, setStep] = useState('pick');
  const [type, setType] = useState(null);
  const [date, setDate] = useState(null);
  const [time, setTime] = useState(null);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [errors, setErrors] = useState({});
  const [busy, setBusy] = useState(false);
  const [ref, setRef] = useState(null);

  useEffect(() => {
    let alive = true;
    getVisitConfig(property.id).then((c) => {
      if (!alive) return;
      setConfig(c);
      if (c?.types.length === 1) setType(c.types[0]); // a single option needs no choosing
    });
    return () => {
      alive = false;
    };
  }, [property.id]);

  useEffect(() => {
    setBack(step === 'details' ? () => setStep('pick') : null);
  }, [step, setBack]);

  const days = useMemo(() => (config && type ? getVisitDays(config, type) : []), [config, type]);
  const slots = useMemo(() => (config && type && date ? getVisitSlots(config, type, date) : []), [config, type, date]);

  const chooseType = (t) => {
    setType(t);
    setDate(null);
    setTime(null);
  };
  const chooseDate = (d) => {
    setDate(d);
    setTime(null);
  };

  if (config === undefined) return <p className="sheet__lede" aria-busy="true">Loading availability…</p>;
  if (config === null || !config.types.length) {
    return (
      <>
        <PropertyChip property={property} />
        <p className="sheet__lede">Online visit booking isn’t set up for this property. Call or WhatsApp {owner.name} to arrange a visit.</p>
      </>
    );
  }

  const submit = async (e) => {
    e.preventDefault();
    const next = {};
    if (!name.trim()) next.name = 'Enter your name.';
    const mobile = normalizeIndianMobile(phone);
    if (!mobile) next.phone = 'Enter a valid 10-digit mobile number.';
    setErrors(next);
    if (Object.keys(next).length) return;
    setBusy(true);
    const res = await submitVisitRequest({ propertyId: property.id, type, date, time, name: name.trim(), phone: mobile });
    setRef(res.ref);
    setBusy(false);
    setStep('done');
  };

  const summary = (
    <dl className="summary">
      <div><dt>Property</dt><dd>{property.name}</dd></div>
      <div><dt>Visit</dt><dd>{TYPE_META[type]?.label}</dd></div>
      <div><dt>When</dt><dd>{date && formatLongDate(date)}, {time && formatTime(time)}</dd></div>
    </dl>
  );

  if (step === 'done') {
    return (
      <SuccessPanel
        title="Visit requested"
        actions={<button type="button" className="btn btn--primary btn--block" onClick={onClose}>Done</button>}
      >
        {summary}
        <p>{owner.name} will confirm your slot on {formatMobile(phone)}. Reference {ref}.</p>
      </SuccessPanel>
    );
  }

  if (step === 'details') {
    return (
      <form onSubmit={submit} noValidate className="form">
        {summary}
        <Field label="Your name" error={errors.name}>
          {(p) => <TextInput {...p} value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" />}
        </Field>
        <Field label="Mobile number" error={errors.phone} hint="The owner will confirm on this number.">
          {(p) => (
            <TextInput {...p} type="tel" inputMode="tel" autoComplete="tel" placeholder="98450 12345" value={phone} onChange={(e) => setPhone(e.target.value)} />
          )}
        </Field>
        <button type="submit" className="btn btn--primary btn--block" disabled={busy}>
          {busy ? 'Sending request…' : 'Request visit'}
        </button>
      </form>
    );
  }

  const typeOptions = config.types.map((t) => {
    const { Icon, label, sub } = TYPE_META[t];
    return {
      value: t,
      content: (
        <>
          <Icon size={22} strokeWidth={1.5} aria-hidden="true" />
          <span className="tile__title">{label}</span>
          <span className="tile__sub">{sub}</span>
        </>
      ),
    };
  });

  const dayOptions = days.map((d) => ({
    value: d.iso,
    disabled: !d.available,
    content: (
      <>
        <span className="tile__sub">{formatWeekday(d.iso)}</span>
        <span className="tile__num">{dayOfMonth(d.iso)}</span>
        <span className="tile__sub">{formatMonth(d.iso)}</span>
      </>
    ),
  }));

  const timeOptions = slots.map((s) => ({
    value: s.time,
    disabled: !s.available,
    content: <span className="tile__title">{formatTime(s.time)}</span>,
  }));

  const ready = type && date && time;

  return (
    <div className="form">
      <PropertyChip property={property} />

      {config.types.length > 1 ? (
        <RadioTiles legend="How would you like to visit?" name="visit-type" value={type} onChange={chooseType} options={typeOptions} />
      ) : (
        <p className="notice">
          {TYPE_META[config.types[0]].label} visits only for this property.
        </p>
      )}

      {type && (
        <RadioTiles legend="Pick a date" name="visit-date" value={date} onChange={chooseDate} options={dayOptions} layout="scroll" />
      )}

      {date && (
        <RadioTiles legend={`Pick a time on ${formatLongDate(date)}`} name="visit-time" value={time} onChange={setTime} options={timeOptions} layout="wrap" />
      )}

      <button type="button" className="btn btn--primary btn--block" disabled={!ready} onClick={() => setStep('details')}>
        Continue
      </button>
    </div>
  );
}

export default function ScheduleVisitSheet({ open, onClose, propertyId }) {
  const { getProperty } = useSite();
  const property = getProperty(propertyId);
  const [onBack, setOnBack] = useState(null);
  const setBack = useCallback((fn) => setOnBack(fn ? () => fn : null), []);
  if (!property) return null;

  return (
    <Sheet
      open={open}
      onClose={onClose}
      title="Schedule a visit"
      size="md"
      back={
        onBack ? (
          <button type="button" className="icon-btn icon-btn--plain" onClick={() => onBack()} aria-label="Back">
            <ArrowLeft size={18} strokeWidth={2} aria-hidden="true" />
          </button>
        ) : undefined
      }
    >
      <VisitFlow property={property} onClose={onClose} setBack={setBack} />
    </Sheet>
  );
}
