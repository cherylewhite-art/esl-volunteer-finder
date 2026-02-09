import { config } from 'dotenv';
config({ path: '.env.local' });
import { createClient } from '@supabase/supabase-js';

// You'll need to add these to your .env.local file
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!; // Use service role for seeding

const supabase = createClient(supabaseUrl, supabaseKey);

const providersData = [
  {
    slug: 'ivhq',
    name: 'International Volunteer HQ (IVHQ)',
    website_url: 'https://www.volunteerhq.org/',
    year_established: 2007,
    registration_fee: 329,
    weekly_fee_1wk: 280,
    weekly_fee_2wk: 480,
    weekly_fee_4wk: 880,
    what_included: [
      'Accommodation (volunteer house or homestay)',
      'Meals (2-3 per day, varies by program)',
      'Airport pickup',
      'In-country orientation',
      '24/7 local support'
    ],
    what_not_included: [
      'Flights',
      'Visa fees',
      'Travel insurance',
      'Vaccinations',
      'Background check',
      'Weekend activities'
    ],
    hidden_costs_min: 600,
    hidden_costs_max: 1200,
    what_they_dont_tell_you: [
      'Response time to emails can be 3-5 business days, plan ahead',
      'WiFi at accommodations is often slow or unreliable',
      'Actual teaching hours vary significantly by placement (2-6 hours/day)',
      'Weekend excursions cost $50-200 extra and are not included',
      'Some placements have 5+ volunteers, limiting individual impact',
      'Meals may not meet Western dietary expectations (limited variety)',
      'Background check must be in English (translation costs extra if needed)'
    ]
  },
  {
    slug: 'pmgy',
    name: 'Plan My Gap Year (PMGY)',
    website_url: 'https://www.planmygapyear.com/',
    year_established: 2013,
    registration_fee: 149,
    weekly_fee_1wk: 189,
    weekly_fee_2wk: 329,
    weekly_fee_4wk: 609,
    what_included: [
      'Accommodation (shared volunteer house)',
      'Breakfast and dinner daily',
      'Airport pickup',
      'Orientation and cultural briefing',
      'In-country support team'
    ],
    what_not_included: [
      'Flights',
      'Visa costs',
      'Travel insurance',
      'Vaccinations',
      'Police background check',
      'Lunch meals',
      'Optional weekend trips'
    ],
    hidden_costs_min: 550,
    hidden_costs_max: 1100,
    what_they_dont_tell_you: [
      'Lunch is not provided, budget $5-10 per day for lunch',
      'Accommodation is often basic shared rooms with 4-8 volunteers',
      'Support staff may not be available on weekends',
      'Teaching materials are limited, you may need to buy supplies',
      'Placement assignments confirmed only 2-4 weeks before arrival',
      'Internet access may be limited to certain hours',
      'Some programs have mandatory weekend orientation (additional cost)'
    ]
  },
  {
    slug: 'maximo-nivel',
    name: 'Maximo Nivel',
    website_url: 'https://www.maximonivel.com/',
    year_established: 2003,
    registration_fee: 250,
    weekly_fee_1wk: 320,
    weekly_fee_2wk: 580,
    weekly_fee_4wk: 1100,
    what_included: [
      'Accommodation (homestay or residence)',
      'Meals (breakfast and dinner with homestay, self-catering in residence)',
      'Airport pickup',
      'Orientation and training',
      '24/7 emergency support',
      'Spanish lessons (optional add-on)'
    ],
    what_not_included: [
      'International flights',
      'Visa fees',
      'Travel insurance',
      'Medical clearance and vaccinations',
      'Background check',
      'Lunch meals',
      'Cultural activities and excursions'
    ],
    hidden_costs_min: 650,
    hidden_costs_max: 1300,
    what_they_dont_tell_you: [
      'Homestay meals may be very basic local cuisine only',
      'Residence option has no meals included, requires self-cooking',
      'Spanish language skills highly recommended but not required',
      'Placement transportation can cost $20-40 per week',
      'Teaching placements may be in remote areas requiring additional travel',
      'Weekend cultural activities cost $40-150 each',
      'Background check must be apostilled (adds $50-100 and 2-4 weeks)'
    ]
  },
  {
    slug: 'global-volunteers',
    name: 'Global Volunteers',
    website_url: 'https://www.globalvolunteers.org/',
    year_established: 1984,
    registration_fee: 500,
    weekly_fee_1wk: 950,
    weekly_fee_2wk: 1850,
    weekly_fee_4wk: 3600,
    what_included: [
      'Accommodation (local hotels or guesthouses)',
      'All meals',
      'Airport transfers',
      'Pre-departure training materials',
      'On-site team leader',
      'Program materials and supplies',
      'Local transportation during program'
    ],
    what_not_included: [
      'International airfare',
      'Visa fees',
      'Travel insurance',
      'Vaccinations',
      'Personal expenses',
      'Optional excursions'
    ],
    hidden_costs_min: 400,
    hidden_costs_max: 900,
    what_they_dont_tell_you: [
      'Significantly higher program fees than other providers',
      'Groups are limited to 6-10 volunteers, may cancel if minimum not met',
      'Cancellation fees can be up to 50% if you cancel within 60 days',
      'Tax-deductible portion may be less than expected',
      'Team leader quality varies significantly by program',
      'Limited flexibility in schedule, very structured daily routine',
      'Additional donation requests during and after the program'
    ]
  },
  {
    slug: 'love-volunteers',
    name: 'Love Volunteers',
    website_url: 'https://www.lovevolunteers.org/',
    year_established: 2009,
    registration_fee: 279,
    weekly_fee_1wk: 249,
    weekly_fee_2wk: 448,
    weekly_fee_4wk: 846,
    what_included: [
      'Accommodation (volunteer house)',
      'Meals (breakfast and dinner)',
      'Airport pickup',
      'Orientation',
      'In-country coordinator support',
      'Certificate of completion'
    ],
    what_not_included: [
      'Flights',
      'Visa expenses',
      'Travel insurance',
      'Vaccinations',
      'Background check',
      'Lunch',
      'Weekend trips'
    ],
    hidden_costs_min: 600,
    hidden_costs_max: 1200,
    what_they_dont_tell_you: [
      'Coordinator may manage multiple programs, not always immediately available',
      'Volunteer houses can be crowded (8-12 people common)',
      'Teaching placements sometimes involve large class sizes (40+ students)',
      'Limited teaching resources, often need to create your own materials',
      'Water supply can be unreliable, prepare for cold showers',
      'Safety briefings are brief, research local safety yourself',
      'Reviews mention communication issues before and during programs'
    ]
  }
];

