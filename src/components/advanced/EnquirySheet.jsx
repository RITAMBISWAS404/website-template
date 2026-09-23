import { useState } from 'react';
import Sheet from '../ui/Sheet.jsx';
import { Field, Select, SuccessPanel, TextInput } from '../ui/Form.jsx';
import PropertyChip from './PropertyChip.jsx';
import { useSite } from '../../context/SiteContext.jsx';
import { submitEnquiry } from '../../data/api.js';
import { formatMobile, normalizeIndianMobile } from '../../lib/format.js';
import { todayISO } from '../../lib/dates.js';

function EnquiryForm({ property, onClose }) {
  const { owner, properties } = useSite();
  const [values, setValues] = useState({ name: '', phone: '', property: property?.id ?? '', looking: '', moveIn: '', budget: '' });
  const [errors, setErrors] = useState({});
  const [busy, setBusy] = useState(false);
  const [ref, setRef] = useState(null);

  const set = (k) => (e) => setValues((v) => ({ ...v, [k]: e.target.value }));

  // "Looking for" adapts to the property the visitor chose (or to everything we offer).
  const scoped = property ?? properties.find((p) => p.id === values.property);
  const options = [
    ...new Set((scoped ? [scoped] : properties).flatMap((p) => p.roomTypes.map((r) => r.label))),
  ];

  const submit = async (e) => {
    e.preventDefault();
    const next = {};
    if (!values.name.trim()) next.name = 'Enter your name.';
    const mobile = normalizeIndianMobile(values.phone);
    if (!mobile) next.phone = 'Enter a valid 10-digit mobile number.';
    setErrors(next);
    if (Object.keys(next).length) return;
    setBusy(true);
    const res = await submitEnquiry({ ...values, name: values.name.trim(), phone: mobile, propertyId: values.property || null });
    setRef(res.ref);
    setBusy(false);
  };

  if (ref) {
    return (
      <SuccessPanel
        title="Enquiry sent"
        actions={<button type="button" className="btn btn--primary btn--block" onClick={onClose}>Done</button>}
      >
        <p>Thanks {values.name.trim().split(' ')[0]}. {owner.name} will get back to you on {formatMobile(values.phone)}. Reference {ref}.</p>
      </SuccessPanel>
    );
  }

  return (
    <form onSubmit={submit} noValidate className="form">
      {property && <PropertyChip property={property} />}
      <Field label="Your name" error={errors.name}>
        {(p) => <TextInput {...p} value={values.name} onChange={set('name')} autoComplete="name" />}
      </Field>
      <Field label="Mobile number" error={errors.phone}>
        {(p) => <TextInput {...p} type="tel" inputMode="tel" autoComplete="tel" placeholder="98450 12345" value={values.phone} onChange={set('phone')} />}
      </Field>
      {!property && (
        <Field label="Property">
          {(p) => (
            <Select {...p} value={values.property} onChange={set('property')}>
              <option value="">Any property</option>
              {properties.map((pr) => <option key={pr.id} value={pr.id}>{pr.name}, {pr.locality}</option>)}
            </Select>
          )}
        </Field>
      )}
      <Field label="What are you looking for?">
        {(p) => (
          <Select {...p} value={values.looking} onChange={set('looking')}>
            <option value="">Not sure yet</option>
            {options.map((o) => <option key={o} value={o}>{o}</option>)}
          </Select>
        )}
      </Field>
      <div className="form__pair">
        <Field label="Move-in date">
          {(p) => <TextInput {...p} type="date" min={todayISO()} value={values.moveIn} onChange={set('moveIn')} />}
        </Field>
        <Field label="Monthly budget (₹)">
          {(p) => <TextInput {...p} type="number" inputMode="numeric" min="0" step="500" placeholder="10000" value={values.budget} onChange={set('budget')} />}
        </Field>
      </div>
      <button type="submit" className="btn btn--primary btn--block" disabled={busy}>
        {busy ? 'Sending…' : 'Send enquiry'}
      </button>
    </form>
  );
}

export default function EnquirySheet({ open, onClose, propertyId }) {
  const { getProperty } = useSite();
  const property = propertyId ? getProperty(propertyId) : null;
  return (
    <Sheet open={open} onClose={onClose} title="Send an enquiry" size="md">
      <EnquiryForm property={property} onClose={onClose} />
    </Sheet>
  );
}
