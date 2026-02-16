export function Column({
    title,
    children,
  }: {
    title: string;
    children: React.ReactNode;
  }) {
    return (
      <div
        style={{
          background: "#ffffff",
          borderRadius: 12,
          padding: 12,
          width: 280,
          minHeight: 300,
          boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
        }}
      >
        <h3
          style={{
            marginTop: 0,
            marginBottom: 12,
            textTransform: "capitalize",
          }}
        >
          {title.replace(/([A-Z])/g, " $1")}
        </h3>
  
        {children}
      </div>
    );
  }
  