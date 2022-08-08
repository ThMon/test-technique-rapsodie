export interface LeagueQuery {
  id: number;
  name: string;
}

export interface LeagueState {
  leagues: LeagueQuery[];
  selectedLeague: LeagueQuery | null;
}
