interface UserhoodMonogramProps {
  className?: string;
}

export default function UserhoodMonogram({ className = "" }: UserhoodMonogramProps) {
  return (
    <svg
      className={`userhood-monogram ${className}`}
      viewBox="0 0 40 40"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
    >
      <rect x="4" y="4" width="6" height="32" fill="currentColor" />
      <rect x="30" y="4" width="6" height="32" fill="currentColor" />
      <rect className="userhood-monogram-bridge" x="10" y="30" width="20" height="6" fill="currentColor" />
    </svg>
  );
}
