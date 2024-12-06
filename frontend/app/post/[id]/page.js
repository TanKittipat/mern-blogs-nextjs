export default async function Page({ params }) {
  const id = (await params).id;
  return <>{id}</>;
}
