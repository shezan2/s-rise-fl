// Auto-generated from Excel
export interface MatchEvent {
  player: string;
  minute: number;
  teamId: string;
  type: 'goal' | 'yellow' | 'red';
  assistedBy?: string;
}

export interface Match {
  id: string;
  date: string;
  time: string;
  venue: string;
  homeTeamId: string;
  awayTeamId: string;
  homeScore?: number;
  awayScore?: number;
  status: 'upcoming' | 'live' | 'completed';
  stage?: string;
  attendance: number;
  referee: string;
  events: MatchEvent[];
}

export const matches: Match[] = [
  {
    "id": "m1",
    "date": "2026-07-04",
    "time": "13:35",
    "venue": "ActiveSG Sport Village Jurong Town",
    "homeTeamId": "team_1",
    "awayTeamId": "team_3",
    "homeScore": 0,
    "awayScore": 0,
    "status": "upcoming",
    "stage": "SF-1",
    "attendance": 500,
    "referee": "TBD",
    "events": []
  },
  {
    "id": "m2",
    "date": "2026-07-04",
    "time": "14:20",
    "venue": "ActiveSG Sport Village Jurong Town",
    "homeTeamId": "team_4",
    "awayTeamId": "team_2",
    "homeScore": 0,
    "awayScore": 0,
    "status": "upcoming",
    "stage": "SF-2",
    "attendance": 500,
    "referee": "TBD",
    "events": []
  },
  {
    "id": "m3",
    "date": "2026-07-04",
    "time": "15:10",
    "venue": "ActiveSG Sport Village Jurong Town",
    "homeTeamId": "team_1", // TBD
    "awayTeamId": "team_2", // TBD
    "homeScore": 0,
    "awayScore": 0,
    "status": "upcoming",
    "stage": "3rd Place",
    "attendance": 500,
    "referee": "TBD",
    "events": []
  },
  {
    "id": "m4",
    "date": "2026-07-04",
    "time": "16:00",
    "venue": "ActiveSG Sport Village Jurong Town",
    "homeTeamId": "team_3", // TBD
    "awayTeamId": "team_4", // TBD
    "homeScore": 0,
    "awayScore": 0,
    "status": "upcoming",
    "stage": "S-Rise Final",
    "attendance": 500,
    "referee": "TBD",
    "events": []
  }
];
