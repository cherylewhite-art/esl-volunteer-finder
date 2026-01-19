export interface Provider {
  id: string;
  slug: string;
  name: string;
  website_url: string;
  year_established: number;
  registration_fee: number;
  weekly_fee_1wk: number;
  weekly_fee_2wk: number;
  weekly_fee_4wk: number;
  what_included: string[];
  what_not_included: string[];
  hidden_costs_min: number;
  hidden_costs_max: number;
  what_they_dont_tell_you: string[];
  created_at: string;
}

export interface Opportunity {
  id: string;
  provider_id: string;
  country: string;
  city: string;
  program_fee_1wk: number;
  program_fee_2wk: number;
  total_cost_estimate_min: number;
  total_cost_estimate_max: number;
  provider_url: string;
  created_at: string;
  provider?: Provider;
}
