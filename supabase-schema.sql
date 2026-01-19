-- ESL Volunteer Finder Database Schema

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Providers table
CREATE TABLE providers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  website_url TEXT NOT NULL,
  year_established INTEGER,
  registration_fee INTEGER,
  weekly_fee_1wk INTEGER,
  weekly_fee_2wk INTEGER,
  weekly_fee_4wk INTEGER,
  what_included TEXT[],
  what_not_included TEXT[],
  hidden_costs_min INTEGER,
  hidden_costs_max INTEGER,
  what_they_dont_tell_you TEXT[],
  created_at TIMESTAMP DEFAULT NOW()
);

-- Opportunities table
CREATE TABLE opportunities (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  provider_id UUID REFERENCES providers(id) ON DELETE CASCADE,
  country TEXT NOT NULL,
  city TEXT,
  program_fee_1wk INTEGER,
  program_fee_2wk INTEGER,
  total_cost_estimate_min INTEGER,
  total_cost_estimate_max INTEGER,
  provider_url TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Indexes for better query performance
CREATE INDEX idx_opportunities_country ON opportunities(country);
CREATE INDEX idx_opportunities_provider ON opportunities(provider_id);
CREATE INDEX idx_providers_slug ON providers(slug);
