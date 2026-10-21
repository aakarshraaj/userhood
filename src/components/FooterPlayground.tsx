import type { CSSProperties } from "react";
import TeamAvatar from "./TeamAvatar";
import UserhoodLogo from "./UserhoodLogo";

type PlaygroundStyle = CSSProperties & {
  [property: `--footer-${string}`]: string;
};

const team = [
  {
    name: "Kriti", size: "clamp(58px, 6.7vw, 108px)", tilt: "-7deg", home: ["7%", "24%"],
  },
  {
    name: "Ashwin", size: "clamp(64px, 7.7vw, 124px)", tilt: "5deg", home: ["21%", "5%"],
  },
  {
    name: "Nishita", size: "clamp(54px, 6.2vw, 100px)", tilt: "-4deg", home: ["35%", "31%"],
  },
  {
    name: "Priya", size: "clamp(68px, 8.2vw, 132px)", tilt: "3deg", home: ["50%", "11%"],
  },
  {
    name: "Somesh", size: "clamp(57px, 6.8vw, 110px)", tilt: "-6deg", home: ["65%", "28%"],
  },
  {
    name: "Uttkarsh", size: "clamp(65px, 7.8vw, 126px)", tilt: "6deg", home: ["79%", "6%"],
  },
  {
    name: "Priyanka", size: "clamp(56px, 6.5vw, 104px)", tilt: "-3deg", home: ["93%", "25%"],
  },
];

export default function FooterPlayground() {
  return (
    <section className="footer-playground" aria-label="The Userhood team">
      <div className="footer-playground-inner">
        <UserhoodLogo className="footer-playground-logo" />

        <div className="footer-playground-cast">
          {team.map((member) => (
            <div
              key={member.name}
              className="footer-mascot"
              style={{
                "--footer-home-x": member.home[0],
                "--footer-home-y": member.home[1],
                "--footer-size": member.size,
                "--footer-tilt": member.tilt,
              } as PlaygroundStyle}
            >
              <span className="footer-mascot-body">
                <TeamAvatar name={member.name} transparent followCursor />
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
