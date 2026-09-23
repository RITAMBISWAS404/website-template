# ManagR Owner Website

Public owner website: a **Home / Property Listing** page (`/`) and one reusable **Property Detail** page (`/property/:id`).
Built from `MANAGR_OWNER_WEBSITE_STRUCTURE_BRIEF.md` (what exists) and `DESIGN.md` (how it looks).

```bash
npm install
npm run dev      # http://localhost:5173
npm run build
```

In dev, a small "Preview: Basic | Advanced" pill (bottom-left) switches plans. `?plan=basic|advanced` also works. It is not included in production builds.

## Structure

```
src/
  data/        Mock ManagR data. UI never imports these directly, only data/api.js
    owner.js website.js properties.js faqs.js visits.js catalog.js api.js
  lib/         Pure logic: capabilities (plan -> features), property (derived rent, availability),
               visits (bookable dates/slots), format, dates
  context/     SiteContext (data + plan + capabilities), OverlayContext (all modals)
  components/
    site/      Header, Hero, About, PropertyList, FAQ, Footer, ContactSheet, ContactActions
    property/  PropertyCard, Gallery, PhotoViewer, RoomTypes, InfoSections, Location, ContactCard, StickyBar, CardRow
    advanced/  ScheduleVisitSheet, EnquirySheet, MoveInSheet
    ui/        Sheet (native <dialog>), Form controls, Picture, Icon, Logo
  styles/      tokens.css is the theme boundary; other files only use its variables
```

## Basic vs Advanced

One codebase, one Property Detail page. `lib/capabilities.js` maps the plan to flags
(`liveAvailability`, `enquiry`, `scheduleVisit`, `moveInRequest`, `customBranding`); components read flags and never the plan name.
Call and WhatsApp are always available.

## Connecting a backend

Replace the bodies in `src/data/api.js` (`getSiteData`, `getVisitConfig`, `submitEnquiry`, `submitVisitRequest`, `submitMoveInRequest`).
Notes on the data contract:

- Only `approved` properties are returned publicly.
- Starting rent is derived from room types, never stored separately.
- `location.approx` is a fuzzed centre point; no street address is part of the public payload.
- Availability carries no tenant, bed or blocking-reason information.

## Theming

Add a `[data-theme="name"]` block in `styles/tokens.css` and set `website.theme`. No component or data changes are needed.
