/**
 * Mock pricing data for insurance types by company
 * In production, this would come from an API
 */

export const INSURANCE_PRICING = {
  auto: [
    { company: "Hollard", companyId: "hollard", monthly: 2500, yearly: 27000 },
    { company: "Sanlam", companyId: "sanlam", monthly: 2800, yearly: 30240 },
    { company: "EMOSE", companyId: "emose", monthly: 2350, yearly: 25380 },
    { company: "Mapfre", companyId: "mapfre", monthly: 2650, yearly: 28620 },
    { company: "MCS", companyId: "mcs", monthly: 2900, yearly: 31320 },
  ],
  vida: [
    { company: "Hollard", companyId: "hollard", monthly: 900, yearly: 9720 },
    { company: "Sanlam", companyId: "sanlam", monthly: 800, yearly: 8640 },
    { company: "EMOSE", companyId: "emose", monthly: 850, yearly: 9180 },
    { company: "Mapfre", companyId: "mapfre", monthly: 920, yearly: 9936 },
    { company: "MCS", companyId: "mcs", monthly: 880, yearly: 9504 },
  ],
  habitacao: [
    { company: "Hollard", companyId: "hollard", monthly: 1200, yearly: 12960 },
    { company: "Sanlam", companyId: "sanlam", monthly: 1350, yearly: 14580 },
    { company: "EMOSE", companyId: "emose", monthly: 1150, yearly: 12420 },
    { company: "Mapfre", companyId: "mapfre", monthly: 1280, yearly: 13824 },
    { company: "MCS", companyId: "mcs", monthly: 1400, yearly: 15120 },
  ],
  viagem: [
    { company: "Hollard", companyId: "hollard", monthly: 450, yearly: 4860 },
    { company: "Sanlam", companyId: "sanlam", monthly: 500, yearly: 5400 },
    { company: "EMOSE", companyId: "emose", monthly: 420, yearly: 4536 },
    { company: "Mapfre", companyId: "mapfre", monthly: 480, yearly: 5184 },
    { company: "MCS", companyId: "mcs", monthly: 520, yearly: 5616 },
  ],
  empresarial: [
    { company: "Hollard", companyId: "hollard", monthly: 3500, yearly: 37800 },
    { company: "Sanlam", companyId: "sanlam", monthly: 3800, yearly: 41040 },
    { company: "EMOSE", companyId: "emose", monthly: 3350, yearly: 36180 },
    { company: "Mapfre", companyId: "mapfre", monthly: 3650, yearly: 39420 },
    { company: "MCS", companyId: "mcs", monthly: 3900, yearly: 42120 },
  ],
  acidentes: [
    { company: "Hollard", companyId: "hollard", monthly: 350, yearly: 3780 },
    { company: "Sanlam", companyId: "sanlam", monthly: 400, yearly: 4320 },
    { company: "EMOSE", companyId: "emose", monthly: 320, yearly: 3456 },
    { company: "Mapfre", companyId: "mapfre", monthly: 380, yearly: 4104 },
    { company: "MCS", companyId: "mcs", monthly: 420, yearly: 4536 },
  ],
};

/**
 * Get the cheapest insurer for a specific insurance type
 */
export function getCheapestInsurer(insuranceType) {
  const prices = INSURANCE_PRICING[insuranceType];
  if (!prices || prices.length === 0) {
    return null;
  }

  // Find the insurer with the lowest monthly price
  const cheapest = prices.reduce((min, current) => {
    return current.monthly < min.monthly ? current : min;
  }, prices[0]);

  return cheapest;
}

/**
 * Get all insurers for a specific insurance type, sorted by price
 */
export function getInsurersForType(insuranceType) {
  const prices = INSURANCE_PRICING[insuranceType];
  if (!prices || prices.length === 0) {
    return [];
  }

  // Sort by monthly price (ascending)
  return [...prices].sort((a, b) => a.monthly - b.monthly);
}

/**
 * Format currency in MZN
 */
export function formatMZN(amount) {
  return new Intl.NumberFormat("pt-MZ", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}



