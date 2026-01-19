# ESL Volunteer Finder

An independent resource to compare true costs of ESL volunteer programs worldwide.

## Quick Start

### 1. Set Up Supabase (15 minutes)

1. Go to [supabase.com](https://supabase.com) and create a free account
2. Create a new project
3. Go to SQL Editor in your Supabase dashboard
4. Copy the contents of `supabase-schema.sql` from this repo
5. Paste into SQL Editor and run it
6. Go to Settings → API and copy:
   - Project URL
   - Anon/public key

### 2. Deploy to Vercel (10 minutes)

1. Go to [vercel.com](https://vercel.com) and sign up
2. Click "New Project"
3. Import this GitHub repository
4. Add environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL` = your Supabase project URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = your Supabase anon key
5. Click "Deploy"

### 3. Add Data (30 minutes)

In your Supabase dashboard → Table Editor, manually add 5 providers:

**Example Provider: IVHQ**
```
name: IVHQ
slug: ivhq
website_url: https://www.volunteerhq.org/
year_established: 2007
registration_fee: 329
weekly_fee_1wk: 280
weekly_fee_2wk: 480
weekly_fee_4wk: 880
what_included: ["Accommodation", "Meals (2-3/day)", "Airport pickup", "Orientation", "24/7 support"]
what_not_included: ["Flights", "Visa fees", "Insurance", "Vaccinations", "Background check"]
hidden_costs_min: 600
hidden_costs_max: 1200
what_they_dont_tell_you: ["Email response time 3-5 days", "WiFi often unreliable", "Teaching hours vary 2-6/day", "Weekend trips cost $50-200 extra", "Meals may not meet Western expectations"]
```

Then add opportunities for each provider (5 destinations × 5 providers = 25 total):
```
provider_id: [UUID from providers table]
country: Costa Rica
city: San José
program_fee_1wk: 280
program_fee_2wk: 480
total_cost_estimate_min: 1200
total_cost_estimate_max: 1800
provider_url: https://www.volunteerhq.org/volunteer-in-costa-rica/
```

**5 Providers to Add:**
1. IVHQ
2. PMGY (Plan My Gap Year)
3. Maximo Nivel
4. Global Volunteers
5. Love Volunteers

**5 Destinations:**
1. Costa Rica
2. Thailand
3. Peru
4. Nepal
5. Ghana

### 4. Point Your Domain (5 minutes)

In Vercel project settings → Domains:
- Add `eslvolunteerfinder.org`
- Follow DNS instructions
- Wait for SSL (5-10 min)

## That's It!

Your site is live. Now share it and validate if people use it.

## Week 1 Success Metrics

- 50 unique visitors
- 10 provider detail views
- 3 feedback submissions

If you hit these → build more features (web scraping, more providers)
If you don't → analyze what went wrong before building more

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Supabase (PostgreSQL)
- Vercel (Hosting)

## Contact

feedback@eslvolunteerfinder.org