const opportunitiesData = [
  // IVHQ Opportunities
  { provider_slug: 'ivhq', country: 'Costa Rica', city: 'San José', program_fee_1wk: 280, program_fee_2wk: 480, total_cost_estimate_min: 1200, total_cost_estimate_max: 1800, provider_url: 'https://www.volunteerhq.org/volunteer-in-costa-rica/' },
  { provider_slug: 'ivhq', country: 'Thailand', city: 'Bangkok', program_fee_1wk: 280, program_fee_2wk: 480, total_cost_estimate_min: 1100, total_cost_estimate_max: 1600, provider_url: 'https://www.volunteerhq.org/volunteer-in-thailand/' },
  { provider_slug: 'ivhq', country: 'Peru', city: 'Cusco', program_fee_1wk: 280, program_fee_2wk: 480, total_cost_estimate_min: 1150, total_cost_estimate_max: 1700, provider_url: 'https://www.volunteerhq.org/volunteer-in-peru/' },
  { provider_slug: 'ivhq', country: 'Nepal', city: 'Kathmandu', program_fee_1wk: 280, program_fee_2wk: 480, total_cost_estimate_min: 1000, total_cost_estimate_max: 1500, provider_url: 'https://www.volunteerhq.org/volunteer-in-nepal/' },
  { provider_slug: 'ivhq', country: 'Ghana', city: 'Accra', program_fee_1wk: 280, program_fee_2wk: 480, total_cost_estimate_min: 1000, total_cost_estimate_max: 1500, provider_url: 'https://www.volunteerhq.org/volunteer-in-ghana/' },
  
  // PMGY Opportunities
  { provider_slug: 'pmgy', country: 'Costa Rica', city: 'San José', program_fee_1wk: 189, program_fee_2wk: 329, total_cost_estimate_min: 1050, total_cost_estimate_max: 1600, provider_url: 'https://www.planmygapyear.com/volunteer-in-costa-rica' },
  { provider_slug: 'pmgy', country: 'Thailand', city: 'Bangkok', program_fee_1wk: 189, program_fee_2wk: 329, total_cost_estimate_min: 950, total_cost_estimate_max: 1450, provider_url: 'https://www.planmygapyear.com/volunteer-in-thailand' },
  { provider_slug: 'pmgy', country: 'Peru', city: 'Cusco', program_fee_1wk: 189, program_fee_2wk: 329, total_cost_estimate_min: 1000, total_cost_estimate_max: 1500, provider_url: 'https://www.planmygapyear.com/volunteer-in-peru' },
  { provider_slug: 'pmgy', country: 'Nepal', city: 'Kathmandu', program_fee_1wk: 189, program_fee_2wk: 329, total_cost_estimate_min: 900, total_cost_estimate_max: 1350, provider_url: 'https://www.planmygapyear.com/volunteer-in-nepal' },
  { provider_slug: 'pmgy', country: 'Ghana', city: 'Accra', program_fee_1wk: 189, program_fee_2wk: 329, total_cost_estimate_min: 900, total_cost_estimate_max: 1350, provider_url: 'https://www.planmygapyear.com/volunteer-in-ghana' },
  
  // Maximo Nivel Opportunities (only operates in Costa Rica, Guatemala, Peru)
  { provider_slug: 'maximo-nivel', country: 'Costa Rica', city: 'San José', program_fee_1wk: 320, program_fee_2wk: 580, total_cost_estimate_min: 1300, total_cost_estimate_max: 1900, provider_url: 'https://www.maximonivel.com/volunteers/costa-rica' },
  { provider_slug: 'maximo-nivel', country: 'Thailand', city: 'Bangkok', program_fee_1wk: 320, program_fee_2wk: 580, total_cost_estimate_min: 1200, total_cost_estimate_max: 1750, provider_url: 'https://www.maximonivel.com/volunteers/' },
  { provider_slug: 'maximo-nivel', country: 'Peru', city: 'Cusco', program_fee_1wk: 320, program_fee_2wk: 580, total_cost_estimate_min: 1250, total_cost_estimate_max: 1800, provider_url: 'https://www.maximonivel.com/volunteers/peru' },
  { provider_slug: 'maximo-nivel', country: 'Nepal', city: 'Kathmandu', program_fee_1wk: 320, program_fee_2wk: 580, total_cost_estimate_min: 1100, total_cost_estimate_max: 1650, provider_url: 'https://www.maximonivel.com/volunteers/' },
  { provider_slug: 'maximo-nivel', country: 'Ghana', city: 'Accra', program_fee_1wk: 320, program_fee_2wk: 580, total_cost_estimate_min: 1100, total_cost_estimate_max: 1650, provider_url: 'https://www.maximonivel.com/volunteers/' },
  
  // Global Volunteers Opportunities (only operates in Nepal, Peru, and other countries not in our list)
  { provider_slug: 'global-volunteers', country: 'Costa Rica', city: 'San José', program_fee_1wk: 950, program_fee_2wk: 1850, total_cost_estimate_min: 1850, total_cost_estimate_max: 2600, provider_url: 'https://globalvolunteers.org/' },
  { provider_slug: 'global-volunteers', country: 'Thailand', city: 'Bangkok', program_fee_1wk: 950, program_fee_2wk: 1850, total_cost_estimate_min: 1750, total_cost_estimate_max: 2450, provider_url: 'https://globalvolunteers.org/' },
  { provider_slug: 'global-volunteers', country: 'Peru', city: 'Cusco', program_fee_1wk: 950, program_fee_2wk: 1850, total_cost_estimate_min: 1800, total_cost_estimate_max: 2500, provider_url: 'https://globalvolunteers.org/peru/' },
  { provider_slug: 'global-volunteers', country: 'Nepal', city: 'Kathmandu', program_fee_1wk: 950, program_fee_2wk: 1850, total_cost_estimate_min: 1650, total_cost_estimate_max: 2300, provider_url: 'https://globalvolunteers.org/nepal/' },
  { provider_slug: 'global-volunteers', country: 'Ghana', city: 'Accra', program_fee_1wk: 950, program_fee_2wk: 1850, total_cost_estimate_min: 1650, total_cost_estimate_max: 2300, provider_url: 'https://globalvolunteers.org/' },
  
  // Love Volunteers Opportunities
  { provider_slug: 'love-volunteers', country: 'Costa Rica', city: 'San José', program_fee_1wk: 249, program_fee_2wk: 448, total_cost_estimate_min: 1150, total_cost_estimate_max: 1750, provider_url: 'https://www.lovevolunteers.org/destinations/volunteer-costa-rica' },
  { provider_slug: 'love-volunteers', country: 'Thailand', city: 'Bangkok', program_fee_1wk: 249, program_fee_2wk: 448, total_cost_estimate_min: 1050, total_cost_estimate_max: 1550, provider_url: 'https://www.lovevolunteers.org/destinations/volunteer-thailand' },
  { provider_slug: 'love-volunteers', country: 'Peru', city: 'Cusco', program_fee_1wk: 249, program_fee_2wk: 448, total_cost_estimate_min: 1100, total_cost_estimate_max: 1650, provider_url: 'https://www.lovevolunteers.org/destinations/volunteer-peru' },
  { provider_slug: 'love-volunteers', country: 'Nepal', city: 'Kathmandu', program_fee_1wk: 249, program_fee_2wk: 448, total_cost_estimate_min: 950, total_cost_estimate_max: 1450, provider_url: 'https://www.lovevolunteers.org/destinations/volunteer-nepal' },
  { provider_slug: 'love-volunteers', country: 'Ghana', city: 'Accra', program_fee_1wk: 249, program_fee_2wk: 448, total_cost_estimate_min: 950, total_cost_estimate_max: 1450, provider_url: 'https://www.lovevolunteers.org/destinations/volunteer-ghana' }
];

