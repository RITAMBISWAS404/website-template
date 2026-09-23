# ManagR Owner Website

## Product & Information Architecture Brief

**Document purpose:** Define the complete functional and content
structure of the public owner website.

**This document intentionally does not define visual aesthetics,
typography, colours, spacing, component styling, layout composition, or
design direction.** Those decisions are intentionally left to the
implementation/design phase.

The website should be designed using this document as the product and
information source. The visual structure and presentation should be
determined separately using the supplied design-system reference.

------------------------------------------------------------------------

# 1. Product Overview

Every property owner using ManagR can have a public website representing
their own property business.

The website is a public-facing presentation of the owner's existing
ManagR property data.

It is not intended to be a separate property-management system or an
independent content-management system.

The website should communicate:

-   Who the owner/business is
-   What properties the owner operates
-   Where those properties are located
-   What accommodation options are available
-   What each property offers
-   How much accommodation starts from
-   How visitors can contact the owner
-   Additional functionality available to Advanced websites

The public website is therefore primarily a **property discovery and
property information experience**.

The owner may operate multiple properties in different locations. A
single owner website should be capable of presenting all of those
properties.

------------------------------------------------------------------------

# 2. Public Website Scope

The public website consists of two primary page types:

1.  **Owner Home / Property Listing Page**
2.  **Property Detail Page**

The same Property Detail Page type is reused for every property.

The website should not require a separate custom page design for every
individual property.

Property-specific information should come from property data.

Conceptually:

``` text
Owner Website
│
├── Home / Property Listing
│
└── Property Detail
      ├── Property A
      ├── Property B
      ├── Property C
      └── ...
```

------------------------------------------------------------------------

# 3. Owner Home / Property Listing Page

## Purpose

The homepage is intentionally simple.

Its primary purpose is to introduce the owner/business briefly and allow
visitors to discover and open the owner's properties.

The property listing is the core purpose of the page.

The homepage should not become a large corporate, marketing, or
SaaS-style landing page.

The required content is limited to the following conceptual areas:

-   Brand/navigation
-   Hero
-   About Us
-   Property Listing
-   FAQ / Q&A, when available
-   Footer

The exact visual arrangement, section composition, interactions, and
responsive behavior are not specified in this document.

Those decisions belong to the design/implementation phase.

------------------------------------------------------------------------

# 4. Website Header / Brand Identity

The public website should identify the owner/business clearly.

The header should have access to:

-   Owner/business logo, when available
-   Owner/business name
-   Relevant navigation to the website's public content
-   Appropriate contact/action access where applicable

The owner's identity should also be represented in the footer.

The website is an owner-owned website, not a marketplace containing
unrelated owners.

------------------------------------------------------------------------

# 5. Hero Content

The homepage should contain a simple hero area.

The hero should communicate:

-   Who the business/owner is
-   What the website offers
-   That visitors can explore the owner's properties

The hero should support appropriate calls to action for exploring
properties and/or contacting the owner.

The hero should not require additional marketing sections beyond what is
necessary to communicate this purpose.

Exact copy may be configured by the owner or supplied through the
website data.

------------------------------------------------------------------------

# 6. About Us

The homepage should contain a simple About Us section.

The purpose is to provide basic context about the owner/business.

The About Us content may include:

-   Owner/business introduction
-   Short description
-   Relevant background or business information

The About Us section does **not** require:

-   Owner photograph
-   Personal profile section
-   Large team section
-   Detailed company history
-   Separate biography page

A simple business introduction is sufficient for the initial website.

------------------------------------------------------------------------

# 7. Property Listing

The property listing is the primary functional purpose of the homepage.

The owner may have multiple properties.

The homepage must therefore present a collection of properties that
visitors can browse.

Each property listing/card should be capable of representing information
such as:

-   Property name
-   Property type
-   Locality / area
-   City
-   Property images
-   Starting rent
-   Available sharing types / room types where applicable
-   Relevant property highlights
-   Relevant amenities where appropriate
-   Direct-owner / no-brokerage information where applicable

The exact set of information displayed in a property listing is subject
to the available property data.

The property listing must not require manually duplicated content for
every property.

Each property should be represented by structured property data.

Selecting a property should take the visitor to that property's Property
Detail Page.

------------------------------------------------------------------------

# 8. Property Detail Page

## Purpose

The Property Detail Page contains the public information available for
one specific property.

Every property should use the same underlying page structure and
information model.

