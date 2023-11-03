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

  const team1Actual = { ...team1, matchPoints: 3, sets: [25, 25, 20, 25] };
  const team2Actual = { ...team2, matchPoints: 1, sets: [22, 20, 25, 15] };

  return (
    <div className="container">
      <div className="team1 team-row">
        <div className="logo">
          <img alt="logo-team1" src={team1.logo}></img>
        </div>
        <div className="match-score">{team1Actual.matchPoints}</div>
        <div className="set-scores">
          {team1Actual.sets.map((points, index) => (
            <div
              className={`set-points ${
                points > team2Actual.sets[index] ? "winner" : ""
              }`}
              key={index}
            >
              {points}
            </div>
          ))}
          {times(5 - team2Actual.sets.length, (i) => (
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
        <div className="match-score">{team2Actual.matchPoints}</div>
        <div className="set-scores">
          {team2Actual.sets.map((points, index) => (
            <div
              className={`set-points ${
                points > team1Actual.sets[index] ? "winner" : ""
              }`}
              key={index}
            >
              {points}
            </div>
          ))}
          {times(5 - team2Actual.sets.length, (i) => (
            <div key={i} className="set-points hidden">
              0
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
