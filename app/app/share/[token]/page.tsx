type PageProps = {
  params: { token: string };
};

export default async function SharePage({ params }: PageProps) {
  const token = params.token;

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !anonKey) {
    return (
      <main style={{ padding: 24 }}>
        <h1>Missing env vars</h1>
      </main>
    );
  }

  const fnUrl = `${supabaseUrl}/functions/v1/get-shared-project?token=${token}`;

  const res = await fetch(fnUrl, {
    headers: {
      Authorization: `Bearer ${anonKey}`,
      apikey: anonKey,
    },
    cache: "no-store",
  });

  if (res.status === 404) {
    return (
      <main style={{ padding: 24 }}>
        <h1>Invalid or expired link</h1>
      </main>
    );
  }

  if (!res.ok) {
    return (
      <main style={{ padding: 24 }}>
        <h1>Error: {res.status}</h1>
      </main>
    );
  }

  const data = await res.json();

  return (
    <main style={{ padding: 24 }}>
      <h1>Shared project</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </main>
  );
}
