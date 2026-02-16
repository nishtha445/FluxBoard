export function Board({ children }: { children: React.ReactNode }) {
    return (
      <div
        style={{
          display: "flex",
          gap: 16,
          padding: 16,
          alignItems: "flex-start",
        }}
      >
        {children}
      </div>
    );
  }
  