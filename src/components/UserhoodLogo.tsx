interface UserhoodLogoProps {
  className?: string;
  animated?: boolean;
}

export default function UserhoodLogo({ className = "", animated = false }: UserhoodLogoProps) {
  return (
    <svg
      className={`userhood-logo ${animated ? "userhood-logo-animated" : ""} ${className}`}
      fill="none"
      viewBox="0 0 360 69"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
    >
      <g className="userhood-logo-u" fill="currentColor">
        <rect x="0" y="0" width="9.83" height="56.66" />
        <rect x="31.144" y="13.773" width="9.812" height="42.887" />
        <rect className="userhood-logo-u-bridge" x="9.83" y="46.846" width="21.314" height="9.814" />
      </g>

      <path clipRule="evenodd" d="M316.957 22.3862L350.03 22.3862L350.03 43.7003L316.957 43.7003L316.957 53.5119L359.844 53.5305L359.844 12.5742L316.957 12.5742L316.957 22.3862Z" fill="currentColor" fillRule="evenodd" />
      <path clipRule="evenodd" d="M252.775 10.0586C240.391 10.0586 229.927 18.6526 229.927 32.1868C229.927 45.7208 240.385 54.5842 252.775 54.5842C265.166 54.5842 275.717 45.7146 275.717 32.1868C275.717 18.6588 265.157 10.0586 252.775 10.0586ZM252.775 45.4806C245.643 45.4806 239.668 40.1594 239.668 32.1868C239.668 24.2141 245.637 19.0731 252.775 19.0731C259.914 19.0731 265.974 24.3115 265.974 32.1868C265.974 40.0619 259.912 45.4806 252.775 45.4806Z" fill="currentColor" fillRule="evenodd" />
      <path clipRule="evenodd" d="M288.864 10.0586C276.48 10.0586 266.016 18.6526 266.016 32.1868C266.016 45.7208 276.474 54.5842 288.864 54.5842C301.255 54.5842 311.806 45.7146 311.806 32.1868C311.806 18.6588 301.246 10.0586 288.864 10.0586ZM288.864 45.4806C281.732 45.4806 275.757 40.1594 275.757 32.1868C275.757 24.2141 281.726 19.0731 288.864 19.0731C296.003 19.0731 302.062 24.3115 302.062 32.1868C302.062 40.0619 296.001 45.4806 288.864 45.4806Z" fill="currentColor" fillRule="evenodd" />
      <path d="M177.029 11.6094V39.5415H159.884L177.029 55.0594H162.583L147.545 42.0799V55.0594H138.234V11.6094H177.029ZM147.545 30.2308H167.718V20.9201H147.545V30.2308Z" fill="currentColor" />

      <g className="userhood-logo-h" fill="currentColor">
        <rect x="184.927" y="11.609" width="9.31" height="43.45" />
        <rect className="userhood-logo-h-right" x="215.962" y="11.609" width="9.31" height="57.226" />
        <rect className="userhood-logo-h-bridge" x="184.927" y="33.334" width="31.035" height="9.311" />
      </g>

      <path d="M132.028 11.6094V20.9201H105.648V28.679H125.821V37.9897H105.648V45.7487H132.028V55.0594H96.3369V11.6094H132.028Z" fill="currentColor" />
      <path d="M58.9611 34.8862H49.6504L49.6504 11.6094L58.9611 11.6094L58.9611 34.8862Z" fill="currentColor" />
      <path d="M88.4451 55.0594H79.1343V31.7826H88.4451V55.0594Z" fill="currentColor" />
      <path d="M51.2022 20.9201V11.6094H88.4451V20.9201H51.2022Z" fill="currentColor" />
      <path d="M57.4093 34.8862V25.5755H88.4451V34.8862H57.4093Z" fill="currentColor" />
      <path d="M49.6504 55.0594V45.7487H83.7897V55.0594H49.6504Z" fill="currentColor" />
    </svg>
  );
}
