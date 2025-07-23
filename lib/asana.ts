// Asana integration utility
// Usage: await createAsanaTask(formData)
// Requires env vars: ASANA_TOKEN, ASANA_PROJECT_ID

// Hardcoded Asana credentials and section IDs
const ASANA_API_ENDPOINT = 'https://app.asana.com/api/1.0/tasks';
const ASANA_WORKSPACE_ID = '1155777871829';
const ASANA_PROJECT_ID = '1209264819095789';
const ASANA_SECTION_ID_RFP = '1209264819095797';
const ASANA_SECTION_ID_CUSTOM_DEAL = '1209264819095796';
const ASANA_TOKEN = '2/1201732381903046/1210841855726554:85985b32eb20d006c5ead37fd361947f';

// Add Infillion Pre-Sale Intake project and section IDs
const INFILLION_PRE_SALE_PROJECT_ID = '1200261685800140';
const INFILLION_PRE_SALE_SECTION_ID = '1202907817062336';
const ALEX_STEADY_ID = '1201732381907717';

// Map form fields to Asana custom field GIDs (replace with real GIDs from mapping grid)
const customFieldGidMap: Record<string, string> = {
  agencyName: '1210843062887236',
  advertiserName: '1204919402025343',
  dealName: '1210841720958011',
  startDate: '1205446541091415',
  endDate: '1210841720958014',
  dsp: 'DSP_NAME_GID',
  dspSeatId: 'DSP_SEAT_ID_GID',
  preferredSSP: 'PREFERRED_SSP_GID',
  infillionCreative: 'INFILLION_CURATED_CREATIVE_GID',
  customAudience: '1210841720958012',
  audienceTaxonomy: '1210841720958013',
  evergreenSeasonal: 'EVERGREEN_SEASONAL_GID',
  primaryGoal: 'PRIMARY_GOAL_GID',
  primaryGoalBenchmark: 'PRIMARY_GOAL_BENCHMARK_GID',
  secondaryKPI: 'SECONDARY_KPI_GID',
  secondaryKPIBenchmark: 'SECONDARY_KPI_BENCHMARK_GID',
  deviceTypes: '1210841720958015',
  geos: 'GEO_TARGET_GID',
  otherTargeting: 'OTHER_TARGETING_DETAILS_GID',
  publisherInclusion: 'PUBLISHER_INCLUSION_GID',
  publisherExclusion: 'PUBLISHER_EXCLUSION_GID',
  reporting: 'REPORTING_MEASUREMENT_GID',
  dueDate: '445566', // Example GID for Due Date
  // Add more as needed
};

export async function createAsanaTask(form: Record<string, any>, options?: { formType?: 'rfp' | 'customDeal' }) {
  const token = ASANA_TOKEN;
  const projectId = ASANA_PROJECT_ID;
  if (!token || !projectId) throw new Error('Missing ASANA_TOKEN or ASANA_PROJECT_ID');

  // Compose card title
  const title = form.dealName || form.agencyName || form.advertiserName || 'Custom Deal Request';

  // Compose markdown description
  const description = Object.entries(form)
    .map(([k, v]) => `**${k}**: ${Array.isArray(v) ? v.join(', ') : v}`)
    .join('\n');

  // Map to Asana custom fields using GIDs
  const custom_fields: Record<string, any> = {};
  for (const [key, gid] of Object.entries(customFieldGidMap)) {
    if (form[key]) {
      custom_fields[gid] = form[key];
    }
  }

  // Multi-home: memberships for both projects/sections
  const memberships = [
    { project: projectId, section: ASANA_SECTION_ID_RFP },
    { project: INFILLION_PRE_SALE_PROJECT_ID, section: INFILLION_PRE_SALE_SECTION_ID },
  ];

  const body = {
    data: {
      name: title,
      notes: description,
      projects: [projectId, INFILLION_PRE_SALE_PROJECT_ID],
      memberships,
      custom_fields,
      assignee: ALEX_STEADY_ID,
      completed: false, // Ensure task is not auto-completed
      due_on: form.dueDate || undefined,
    },
  };

  let asanaRes;
  try {
    const res = await fetch(ASANA_API_ENDPOINT, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    if (!res.ok) {
      const errorText = await res.text();
      throw new Error('Failed to create Asana task: ' + errorText);
    }
    asanaRes = await res.json();
  } catch (err) {
    // Fallback: try posting with only notes/description if custom fields fail
    const fallbackBody = {
      data: {
        name: title,
        notes: description + '\n\n[Custom fields failed to map, see above for all data.]',
        projects: [projectId, INFILLION_PRE_SALE_PROJECT_ID],
        memberships,
        assignee: ALEX_STEADY_ID,
        completed: false,
        due_on: form.dueDate || undefined,
      },
    };
    const res = await fetch(ASANA_API_ENDPOINT, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(fallbackBody),
    });
    if (!res.ok) {
      const errorText = await res.text();
      throw new Error('Failed to create Asana task (fallback): ' + errorText);
    }
    asanaRes = await res.json();
  }
  return asanaRes;
} 