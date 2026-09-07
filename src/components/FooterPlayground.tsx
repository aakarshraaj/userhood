import { useEffect, useRef, useState, type CSSProperties } from "react";
import TeamAvatar from "./TeamAvatar";
import UserhoodLogo from "./UserhoodLogo";

type PlaygroundStyle = CSSProperties & {
  [property: `--footer-${string}`]: string;
};

const team = [
  {
    name: "Kriti", size: "clamp(58px, 6.7vw, 108px)", tilt: "-7deg", danceTilt: "12deg",
    home: ["7%", "24%"], roamOne: ["16%", "7%"], gather: ["39%", "19%"], gatherMobile: ["14%", "18%"], roamTwo: ["71%", "35%"], roamThree: ["29%", "29%"],
  },
  {
    name: "Ashwin", size: "clamp(64px, 7.7vw, 124px)", tilt: "5deg", danceTilt: "-13deg",
    home: ["21%", "5%"], roamOne: ["6%", "33%"], gather: ["43%", "32%"], gatherMobile: ["26%", "40%"], roamTwo: ["58%", "5%"], roamThree: ["83%", "20%"],
  },
  {
    name: "Nishita", size: "clamp(54px, 6.2vw, 100px)", tilt: "-4deg", danceTilt: "10deg",
    home: ["35%", "31%"], roamOne: ["47%", "6%"], gather: ["47%", "19%"], gatherMobile: ["38%", "18%"], roamTwo: ["89%", "30%"], roamThree: ["60%", "37%"],
  },
  {
    name: "Priya", size: "clamp(68px, 8.2vw, 132px)", tilt: "3deg", danceTilt: "-11deg",
    home: ["50%", "11%"], roamOne: ["34%", "38%"], gather: ["51%", "33%"], gatherMobile: ["50%", "40%"], roamTwo: ["12%", "15%"], roamThree: ["45%", "6%"],
  },
  {
    name: "Somesh", size: "clamp(57px, 6.8vw, 110px)", tilt: "-6deg", danceTilt: "14deg",
    home: ["65%", "28%"], roamOne: ["88%", "8%"], gather: ["55%", "19%"], gatherMobile: ["62%", "18%"], roamTwo: ["29%", "34%"], roamThree: ["9%", "22%"],
  },
  {
    name: "Uttkarsh", size: "clamp(65px, 7.8vw, 126px)", tilt: "6deg", danceTilt: "-12deg",
    home: ["79%", "6%"], roamOne: ["68%", "39%"], gather: ["59%", "32%"], gatherMobile: ["74%", "40%"], roamTwo: ["42%", "7%"], roamThree: ["72%", "25%"],
  },
  {
    name: "Priyanka", size: "clamp(56px, 6.5vw, 104px)", tilt: "-3deg", danceTilt: "11deg",
    home: ["93%", "25%"], roamOne: ["82%", "29%"], gather: ["63%", "19%"], gatherMobile: ["86%", "18%"], roamTwo: ["76%", "13%"], roamThree: ["95%", "7%"],
  },
];

export default function FooterPlayground() {
  const [jumping, setJumping] = useState<string | null>(null);
  const jumpTimeoutRef = useRef<number | null>(null);

  useEffect(() => () => {
    if (jumpTimeoutRef.current) window.clearTimeout(jumpTimeoutRef.current);
  }, []);

  const makeJump = (name: string) => {
    if (jumpTimeoutRef.current) window.clearTimeout(jumpTimeoutRef.current);
    setJumping(null);
    window.requestAnimationFrame(() => setJumping(name));
    jumpTimeoutRef.current = window.setTimeout(() => setJumping(null), 760);
  };

  return (
    <section className="footer-playground" aria-label="The animated Userhood team">
      <div className="footer-playground-inner">
        <UserhoodLogo className="footer-playground-logo" />

        <div className="footer-playground-cast">
          {team.map((member) => (
            <button
              key={member.name}
              type="button"
              className={`footer-mascot ${jumping === member.name ? "is-jumping" : ""}`}
              style={{
                "--footer-home-x": member.home[0],
                "--footer-home-y": member.home[1],
                "--footer-roam-one-x": member.roamOne[0],
                "--footer-roam-one-y": member.roamOne[1],
                "--footer-gather-x": member.gather[0],
                "--footer-gather-y": member.gather[1],
                "--footer-gather-mobile-x": member.gatherMobile[0],
                "--footer-gather-mobile-y": member.gatherMobile[1],
                "--footer-roam-two-x": member.roamTwo[0],
                "--footer-roam-two-y": member.roamTwo[1],
                "--footer-roam-three-x": member.roamThree[0],
                "--footer-roam-three-y": member.roamThree[1],
                "--footer-size": member.size,
                "--footer-tilt": member.tilt,
                "--footer-dance-tilt": member.danceTilt,
              } as PlaygroundStyle}
              aria-label={`Make ${member.name} jump`}
              onClick={() => makeJump(member.name)}
            >
              <span className="footer-mascot-body">
                <TeamAvatar name={member.name} transparent followCursor />
              </span>
              <span className="footer-mascot-name" aria-hidden="true">{member.name}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
