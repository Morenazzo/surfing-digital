/**
 * Industry mapping for Fillout form
 * Maps industry slugs to display labels
 */

export const INDUSTRIES = [
  { label: 'Retail & E-commerce', slug: 'retail_ecommerce' },
  { label: 'Technology & Software', slug: 'technology_software' },
  { label: 'Marketing & Advertising (Agencies)', slug: 'marketing_advertising' },
  { label: 'Manufacturing (incl. CPG)', slug: 'manufacturing_cpg' },
  { label: 'Transportation & Logistics / Supply Chain', slug: 'transport_logistics' },
  { label: 'Finance & Banking (incl. Fintech)', slug: 'finance_banking' },
  { label: 'Healthcare & Life Sciences', slug: 'healthcare_lifesciences' },
  { label: 'Education & Training', slug: 'education_training' },
  { label: 'Hospitality, Travel & Leisure', slug: 'hospitality_travel' },
  { label: 'Construction & Real Estate', slug: 'construction_realestate' },
  { label: 'Energy, Utilities & Natural Resources', slug: 'energy_utilities' },
  { label: 'Media & Entertainment', slug: 'media_entertainment' },
  { label: 'Telecommunications', slug: 'telecommunications' },
  { label: 'Government & Nonprofit', slug: 'government_nonprofit' },
  { label: 'Professional Services (Consulting, Legal, Accounting)', slug: 'professional_services' },
  { label: 'Other', slug: 'other' },
] as const

/**
 * Get industry label from slug
 */
export function getIndustryLabel(slug: string): string {
  const industry = INDUSTRIES.find((i) => i.slug === slug)
  return industry ? industry.label : slug
}

/**
 * Get industry slug from label
 */
export function getIndustrySlug(label: string): string {
  const industry = INDUSTRIES.find((i) => i.label === label)
  return industry ? industry.slug : label
}

/**
 * Parse industry value (could be slug or label)
 * Returns both slug and label
 */
export function parseIndustry(value: string): { label: string; slug: string } {
  // First try to find by slug
  let industry = INDUSTRIES.find((i) => i.slug === value)
  
  // If not found, try by label
  if (!industry) {
    industry = INDUSTRIES.find((i) => i.label === value)
  }
  
  // If still not found, return the value as-is
  if (!industry) {
    return { label: value, slug: value }
  }
  
  return { label: industry.label, slug: industry.slug }
}

