// Asana integration utility
// Usage: await createAsanaTask(formData)
// Requires env vars: ASANA_TOKEN, ASANA_PROJECT_ID

export async function createAsanaTask(form: Record<string, string>) {
  const token = process.env.ASANA_TOKEN;
  const projectId = process.env.ASANA_PROJECT_ID;
  if (!token || !projectId) throw new Error('Missing ASANA_TOKEN or ASANA_PROJECT_ID');

  // Compose card title
  const title = `${form.agency || 'Agency'} | ${form.brands || 'Brand'} | ${form.requestType || 'PMP Deal'} | RFP Slides`;

  // Compose card description
  const description = Object.entries(form)
    .map(([k, v]) => `${k}: ${v}`)
    .join('\n');

  const body = {
    data: {
      name: title,
      notes: description,
      projects: [projectId],
    },
  };

  const res = await fetch('https://app.asana.com/api/1.0/tasks', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error('Failed to create Asana task');
  return res.json();
} 