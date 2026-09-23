import { useEffect, useId, useRef, useState } from 'react';
import { X } from 'lucide-react';

const EXIT_MS = 180;

/**
 * Modal surface built on the native <dialog>: focus trap, Esc, inert background
 * and focus return come from the platform. Bottom sheet on phones, centred
 * modal on larger screens, full-bleed when `size="full"`.
 * Children mount only while open, so internal state resets on every open.
 */
export default function Sheet({ open, onClose, title, size = 'md', children, footer, back }) {
  const ref = useRef(null);
  const titleId = useId();
  const [mounted, setMounted] = useState(open);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (open) {
      setMounted(true);
      return undefined;
    }
    if (!mounted) return undefined;
    setVisible(false);
    const t = setTimeout(() => {
      ref.current?.close();
      setMounted(false);
    }, EXIT_MS);
    return () => clearTimeout(t);
  }, [open, mounted]);

  useEffect(() => {
    if (!mounted || !open) return undefined;
    const dlg = ref.current;
    if (dlg && !dlg.open) dlg.showModal();
    const id = requestAnimationFrame(() => requestAnimationFrame(() => setVisible(true)));
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      cancelAnimationFrame(id);
      document.body.style.overflow = prev;
    };
  }, [mounted, open]);

  if (!mounted) return null;

  return (
    <dialog
      ref={ref}
      className={`sheet sheet--${size}`}
      data-visible={visible}
      aria-labelledby={titleId}
      onCancel={(e) => {
        e.preventDefault();
        onClose();
      }}
      onMouseDown={(e) => {
        if (e.target === ref.current) onClose();
      }}
    >
      <div className="sheet__panel">
        <header className="sheet__header">
          {back ?? (
            <button type="button" className="icon-btn icon-btn--plain" onClick={onClose} aria-label="Close">
              <X size={18} strokeWidth={2} aria-hidden="true" />
            </button>
          )}
          <h2 className="sheet__title" id={titleId}>
            {title}
          </h2>
          <span className="sheet__spacer" aria-hidden="true" />
        </header>
        <div className="sheet__body">{children}</div>
        {footer && <div className="sheet__footer">{footer}</div>}
      </div>
    </dialog>
  );
}
