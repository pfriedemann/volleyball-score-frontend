import { times } from "lodash";
import "./GameOverview.css";

type GameTeamInfo = {
  logo: string;
  matchPoints: number | string;
  sets: number[];
};

type Props = {
  team1: GameTeamInfo;
  team2: GameTeamInfo;
};

export default function GameOverview(props: Props) {
  const { team1, team2 } = props;
  return (
    <div className="container">
      <div className="team1 team-row">
        <div className="logo">
          <img alt="logo-team1" src={team1.logo}></img>
        </div>
        <div className="match-score">{team1.matchPoints}</div>
        <div className="set-scores">
          {team1.sets.map((points, index) => (
            <div
              className={`set-points ${
                points > team2.sets[index] ? "winner" : ""
              }`}
              key={index}
            >
              {points}
            </div>
          ))}
          {times(5 - team2.sets.length, (i) => (
            <div key={i} className="set-points hidden">
              0
            </div>
          ))}
        </div>
      </div>
      <div className="set-row">
        <div className="logo placeholder"></div>
        <div className="match-score">Satz</div>
        <div className="set-scores">
          {times(5, (i) => (
            <div className="set-number" key={i}>
              {i + 1}
            </div>
          ))}
        </div>
      </div>
      <div className="team2 team-row">
        <div className="logo">
          <img alt="logo-team2" src={team2.logo}></img>
        </div>
        <div className="match-score">{team2.matchPoints}</div>
        <div className="set-scores">
          {team2.sets.map((points, index) => (
            <div
              className={`set-points ${
                points > team1.sets[index] ? "winner" : ""
              }`}
              key={index}
            >
              {points}
            </div>
          ))}
          {times(5 - team2.sets.length, (i) => (
            <div key={i} className="set-points hidden">
              0
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