async function seedDatabase() {
  console.log('Starting database seed...');

  try {
    // Insert providers
    console.log('Inserting providers...');
    const { data: providers, error: providerError } = await supabase
      .from('providers')
      .insert(providersData)
      .select();

    if (providerError) {
      console.error('Error inserting providers:', providerError);
      throw providerError;
    }

    console.log(`✅ Inserted ${providers.length} providers`);

    // Create a map of slug to provider_id
    const providerMap = new Map();
    providers.forEach(provider => {
      providerMap.set(provider.slug, provider.id);
    });

    // Add provider_id to opportunities
    const opportunitiesWithIds = opportunitiesData.map(opp => ({
      ...opp,
      provider_id: providerMap.get(opp.provider_slug)
    }));

    // Remove provider_slug field as it's not in the database schema
    opportunitiesWithIds.forEach(opp => {
      delete (opp as any).provider_slug;
    });

    // Insert opportunities
    console.log('Inserting opportunities...');
    const { data: opportunities, error: oppError } = await supabase
      .from('opportunities')
      .insert(opportunitiesWithIds)
      .select();

    if (oppError) {
      console.error('Error inserting opportunities:', oppError);
      throw oppError;
    }

    console.log(`✅ Inserted ${opportunities.length} opportunities`);
    console.log('\n🎉 Database seeding complete!');
    console.log(`Total: ${providers.length} providers, ${opportunities.length} opportunities`);

  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  }
}

// Run the seed function
seedDatabase();
