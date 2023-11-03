import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import GameOverview from "../components/game-overview/GameOverview";
import {
  HistoryEntry,
  Match,
  MatchState,
  Set,
  SetHistory,
  Team,
} from "../types";
import Scoreboard from "../components/scoreboard/Scoreboard";
import { History } from "../components/history/History";

import "./GameView.css";
import useWebSocket from "react-use-websocket";
import { times } from "lodash";

type AllData = {
  id: string;
  match: Match;
  state?: MatchState;
  history: SetHistory[];
  setScores: Set[];
  setPoints: Set;
  team1: Team;
  team2: Team;
  started: boolean;
  finished: boolean;
  score: Set;
  serving: "team1" | "team2";
};

export function GameView() {
  const { gameId } = useParams();
  const [games, setGames] = useState<AllData[] | undefined>(undefined);
  const [shownHistory, setShownHistory] = useState<undefined | HistoryEntry[]>(
    undefined
  );
  const [isHistoryVisible, setIsHistoryVisible] = useState(false);
  const [showGameStats, setShowGameStats] = useState<boolean | undefined>(
    false
  );
  const [showScoreboard, setShowScoreboard] = useState(true);

  useEffect(() => {
    fetch("http://paul-friedemann.de:3000/all")
      .then((res) => res.json())
      .then((data: AllData[]) => {
        setGames(data.map((d) => ({ ...d, setScores: [] })));
      });
  }, []);

  useWebSocket("ws://paul-friedemann.de:3000", {
    onOpen: () => console.log("Opened Socket"),
    onMessage: (message) => {
      const parsedMessage = JSON.parse(message.data);
      switch (parsedMessage.type) {
        case "POINTS":
          handlePointUpdate(parsedMessage.data);
          break;
        case "HISTORY":
          handleHistoryPush(parsedMessage.data);
          break;
        case "STATE":
          handleStateUpdate(parsedMessage.data);
          break;
        case "SET_POINTS":
          handleSetPointsUpdate(parsedMessage.data);
          break;
      }
    },
    onClose: () => {
      console.log("Socket closed");
    },
  });

  const gameNumber =
    gameId && parseInt(gameId) <= (games?.length ?? 0)
      ? parseInt(gameId) - 1
      : (games?.length ?? 0) - 1;
  const shownGame = gameNumber >= 0 ? games[gameNumber] : undefined;

  if (!shownGame) return;

  const testHistory = times(10, (i) => ({
    points: i + 10 + "",
    team: `team${Math.round(Math.random() + 1)}`,
  })) as HistoryEntry[];

  return (
    <div className="game-container">
      <div className={`overview show ${showGameStats ? "show" : ""}`}>
        <GameOverview
          team1={{
            logo: shownGame.team1.logoImage200 ?? "",
            matchPoints: shownGame.setPoints.team1,
            sets: shownGame.setScores
              .map((set) => set.team1)
              .filter((set) => set !== 0),
          }}
          team2={{
            logo: shownGame.team2.logoImage200 ?? "",
            matchPoints: shownGame.setPoints.team2,
            sets: shownGame.setScores
              .map((set) => set.team2)
              .filter((set) => set !== 0),
          }}
        />
      </div>
      <div className={`scoreboard show ${showScoreboard ? "show" : ""}`}>
        <Scoreboard
          team1={{
            matchPoints: shownGame.setPoints.team1,
            points: shownGame.score.team1,
            logo: shownGame.team1.logoImage200,
            serving: shownGame.state?.serving === "team1",
          }}
          team2={{
            matchPoints: shownGame.setPoints.team2,
            points: shownGame.score.team2,
            logo: shownGame.team2.logoImage200,
            serving: shownGame.state?.serving === "team2",
          }}
        />
      </div>
      <div className={`history show ${isHistoryVisible ? "show" : ""}`}>
        <History
          history={shownHistory ?? testHistory}
          teamLogos={{
            team1: shownGame.team1.logoImage200,
            team2: shownGame.team2.logoImage200,
          }}
        />
      </div>
    </div>
  );

  function handlePointUpdate(data: { matchId: string; points: Set }) {
    setGames((games) =>
      games.map((game) =>
        game.id === data.matchId ? { ...game, score: data.points } : game
      )
    );
  }
  function handleHistoryPush(data: {
    history: { points: string; team: "team1" | "team2" }[];
    matchId: string;
  }) {
    setShownHistory(data.history);
    setIsHistoryVisible(true);
    setTimeout(() => {
      setIsHistoryVisible(false);
    }, 10000);
  }
  function handleSetPointsUpdate(data: {
    setPoints: Set;
    matchId: string;
    sets: Set[];
  }) {
    setGames((games) =>
      games.map((game) =>
        game.id === data.matchId
          ? { ...game, setPoints: data.setPoints, setScores: data.sets }
          : game
      )
    );
    setShowGameStats(true);
    setShowScoreboard(false);
    setTimeout(() => {
      setShowGameStats(false);
      setShowScoreboard(true);
    }, 10000);
  }

  function handleStateUpdate(data: { gameState: MatchState; matchId: string }) {
    setGames((games) =>
      games.map((game) =>
        game.id === data.matchId ? { ...game, state: data.gameState } : game
      )
    );
  }
}