The page should provide enough information for a visitor to understand
the property and decide whether to contact the owner or, where
available, perform an Advanced action such as scheduling a visit.

The Property Detail Page must contain the following information
categories.

------------------------------------------------------------------------

# 9. Property Identity

The property page should identify the property using available
information such as:

-   Property name
-   Property type
-   Locality
-   City
-   Relevant property/verification indicators
-   Relevant summary information

The page may also expose a starting rent when available.

------------------------------------------------------------------------

# 10. Property Photos

The property page should provide access to the property's photographs.

The property data may contain multiple images.

The visitor should be able to understand the property visually through
its available photographs.

The website should support:

-   Primary property imagery
-   Additional property images
-   Access to the complete available photo collection

The exact gallery interaction is a design decision.

------------------------------------------------------------------------

# 11. About the Property

The property page should include the property's description.

This section communicates the information available about the property
itself.

It may describe:

-   General property character
-   Location-related context
-   Facilities
-   Services
-   Other information supplied by the property data

The website should not invent property information that does not exist
in the underlying data.

------------------------------------------------------------------------

# 12. Room Types

The property page should communicate the room/accommodation types
available for the property.

The underlying ManagR inventory hierarchy is:

``` text
Property
    ↓
Flat
    ↓
Room
    ↓
Bed
```

For the public website, room information is presented at the appropriate
public room-type level.

A room type may contain:

-   Sharing type
-   Monthly rent
-   Security deposit
-   Applicable room amenities
-   Availability information when Advanced availability is enabled

Examples of sharing types include:

-   Private room
-   2 sharing
-   3 sharing
-   Triple sharing
-   Other supported sharing types

The website should not expose private tenant information.

------------------------------------------------------------------------

# 13. Rent and Security Deposit

Where available, the property website should communicate:

-   Starting rent
-   Room-type monthly rent
-   Security deposit

These values originate from ManagR property/inventory data.

The public website should not allow a visitor-facing design to imply
that the owner can independently enter a different rent on the website.

The website is a presentation layer for the underlying property data.

------------------------------------------------------------------------

# 14. Amenities

The property page should communicate available property/room amenities.

Examples include:

-   Bed
-   Wardrobe
-   Air Conditioning
-   Geyser
-   Wi-Fi

The actual list depends on the property's available data.

Amenities should not be invented or manually duplicated when they are
already represented by the underlying property information.

------------------------------------------------------------------------

# 15. Services

The property page should communicate available services.

Examples include:

-   RO water
-   Washing area
-   Security
-   Other services supported by the property's data

The actual list depends on available property information.

------------------------------------------------------------------------

# 16. Policies

The property page should communicate relevant property policies.

Examples may include:

-   Payment terms
-   Direct payment information
-   Notice period

Only information available from the underlying property data should be
represented.

------------------------------------------------------------------------

# 17. Rules and Regulations

The property page should communicate applicable property rules.

Examples include:

-   No smoking
-   No drinking
-   Other property rules

The exact rules depend on the property's data.

------------------------------------------------------------------------

# 18. Location

The property page should communicate the property's general location.

The website may show:

-   Locality
-   City
-   Approximate map/location
-   Relevant nearby context when such data exists

## Exact Address Privacy

The exact street address of a property must not be exposed publicly.

The public website should use an approximate location representation.

The purpose is to help visitors understand the general area without
publicly exposing the owner's exact property address.

------------------------------------------------------------------------

# 19. Similar Properties

The property page may provide access to other properties belonging to
the same owner.

This allows a visitor who is interested in one property to discover
other properties in the owner's portfolio.

The implementation should treat these as properties belonging to the
same owner website, not unrelated marketplace listings.

------------------------------------------------------------------------

# 20. Recently Viewed Properties

The website may support a recently viewed property experience.

If implemented, it should represent properties the visitor has
previously viewed during their browsing session or supported browsing
context.

This is secondary to the core property information experience.

------------------------------------------------------------------------

# 21. Owner Contact

Owner contact is available in **both Basic and Advanced websites**.

It is not an Advanced-only feature.

The public website should provide visitors with appropriate direct
contact options.

At minimum, the product brief specifies:

-   Call owner
-   WhatsApp owner

The owner contact information should not be placed behind a payment wall
in the Basic website.

Basic visitors should be able to contact the owner directly.

Advanced websites retain the same contact capabilities and add
additional functionality.

------------------------------------------------------------------------

# 22. Basic Website

The Basic website is the simpler public owner website.

It provides the core property presentation and direct-contact
experience.

