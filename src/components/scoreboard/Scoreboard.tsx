import "./Scoreboard.css";

type TeamInfo = {
  matchPoints: number;
  points: number;
  logo: string;
  serving?: boolean;
};

type Props = {
  team1: TeamInfo;
  team2: TeamInfo;
};

export default function Scoreboard(props: Props) {
  const { team1, team2 } = props;

  return (
    <div className="scoreboard-container">
      <div className="score-team team-1">
        <div className="score-logo">
          <img alt="logo-team-1" src={team1.logo}></img>
        </div>
        <div className="score-set">{team1.matchPoints}</div>
        <div className="serve-container">
          {team1.serving ? <div className="serve-indicator"></div> : null}
        </div>
        <div className="score-points">
          <span>{team1.points}</span>
        </div>
      </div>
      <div className="score-team team-2">
        <div className="score-logo">
          <img alt="logo-team-2" src={team2.logo}></img>
        </div>
        <div className="score-set">{team2.matchPoints}</div>
        <div className="serve-container">
          {team2.serving ? <div className="serve-indicator"></div> : null}
        </div>
        <div className="score-points">
          <span>{team2.points}</span>
        </div>
      </div>
    </div>
  );
}
