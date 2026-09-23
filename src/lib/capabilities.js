/**
 * Single place where a plan turns into capabilities. Advanced is a strict
 * superset of Basic: contact (call + WhatsApp) is always on.
 */
export const PLANS = ['basic', 'advanced'];

export const getCapabilities = (plan) => {
  const advanced = plan === 'advanced';
  return {
    plan,
    contact: true,
    liveAvailability: advanced,
    enquiry: advanced,
    scheduleVisit: advanced,
    moveInRequest: advanced,
    customBranding: advanced,
  };
};
