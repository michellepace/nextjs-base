// Demo component — not from a UI library. Replace as needed.

type ButtonProps = {
  variant?: "primary" | "secondary";
  href: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
};

export function Button({
  variant = "primary",
  href,
  icon,
  children,
}: ButtonProps) {
  const base =
    "flex h-12 w-full items-center justify-center rounded-full px-5 font-display transition-colors md:w-[170px]";
  const styles = {
    primary: "gap-2 bg-foreground text-background hover:bg-foreground/80",
    secondary: "border border-border hover:bg-muted",
  };

  return (
    <a
      className={`${base} ${styles[variant]}`}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
    >
      {icon}
      {children}
    </a>
  );
}
