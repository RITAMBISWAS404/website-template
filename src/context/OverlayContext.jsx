import { createContext, useCallback, useContext, useMemo, useRef, useState } from 'react';
import ContactSheet from '../components/site/ContactSheet.jsx';
import EnquirySheet from '../components/advanced/EnquirySheet.jsx';
import ScheduleVisitSheet from '../components/advanced/ScheduleVisitSheet.jsx';
import MoveInSheet from '../components/advanced/MoveInSheet.jsx';
import Gallery from '../components/property/PhotoViewer.jsx';

const OverlayContext = createContext(null);

/**
 * One place that owns every modal surface. Triggers call e.g. `openVisit(id)`;
 * the last request is retained while the exit animation plays so content
 * never flashes empty.
 */
export function OverlayProvider({ children }) {
  const [state, setState] = useState({ open: false, kind: null, props: {} });
  const last = useRef(state);
  if (state.kind) last.current = state;
  const shown = state.kind ? state : last.current;

  const open = useCallback((kind, props = {}) => setState({ open: true, kind, props }), []);
  const close = useCallback(() => setState((s) => ({ ...s, open: false })), []);

  const api = useMemo(
    () => ({
      openContact: (propertyId) => open('contact', { propertyId }),
      openEnquiry: (propertyId) => open('enquiry', { propertyId }),
      openVisit: (propertyId) => open('visit', { propertyId }),
      openMoveIn: (propertyId, roomTypeId) => open('movein', { propertyId, roomTypeId }),
      openPhotos: (propertyId, index = 0) => open('photos', { propertyId, index }),
      close,
    }),
    [open, close],
  );

  const common = { onClose: close, ...shown.props };
  return (
    <OverlayContext.Provider value={api}>
      {children}
      {shown.kind === 'contact' && <ContactSheet open={state.open && state.kind === 'contact'} {...common} />}
      {shown.kind === 'enquiry' && <EnquirySheet open={state.open && state.kind === 'enquiry'} {...common} />}
      {shown.kind === 'visit' && <ScheduleVisitSheet open={state.open && state.kind === 'visit'} {...common} />}
      {shown.kind === 'movein' && <MoveInSheet open={state.open && state.kind === 'movein'} {...common} />}
      {shown.kind === 'photos' && <Gallery open={state.open && state.kind === 'photos'} {...common} />}
    </OverlayContext.Provider>
  );
}

export const useOverlays = () => {
  const ctx = useContext(OverlayContext);
  if (!ctx) throw new Error('useOverlays must be used within OverlayProvider');
  return ctx;
};
