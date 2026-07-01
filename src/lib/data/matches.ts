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
    "date": "2026-08-10",
    "time": "14:00",
    "venue": "S-Rise Arena",
    "homeTeamId": "team_1",
    "awayTeamId": "team_2",
    "homeScore": 0,
    "awayScore": 0,
    "status": "upcoming",
    "stage": "Semifinal 1",
    "attendance": 500,
    "referee": "TBD",
    "events": []
  },
  {
    "id": "m2",
    "date": "2026-08-10",
    "time": "16:00",
    "venue": "S-Rise Arena",
    "homeTeamId": "team_3",
    "awayTeamId": "team_4",
    "homeScore": 0,
    "awayScore": 0,
    "status": "upcoming",
    "stage": "Semifinal 2",
    "attendance": 500,
    "referee": "TBD",
    "events": []
  },
  {
    "id": "m3",
    "date": "2026-08-10",
    "time": "19:00",
    "venue": "S-Rise Arena",
    "homeTeamId": "team_1",
    "awayTeamId": "team_3",
    "homeScore": 0,
    "awayScore": 0,
    "status": "upcoming",
    "stage": "Final",
    "attendance": 500,
    "referee": "TBD",
    "events": []
  }
];