## Basic Homepage

The Basic homepage contains:

-   Owner/business identity
-   Hero
-   About Us
-   Property listing
-   FAQ/Q&A when available
-   Footer

## Basic Property Detail

The Basic property page contains:

-   Property identity
-   Property photos
-   About the property
-   Room types
-   Rent
-   Security deposit
-   Amenities
-   Services
-   Policies
-   Rules and regulations
-   Approximate location
-   Similar properties where applicable
-   Recently viewed where applicable
-   Call owner
-   WhatsApp owner

## Basic does not include

The following capabilities are Advanced-only:

-   Live public availability
-   Visitor enquiry form
-   Visit scheduling
-   Physical/virtual visit selection
-   Booking / move-in requests
-   Advanced website customization capabilities
-   Custom owner logo where the plan rules restrict it
-   Custom colours and fonts
-   Section rearrangement
-   Additional custom pages
-   Advanced Google discoverability functionality

Basic should still be a complete and useful public website.

It should not be intentionally made to look incomplete.

------------------------------------------------------------------------

# 23. Advanced Website

The Advanced website contains everything available in Basic, plus
additional capabilities that make the owner's website more interactive.

## Advanced includes all Basic capabilities

Therefore Advanced retains:

-   Property listing
-   Property detail pages
-   Photos
-   Room types
-   Rent
-   Deposit
-   Amenities
-   Services
-   Policies
-   Rules
-   Approximate location
-   Call
-   WhatsApp

Advanced then adds additional capabilities.

------------------------------------------------------------------------

# 24. Advanced Live Availability

Advanced can expose public property/room availability.

Availability is based on the owner's underlying ManagR inventory.

Public availability may communicate states such as:

-   Available now
-   Partly available
-   Fully booked
-   Available from a future date
-   Availability turned off
-   Property temporarily unavailable

Availability should not expose private inventory information.

The public website must never expose:

-   Tenant names
-   Tenant phone numbers
-   Tenant photographs
-   Tenant documents
-   The reason a bed is blocked
-   Which specific bed belongs to a specific person
-   Other private tenant information

Public availability is about accommodation availability, not tenant
information.

------------------------------------------------------------------------

# 25. Advanced Enquiry

Advanced can provide an enquiry capability.

The enquiry is intended to turn a visitor into a lead for the owner.

An enquiry can collect information such as:

-   Name
-   Phone
-   What the visitor is looking for
-   Desired move-in date
-   Budget

The enquiry is associated with the owner's website and can become a lead
in the owner's CRM.

Basic does not include the enquiry form.

Basic visitors can still directly call or WhatsApp the owner.

------------------------------------------------------------------------

# 26. Advanced Schedule a Visit

Schedule a Visit is an **Advanced-only** public website capability.

It must be associated with a **specific property**.

The visitor should first be viewing a particular property and then be
able to request a visit to that property.

Conceptually:

``` text
Owner Website
    ↓
Property Listing
    ↓
Specific Property
    ↓
Schedule a Visit
```

It must not be treated as a generic website-level booking calendar.

------------------------------------------------------------------------

# 27. Visit Types

Advanced visit scheduling supports:

-   Physical / in-person visit
-   Virtual / video walkthrough

The visitor should be able to select the supported visit type for the
property.

The actual options available depend on what the owner has configured.

------------------------------------------------------------------------

# 28. Visit Availability

The owner configures the availability for visits.

The visitor should only be able to select dates and time slots that the
owner has made available.

The owner's configuration can include:

-   Days of the week on which visits are accepted
-   Available time slots
-   Blackout dates
-   Visit type availability
-   Other scheduling constraints supported by the product

The public website must not allow the visitor to invent an arbitrary
appointment time outside the configured availability.

------------------------------------------------------------------------

# 29. Advanced Visit Flow

The visitor flow should conceptually collect:

1.  Specific property
2.  Visit type
3.  Available date
4.  Available time
5.  Visitor name
6.  Visitor phone
7.  Confirmation

The exact number of screens, modal steps, or interaction pattern is
intentionally not defined here.

The design/implementation phase should determine the best interaction.

The resulting visit must remain associated with the selected property.

------------------------------------------------------------------------

# 30. Advanced Booking / Move-in Request

Advanced can support booking or move-in requests.

A visitor may request a room/room type and move-in date.

The system may determine whether that room type can be available by the
requested date.

Possible states include:

-   Requested date is available
-   Requested date is not available
-   Earlier/later availability is known
-   Request is awaiting owner approval

