import {
  Wifi, Snowflake, BedDouble, Shirt, ShowerHead, Bath, LampDesk, Fan, Zap, Tv, Refrigerator,
  Droplets, WashingMachine, ShieldCheck, Cctv, Sparkles, UtensilsCrossed, CircleParking,
  MoveVertical, DoorOpen, Check,
} from 'lucide-react';

/** Catalog icon names -> lucide components. One icon family, one stroke weight. */
const MAP = {
  bed: BedDouble,
  wardrobe: Shirt,
  ac: Snowflake,
  geyser: ShowerHead,
  wifi: Wifi,
  desk: LampDesk,
  bath: Bath,
  balcony: DoorOpen,
  fan: Fan,
  power: Zap,
  tv: Tv,
  fridge: Refrigerator,
  water: Droplets,
  laundry: WashingMachine,
  security: ShieldCheck,
  cctv: Cctv,
  housekeeping: Sparkles,
  meals: UtensilsCrossed,
  parking: CircleParking,
  lift: MoveVertical,
};

export default function CatalogIcon({ name, size = 24, ...rest }) {
  const Cmp = MAP[name] ?? Check;
  return <Cmp size={size} strokeWidth={1.5} aria-hidden="true" {...rest} />;
}
