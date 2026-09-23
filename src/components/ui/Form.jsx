import { useId } from 'react';
import { CircleCheck } from 'lucide-react';

/** Label + control + hint/error, wired with ids so screen readers announce them. */
export function Field({ label, error, hint, children }) {
  const id = useId();
  const describedBy = [error && `${id}-err`, hint && `${id}-hint`].filter(Boolean).join(' ') || undefined;
  return (
    <div className="field">
      <label className="field__label" htmlFor={id}>{label}</label>
      {children({ id, 'aria-describedby': describedBy, 'aria-invalid': error ? true : undefined })}
      {hint && !error && <p className="field__hint" id={`${id}-hint`}>{hint}</p>}
      {error && <p className="field__error" id={`${id}-err`} role="alert">{error}</p>}
    </div>
  );
}

export const TextInput = ({ className = '', ...props }) => <input className={`input ${className}`} {...props} />;

export const Select = ({ children, className = '', ...props }) => (
  <select className={`input select ${className}`} {...props}>{children}</select>
);

/** A group of native radios styled as selectable tiles. Keyboard and screen-reader behaviour is native. */
export function RadioTiles({ legend, name, value, onChange, options, layout = 'row', hideLegend = false }) {
  return (
    <fieldset className={`tiles tiles--${layout}`}>
      <legend className={hideLegend ? 'sr-only' : 'field__label'}>{legend}</legend>
      <div className="tiles__list">
        {options.map((o) => (
          <label key={o.value} className={`tile ${o.disabled ? 'is-disabled' : ''}`}>
            <input
              type="radio"
              name={name}
              value={o.value}
              checked={value === o.value}
              disabled={o.disabled}
              onChange={() => onChange(o.value)}
            />
            <span className="tile__face">{o.content}</span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}

export function SuccessPanel({ title, children, actions }) {
  return (
    <div className="success" role="status">
      <CircleCheck size={40} strokeWidth={1.5} className="success__icon" aria-hidden="true" />
      <h3 className="success__title">{title}</h3>
      <div className="success__body">{children}</div>
      {actions && <div className="success__actions">{actions}</div>}
    </div>
  );
}
