export type FullDataPayload = {
  matchDays: MatchDay[];
  matchSeries: Record<string, MatchSeries>;
  matchStates: Record<string, MatchState>;
  matchStats: Record<string, unknown>;
  settings: {
    timeInterval: { numberOfDaysBack: number; numberOfDaysForward: number };
    navLinkItems: unknown[];
    mode: "SIMPLE";
  };
};

export type ReducedPayload = {
  matchDays: MatchDay[];
  matchSeries: MatchSeries; //Sachsenliga
  matchStates: Record<string, MatchState>;
  matchStats: Record<string, unknown>;
  settings: {
    timeInterval: { numberOfDaysBack: number; numberOfDaysForward: number };
    navLinkItems: unknown[];
    mode: "SIMPLE";
  };
};

export type MatchDay = { matches: Match[]; date: string };

export type MatchSeries = {
  class: "League" | "Competition";
  id: string;
  name: string;
  shortname: string;
  orderLevel: number;
  gender: "MALE" | "FEMALE" | "MIXED";
  matches: string[];
  teams: Team[];
  rankings: { fullRankings: Ranking[] };
};

export type Ranking = {
  rankingPosition: number;
  scoreDetails: { matchesPlayed: number; winScore: number };
  team: Team;
};

export type Team = {
  id: string;
  name: string; //full name
  shortName: string;
  clubCode: string;
  letter: string;
  logoImage200: string | null; //image link
};

export type Match = {
  id: string; //Match ID
  teamDescription1: string; //Team 1 Full Name
  team1: string; //Team 1 ID
  teamDescription2: string; // Team 2 Full Name
  team2: string; //Team 2 ID
  date: number; //date as long int
  matchSeries: string; //League ID
  indefinitelyRescheduled: boolean;
  delayPossible: boolean;
};

export type MatchState = {
  matchUuid: string;
  matchSeriesUuid: string;
  finished: boolean;
  finalized: boolean;
  started: boolean;
  ready: boolean;
  teamSides: { leftTeam: "team1" | "team2"; rightTeam: "team1" | "team2" };
  setPoints: { team1: number; team2: number };
  matchSets: [
    { setScore: Set; setNumber: number },
    { setScore: Set; setNumber: number }
  ];
  eventHistory: unknown[];
  teamLineups: {
    team1: {
      playerUuids: string[];
      defaultLiberoUuid: string | null;
    };
    team2: {
      playerUuids: string[];
      defaultLiberoUuid: string | null;
    };
  };
  serving: "team1" | "team2";
  liveStatisticsEnabled: boolean;
};

export type Set = { team1: number; team2: number };
export type SetHistory = Set[][];

export type HistoryEntry = { points: string; team: "team1" | "team2" };
