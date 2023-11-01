import { HistoryEntry } from "../../types";
import "./History.css";

type Props = {
  history: HistoryEntry[];
  teamLogos: { team1: string; team2: string };
};

export function History(props: Props) {
  const { history, teamLogos } = props;
  return (
    <div className="history-container">
      <div className="history-header">Letzten 10 Punkte</div>
      <div className="history-entry">
        <img
          alt="logo-team1"
          className="history-image"
          src={teamLogos.team1}
        ></img>
        <img
          alt="logo-team2"
          className="history-image"
          src={teamLogos.team2}
        ></img>
      </div>
      <div className="history-score-container">
        {history.map((entry, i) => (
          <div key={i} className="history-score-row history-entry">
            <div className="score-container left">
              {entry.team === "team1" ? (
                <div className="history-score">{entry.points}</div>
              ) : null}
            </div>
            <div className="score-container right">
              {entry.team === "team2" ? (
                <div className="history-score">{entry.points}</div>
              ) : null}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
