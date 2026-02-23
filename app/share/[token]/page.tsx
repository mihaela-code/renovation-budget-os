type PageProps = {
  params: { token: string };
};

export default async function SharePage({ params }: PageProps) {
  const token = params?.token;

  return (
    <main style={{ padding: 24 }}>
      <h1>Share debug</h1>
      <p>
        Token from URL: <strong>{String(token)}</strong>
      </p>
    </main>
  );
}
