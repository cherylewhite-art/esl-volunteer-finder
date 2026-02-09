export interface Provider {
  id: string
  slug: string
  name: string
  website_url: string
  year_established: number | null
  registration_fee: number | null
  weekly_fee_1wk: number | null
  weekly_fee_2wk: number | null
  weekly_fee_4wk: number | null
  what_included: string[] | null
  what_not_included: string[] | null
  hidden_costs_min: number | null
  hidden_costs_max: number | null
  what_they_dont_tell_you: string[] | null
  created_at: string
}

export interface Opportunity {
  id: string
  provider_id: string
  country: string
  city: string | null
  program_fee_1wk: number | null
  program_fee_2wk: number | null
  total_cost_estimate_min: number | null
  total_cost_estimate_max: number | null
  provider_url: string | null
  created_at: string
  provider?: Provider
}
