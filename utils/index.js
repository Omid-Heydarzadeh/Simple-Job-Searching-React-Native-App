export const fetchJobs = async () => {
  const res = await fetch('https://jobs-api.arashmidos.workers.dev/');
  if (res.ok) {
    const json = await res.json();
    return json;
  } else return new Error(res.statusText);
};

export const fetchJobBySlug = async (slug) => {
  const res = await fetch('https://jobs-api.arashmidos.workers.dev/');
  if (res.ok) {
    const json = await res.json();
    return json.find(job => job.slug === slug);
  } else return new Error(res.statusText);
};