The payment mechanism is not part of this website structure definition.

Do not invent a payment flow unless it is explicitly implemented
elsewhere.

------------------------------------------------------------------------

# 31. Basic vs Advanced Capability Matrix

  Capability                                     Basic   Advanced
  --------------------------- ------------------------ ----------
  Owner website                                    Yes        Yes
  Owner/business identity                          Yes        Yes
  Home / property listing                          Yes        Yes
  Property detail pages                            Yes        Yes
  Property photos                                  Yes        Yes
  Property description                             Yes        Yes
  Room types                                       Yes        Yes
  Rent                                             Yes        Yes
  Security deposit                                 Yes        Yes
  Amenities                                        Yes        Yes
  Services                                         Yes        Yes
  Policies                                         Yes        Yes
  Rules & regulations                              Yes        Yes
  Approximate map                                  Yes        Yes
  Call owner                                       Yes        Yes
  WhatsApp owner                                   Yes        Yes
  Owner About Us                                   Yes        Yes
  Live availability                                 No        Yes
  Enquiry form                                      No        Yes
  Schedule a visit                                  No        Yes
  Physical visit                                    No        Yes
  Virtual visit                                     No        Yes
  Booking / move-in request                         No        Yes
  Owner logo customization      Default/basic behavior        Yes
  Custom colours                                    No        Yes
  Custom fonts                                      No        Yes
  Section rearrangement                             No        Yes
  Additional pages                                  No        Yes
  Google discoverability                            No        Yes
  Custom domain                                     No     Future

------------------------------------------------------------------------

# 32. Basic Website Functional Principle

The Basic website should answer the visitor's core questions:

-   Who is this owner/business?
-   What properties do they have?
-   Where are the properties?
-   What does each property offer?
-   What are the room types?
-   How much does it cost?
-   What amenities/services are available?
-   What are the policies/rules?
-   Where is the property approximately located?
-   How do I contact the owner?

The Basic website should not require visitors to purchase anything
simply to access ordinary property information or contact the owner.

------------------------------------------------------------------------

# 33. Advanced Website Functional Principle

The Advanced website answers everything in Basic and additionally allows
the website to act as a more interactive front desk.

It can answer:

-   What is currently available?
-   Can I submit an enquiry?
-   Can I schedule a visit?
-   Can I choose physical or virtual?
-   Which dates are available?
-   Which time slots are available?
-   Can I request a move-in/booking?

The Advanced capabilities are additions to the Basic experience, not
replacements for it.

------------------------------------------------------------------------

# 34. Source-of-Truth Principle

The website is a presentation layer over ManagR data.

Property information should originate from the underlying system.

The public website should not independently create contradictory
property information.

Important examples include:

-   Rent
-   Room count/type
-   Amenities
-   Property photos
-   Availability
-   Property status

The website should display what the underlying system provides.

------------------------------------------------------------------------

# 35. Approved Properties

Only properties that are approved for public display should appear
publicly.

A property that is not approved should not be treated as an ordinary
publicly available property.

If the owner-facing product needs to represent unpublished or
under-review properties, that is an owner-side/dashboard concern and is
outside the scope of these two public website pages.

------------------------------------------------------------------------

# 36. Property Inventory Privacy

The public website must maintain a strict separation between public
property information and private tenant information.

Public:

-   Property
-   Room type
-   Rent
-   Deposit
-   Amenities
-   Services
-   Public availability where Advanced is enabled

Private:

-   Tenant names
-   Tenant contact information
-   Tenant documents
-   Tenant photographs
-   Individual tenant assignments
-   Internal blocking reasons

The public website must never reveal private tenant information.

------------------------------------------------------------------------

# 37. Website Address and Ownership

The website belongs to a specific owner/business.

The website should communicate that ownership through:

-   Owner/business name
-   Owner/business logo where available
-   Owner contact
-   Owner's properties

It should not present itself as a general marketplace.

------------------------------------------------------------------------

# 38. Content Boundaries

The website should not introduce information categories simply because
they are common on real-estate websites.

Only use information supported by the ManagR product/data model or
explicitly defined in this brief.

In particular, do not assume the website has:

-   Exact property address
-   Floor plans
-   Video tours
-   Reviews
-   Nearby landmarks
-   Restaurant/food menus
-   Detailed neighbourhood guides
-   Property owner biography
-   Team profiles
-   Arbitrary property statistics

