export default function WeddingDashboardLoading() {
  return (
    <div aria-label="Loading wedding workspace" className="animate-pulse">
      <div className="bg-muted h-3 w-32 rounded" />
      <div className="bg-muted mt-4 h-12 w-72 max-w-full rounded" />
      <div className="bg-muted mt-3 h-4 w-56 rounded" />
      <div className="mt-8 grid grid-cols-2 gap-4 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div className="bg-card h-32 rounded-lg border" key={index} />
        ))}
      </div>
      <div className="mt-6 grid gap-6 xl:grid-cols-[1.5fr_0.7fr]">
        <div className="bg-card h-64 rounded-lg border" />
        <div className="bg-card h-64 rounded-lg border" />
      </div>
    </div>
  );
}
