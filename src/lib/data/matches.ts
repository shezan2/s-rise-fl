export interface MatchEvent {
  player: string;
  assistedBy: string | null;
  minute: number;
  type: 'goal' | 'yellow' | 'red';
  teamId: string;
}

export interface Match {
  id: string;
  stage: 'Semifinal 1' | 'Semifinal 2' | 'Final';
  date: string;
  time: string;
  venue: string;
  homeTeamId: string;
  awayTeamId: string;
  homeScore: number;
  awayScore: number;
  status: 'upcoming' | 'live' | 'completed';
  liveMinute?: number;
  attendance: number;
  referee: string;
  events: MatchEvent[];
}

export const matches: Match[] = [
  {
    id: "m1",
    stage: "Semifinal 1",
    date: "2026-08-10",
    time: "15:00",
    venue: "Metro Arena",
    homeTeamId: "t1",
    awayTeamId: "t4",
    homeScore: 3,
    awayScore: 1,
    status: "completed",
    attendance: 25430,
    referee: "Michael Oliver",
    events: [
      { player: "Richard Rodriguez", assistedBy: "Michael Jones", minute: 15, type: "goal", teamId: "t1" },
      { player: "Joseph Martinez", assistedBy: "William Brown", minute: 42, type: "goal", teamId: "t1" },
      { player: "Eric Wright", assistedBy: "Jacob Young", minute: 55, type: "goal", teamId: "t4" },
      { player: "Richard Rodriguez", assistedBy: null, minute: 78, type: "goal", teamId: "t1" }
    ]
  },
  {
    id: "m2",
    stage: "Semifinal 2",
    date: "2026-08-10",
    time: "18:00",
    venue: "The Capital Bowl",
    homeTeamId: "t2",
    awayTeamId: "t3",
    homeScore: 2,
    awayScore: 1,
    status: "completed",
    attendance: 31000,
    referee: "Anthony Taylor",
    events: [
      { player: "Steven Taylor", assistedBy: "Matthew Wilson", minute: 22, type: "goal", teamId: "t2" },
      { player: "Ronald Harris", assistedBy: "Kevin Perez", minute: 34, type: "goal", teamId: "t3" },
      { player: "Paul Moore", assistedBy: "Mark Thomas", minute: 89, type: "goal", teamId: "t2" }
    ]
  },
  {
    id: "m3",
    stage: "Final",
    date: "2026-08-10",
    time: "21:00",
    venue: "National Stadium",
    homeTeamId: "t1",
    awayTeamId: "t2",
    homeScore: 0,
    awayScore: 0,
    status: "upcoming",
    attendance: 0,
    referee: "Howard Webb",
    events: []
  }
];
