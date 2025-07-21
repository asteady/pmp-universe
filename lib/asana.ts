// Asana integration utility
// Usage: await createAsanaTask(formData)
// Requires env vars: ASANA_TOKEN, ASANA_PROJECT_ID

export async function createAsanaTask(form: Record<string, any>, options?: { sectionGid?: string }) {
  const token = process.env.ASANA_TOKEN;
  const projectId = process.env.ASANA_PROJECT_ID;
  if (!token || !projectId) throw new Error('Missing ASANA_TOKEN or ASANA_PROJECT_ID');

  // Field mapping (example, update with real Asana custom field GIDs)
  const customFieldMap: Record<string, string> = {
    agencyName: 'Agency Name',
    advertiserName: 'Advertiser Name',
    dealName: 'Deal Name',
    flighting: 'Start Date <> End Date',
    dsp: 'DSP Name',
    dspSeatId: 'DSP Seat ID',
    preferredSSP: 'Preferred SSP(s)',
    infillionCreative: 'Infillion Curated Creative',
    customAudience: 'Custom Audience',
    audienceTaxonomy: 'Infillion Audience Taxonomy',
    evergreenSeasonal: 'Evergreen Seasonal',
    primaryGoal: 'Primary Goal',
    primaryGoalBenchmark: 'Primary Goal Benchmark',
    secondaryKPI: 'Secondary KPI',
    secondaryKPIBenchmark: 'Secondary KPI Benchmark',
    deviceTypes: 'Device Type(s)',
    geos: 'Geo Target',
    otherTargeting: 'Other Targeting Details',
    publisherInclusion: 'Publisher Inclusion',
    publisherExclusion: 'Publisher Exclusion',
    reporting: 'Reporting & Measurement',
    // Add more as needed
  };

  // Compose card title
  const title = form.dealName || form.agencyName || form.advertiserName || 'Custom Deal Request';

  // Compose markdown description
  const description = Object.entries(form)
    .map(([k, v]) => `**${customFieldMap[k] || k}**: ${Array.isArray(v) ? v.join(', ') : v}`)
    .join('\n');

  // Map to Asana custom fields (example, update with real custom field GIDs)
  const custom_fields: Record<string, any> = {};
  for (const [key, asanaField] of Object.entries(customFieldMap)) {
    if (form[key]) {
      custom_fields[asanaField] = form[key];
    }
  }

  // Section/column placement (if provided)
  const memberships = options?.sectionGid ? [{ project: projectId, section: options.sectionGid }] : [{ project: projectId }];

  const body = {
    data: {
      name: title,
      notes: description,
      projects: [projectId],
      memberships,
      custom_fields,
    },
  };

  let asanaRes;
  try {
    const res = await fetch('https://app.asana.com/api/1.0/tasks', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    if (!res.ok) throw new Error('Failed to create Asana task');
    asanaRes = await res.json();
  } catch (err) {
    // Fallback: try posting with only notes/description if custom fields fail
    const fallbackBody = {
      data: {
        name: title,
        notes: description + '\n\n[Custom fields failed to map, see above for all data.]',
        projects: [projectId],
        memberships,
      },
    };
    const res = await fetch('https://app.asana.com/api/1.0/tasks', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(fallbackBody),
    });
    if (!res.ok) throw new Error('Failed to create Asana task (fallback)');
    asanaRes = await res.json();
  }
  return asanaRes;
} 