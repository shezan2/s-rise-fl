export interface MatchEvent {
  player: string;
  assistedBy: string | null;
  minute: number;
  type: 'goal' | 'yellow' | 'red';
  teamId: string;
}

export interface Match {
  id: string;
  matchday: number;
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
  // Matchday 1
  {
    id: "m1",
    matchday: 1,
    date: "2025-08-10",
    time: "15:00",
    venue: "Metro Arena",
    homeTeamId: "t1",
    awayTeamId: "t8",
    homeScore: 3,
    awayScore: 0,
    status: "completed",
    attendance: 25430,
    referee: "Michael Oliver",
    events: [
      { player: "Richard Rodriguez", assistedBy: "Michael Jones", minute: 15, type: "goal", teamId: "t1" },
      { player: "Joseph Martinez", assistedBy: "William Brown", minute: 42, type: "goal", teamId: "t1" },
      { player: "Richard Rodriguez", assistedBy: null, minute: 78, type: "goal", teamId: "t1" }
    ]
  },
  {
    id: "m2",
    matchday: 1,
    date: "2025-08-10",
    time: "15:00",
    venue: "The Capital Bowl",
    homeTeamId: "t2",
    awayTeamId: "t7",
    homeScore: 2,
    awayScore: 1,
    status: "completed",
    attendance: 31000,
    referee: "Anthony Taylor",
    events: [
      { player: "Steven Taylor", assistedBy: "Matthew Wilson", minute: 22, type: "goal", teamId: "t2" },
      { player: "Zachary Collins", assistedBy: "Nathan Parker", minute: 55, type: "goal", teamId: "t7" },
      { player: "Paul Moore", assistedBy: "Mark Thomas", minute: 89, type: "goal", teamId: "t2" }
    ]
  },
  {
    id: "m3",
    matchday: 1,
    date: "2025-08-11",
    time: "16:30",
    venue: "Bayview Park",
    homeTeamId: "t3",
    awayTeamId: "t6",
    homeScore: 1,
    awayScore: 1,
    status: "completed",
    attendance: 18500,
    referee: "Mike Dean",
    events: [
      { player: "Ronald Harris", assistedBy: "Kevin Perez", minute: 34, type: "goal", teamId: "t3" },
      { player: "Jerry Gomez", assistedBy: "Patrick Mitchell", minute: 67, type: "goal", teamId: "t6" }
    ]
  },
  {
    id: "m4",
    matchday: 1,
    date: "2025-08-11",
    time: "19:00",
    venue: "Athletic Grounds",
    homeTeamId: "t4",
    awayTeamId: "t5",
    homeScore: 2,
    awayScore: 0,
    status: "completed",
    attendance: 21200,
    referee: "Howard Webb",
    events: [
      { player: "Eric Wright", assistedBy: "Jacob Young", minute: 12, type: "goal", teamId: "t4" },
      { player: "Jonathan Scott", assistedBy: "Gary Allen", minute: 45, type: "goal", teamId: "t4" }
    ]
  },

  // Matchday 25 (Recent Matches)
  {
    id: "m97",
    matchday: 25,
    date: "2026-04-25",
    time: "15:00",
    venue: "Metro Arena",
    homeTeamId: "t1",
    awayTeamId: "t2",
    homeScore: 2,
    awayScore: 2,
    status: "completed",
    attendance: 28500,
    referee: "Mark Clattenburg",
    events: [
      { player: "Richard Rodriguez", assistedBy: "Robert Davis", minute: 10, type: "goal", teamId: "t1" },
      { player: "Steven Taylor", assistedBy: "Matthew Wilson", minute: 35, type: "goal", teamId: "t2" },
      { player: "Steven Taylor", assistedBy: null, minute: 60, type: "goal", teamId: "t2" },
      { player: "Michael Jones", assistedBy: "Joseph Martinez", minute: 85, type: "goal", teamId: "t1" }
    ]
  },
  {
    id: "m98",
    matchday: 25,
    date: "2026-04-25",
    time: "15:00",
    venue: "Bayview Park",
    homeTeamId: "t3",
    awayTeamId: "t4",
    homeScore: 3,
    awayScore: 1,
    status: "completed",
    attendance: 19800,
    referee: "Michael Oliver",
    events: [
      { player: "Ronald Harris", assistedBy: "Brian Thompson", minute: 18, type: "goal", teamId: "t3" },
      { player: "Timothy Clark", assistedBy: "Kevin Perez", minute: 40, type: "goal", teamId: "t3" },
      { player: "Eric Wright", assistedBy: null, minute: 55, type: "goal", teamId: "t4" },
      { player: "Ronald Harris", assistedBy: "Edward White", minute: 75, type: "goal", teamId: "t3" }
    ]
  },

  // Matchday 26 (Current/Live Matches)
  {
    id: "m101",
    matchday: 26,
    date: "2026-05-02",
    time: "15:00",
    venue: "Eastend Arena",
    homeTeamId: "t6",
    awayTeamId: "t1",
    homeScore: 0,
    awayScore: 2,
    status: "live",
    liveMinute: 65,
    attendance: 22000,
    referee: "Anthony Taylor",
    events: [
      { player: "Richard Rodriguez", assistedBy: "Michael Jones", minute: 12, type: "goal", teamId: "t1" },
      { player: "Joseph Martinez", assistedBy: "James Garcia", minute: 44, type: "goal", teamId: "t1" }
    ]
  },
  {
    id: "m102",
    matchday: 26,
    date: "2026-05-02",
    time: "15:00",
    venue: "The Capital Bowl",
    homeTeamId: "t2",
    awayTeamId: "t3",
    homeScore: 1,
    awayScore: 0,
    status: "live",
    liveMinute: 65,
    attendance: 32000,
    referee: "Mike Dean",
    events: [
      { player: "Paul Moore", assistedBy: "Anthony Anderson", minute: 28, type: "goal", teamId: "t2" },
      { player: "Joshua Martin", assistedBy: null, minute: 50, type: "yellow", teamId: "t3" }
    ]
  },
  {
    id: "m103",
    matchday: 26,
    date: "2026-05-03",
    time: "14:00",
    venue: "Wanderers Stadium",
    homeTeamId: "t5",
    awayTeamId: "t8",
    homeScore: 0,
    awayScore: 0,
    status: "upcoming",
    attendance: 0,
    referee: "Howard Webb",
    events: []
  },
  {
    id: "m104",
    matchday: 26,
    date: "2026-05-03",
    time: "16:30",
    venue: "Westwood Park",
    homeTeamId: "t7",
    awayTeamId: "t4",
    homeScore: 0,
    awayScore: 0,
    status: "upcoming",
    attendance: 0,
    referee: "Mark Clattenburg",
    events: []
  }
];