These can exist in future product scope, but they should not be assumed
to exist in the initial website unless data is provided.

------------------------------------------------------------------------

# 39. FAQ / Q&A

The homepage may include an FAQ/Q&A section when FAQ content exists.

The purpose is to answer common visitor questions without requiring
direct contact.

FAQ content should be based on information available to the owner
website.

If no FAQ data exists, the section should not be treated as mandatory.

The website should be able to omit the section cleanly when there is no
content.

------------------------------------------------------------------------

# 40. Footer

The footer should provide the owner's identity and relevant public
navigation/contact information.

It should include:

-   Owner/business logo
-   Owner/business name
-   Relevant contact information
-   Relevant navigation links
-   Other supported public links
-   ManagR attribution according to the applicable plan rules

The footer is shared conceptually between Basic and Advanced, although
Advanced may have additional owner branding/customization capabilities.

------------------------------------------------------------------------

# 41. Public Website Page Model

The public website should ultimately be understandable as:

``` text
HOME
│
├── Owner identity
├── Hero
├── About Us
├── Properties
│     ├── Property A
│     ├── Property B
│     ├── Property C
│     └── ...
├── FAQ / Q&A
└── Footer


PROPERTY DETAIL
│
├── Property identity
├── Photos
├── About property
├── Room types
├── Rent
├── Deposit
├── Amenities
├── Services
├── Policies
├── Rules & regulations
├── Approximate location
├── Similar properties
├── Recently viewed
└── Contact
      ├── Call
      └── WhatsApp

ADVANCED ADDITIONS
│
├── Live availability
├── Enquiry
├── Schedule a visit
│     ├── Specific property
│     ├── Physical / virtual
│     ├── Available date
│     ├── Available time
│     └── Visitor details
└── Booking / move-in request
```

This diagram represents the product/content model, not a prescribed
visual layout.

------------------------------------------------------------------------

# 42. Design Freedom

This document intentionally does not prescribe:

-   Visual layout
-   Grid structure
-   Card arrangement
-   Typography
-   Colour palette
-   Border radius
-   Shadows
-   Spacing
-   Navigation appearance
-   Hero composition
-   Gallery composition
-   Mobile layout
-   Desktop layout
-   Animation
-   Interaction styling
-   Theme styling

Those decisions should be made during the design/implementation phase.

The implementation should use the information and functional
requirements in this document as its source of truth.

------------------------------------------------------------------------

# 43. Future Theme Architecture

The public website is expected to support multiple visual themes in the
future.

The underlying content and functionality should therefore remain
independent from visual styling.

The same:

-   Property data
-   Property detail information
-   Owner information
-   Basic/Advanced capabilities
-   Visit scheduling
-   Availability
-   Enquiry functionality

should be capable of being presented through different visual themes
later.

The initial implementation should not require different data structures
for different themes.

------------------------------------------------------------------------

# 44. Out of Scope for This Initial Public Website

The following are not part of the two public pages being defined here:

-   ManagR owner dashboard
-   Website editor
-   Website setup/onboarding
-   Website billing
-   Plan purchase flow
-   Admin interface
-   Property management interface
-   Tenant management
-   Inventory management interface
-   CRM interface
-   Visit management dashboard
-   Authentication
-   Backend implementation
-   Payment processing
-   Domain management
-   Full analytics dashboard

Those belong to other product areas.

------------------------------------------------------------------------

# 45. Final Product Definition

The initial public website can be summarized as:

## Basic

A simple owner-owned property website that lets visitors:

**Discover → Understand → Contact**

Visitors can browse the owner's properties, open a property, understand
its accommodation options and contact the owner directly.

## Advanced

The same owner-owned property website with additional capabilities that
let visitors:

**Discover → Understand → Check availability → Enquire → Schedule a
visit → Request a booking**

The defining Advanced interaction for this website is **Schedule a Visit
for a specific property using owner-configured available dates and time
slots**.

------------------------------------------------------------------------

# 46. Implementation Principle

Build the website as a reusable system rather than a collection of
independent pages.

The fundamental entities are:

``` text
Owner
  ↓
Website
  ↓
Properties
  ↓
Property
  ↓
Room Types
  ↓
Property Information
```

Advanced interactions attach to those entities:

``` text
Property
  ↓
Availability

Property
  ↓
Visit Scheduling

Property
  ↓
Enquiry

Property / Room Type
  ↓
Booking / Move-in Request
```

The website should remain a public presentation of the owner's property
business and its underlying ManagR data.
