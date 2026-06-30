export interface Player {
  id: string;
  name: string;
  position: string;
  nationality: string;
  teamId: string;
  apps: number;
  goals: number;
  assists: number;
  shots: number;
  keyPasses: number;
  seasonRating: number;
}

export const players: Player[] = [
  // Metro United (t1)
  { id: "p1", name: "John Smith", position: "GK", nationality: "USA", teamId: "t1", apps: 26, goals: 0, assists: 0, shots: 0, keyPasses: 1, seasonRating: 7.2 },
  { id: "p2", name: "David Miller", position: "DF", nationality: "ENG", teamId: "t1", apps: 25, goals: 2, assists: 3, shots: 10, keyPasses: 15, seasonRating: 7.5 },
  { id: "p3", name: "James Garcia", position: "DF", nationality: "ESP", teamId: "t1", apps: 24, goals: 1, assists: 1, shots: 5, keyPasses: 10, seasonRating: 7.1 },
  { id: "p4", name: "Michael Jones", position: "MF", nationality: "USA", teamId: "t1", apps: 26, goals: 8, assists: 12, shots: 40, keyPasses: 55, seasonRating: 8.0 },
  { id: "p5", name: "William Brown", position: "MF", nationality: "GER", teamId: "t1", apps: 20, goals: 5, assists: 6, shots: 25, keyPasses: 30, seasonRating: 7.4 },
  { id: "p6", name: "Robert Davis", position: "MF", nationality: "FRA", teamId: "t1", apps: 22, goals: 4, assists: 8, shots: 20, keyPasses: 45, seasonRating: 7.6 },
  { id: "p7", name: "Richard Rodriguez", position: "FW", nationality: "BRA", teamId: "t1", apps: 26, goals: 25, assists: 5, shots: 85, keyPasses: 20, seasonRating: 8.5 },
  { id: "p8", name: "Joseph Martinez", position: "FW", nationality: "ARG", teamId: "t1", apps: 26, goals: 15, assists: 10, shots: 60, keyPasses: 35, seasonRating: 8.2 },

  // Capital City FC (t2)
  { id: "p9", name: "Thomas Hernandez", position: "GK", nationality: "MEX", teamId: "t2", apps: 26, goals: 0, assists: 1, shots: 0, keyPasses: 2, seasonRating: 7.3 },
  { id: "p10", name: "Charles Lopez", position: "DF", nationality: "ESP", teamId: "t2", apps: 26, goals: 3, assists: 4, shots: 12, keyPasses: 18, seasonRating: 7.6 },
  { id: "p11", name: "Daniel Gonzalez", position: "DF", nationality: "USA", teamId: "t2", apps: 25, goals: 0, assists: 2, shots: 4, keyPasses: 12, seasonRating: 7.0 },
  { id: "p12", name: "Matthew Wilson", position: "MF", nationality: "ENG", teamId: "t2", apps: 26, goals: 10, assists: 8, shots: 45, keyPasses: 40, seasonRating: 7.9 },
  { id: "p13", name: "Anthony Anderson", position: "MF", nationality: "USA", teamId: "t2", apps: 24, goals: 6, assists: 5, shots: 30, keyPasses: 25, seasonRating: 7.5 },
  { id: "p14", name: "Mark Thomas", position: "MF", nationality: "ITA", teamId: "t2", apps: 23, goals: 2, assists: 9, shots: 15, keyPasses: 50, seasonRating: 7.4 },
  { id: "p15", name: "Steven Taylor", position: "FW", nationality: "ENG", teamId: "t2", apps: 26, goals: 20, assists: 6, shots: 75, keyPasses: 22, seasonRating: 8.3 },
  { id: "p16", name: "Paul Moore", position: "FW", nationality: "USA", teamId: "t2", apps: 20, goals: 10, assists: 4, shots: 40, keyPasses: 15, seasonRating: 7.7 },

  // Harbor Rovers (t3)
  { id: "p17", name: "Andrew Jackson", position: "GK", nationality: "USA", teamId: "t3", apps: 26, goals: 0, assists: 0, shots: 0, keyPasses: 0, seasonRating: 7.0 },
  { id: "p18", name: "Joshua Martin", position: "DF", nationality: "CAN", teamId: "t3", apps: 26, goals: 1, assists: 5, shots: 8, keyPasses: 20, seasonRating: 7.3 },
  { id: "p19", name: "Kenneth Lee", position: "DF", nationality: "KOR", teamId: "t3", apps: 24, goals: 2, assists: 1, shots: 10, keyPasses: 10, seasonRating: 7.2 },
  { id: "p20", name: "Kevin Perez", position: "MF", nationality: "MEX", teamId: "t3", apps: 26, goals: 7, assists: 10, shots: 35, keyPasses: 45, seasonRating: 7.8 },
  { id: "p21", name: "Brian Thompson", position: "MF", nationality: "USA", teamId: "t3", apps: 25, goals: 4, assists: 6, shots: 25, keyPasses: 30, seasonRating: 7.4 },
  { id: "p22", name: "Edward White", position: "MF", nationality: "ENG", teamId: "t3", apps: 22, goals: 3, assists: 4, shots: 20, keyPasses: 25, seasonRating: 7.1 },
  { id: "p23", name: "Ronald Harris", position: "FW", nationality: "USA", teamId: "t3", apps: 26, goals: 18, assists: 7, shots: 65, keyPasses: 28, seasonRating: 8.1 },
  { id: "p24", name: "Timothy Clark", position: "FW", nationality: "SCO", teamId: "t3", apps: 23, goals: 12, assists: 3, shots: 45, keyPasses: 18, seasonRating: 7.6 },

  // Northside Athletic (t4)
  { id: "p25", name: "Jason Lewis", position: "GK", nationality: "WAL", teamId: "t4", apps: 26, goals: 0, assists: 0, shots: 0, keyPasses: 1, seasonRating: 6.9 },
  { id: "p26", name: "Jeffrey Robinson", position: "DF", nationality: "USA", teamId: "t4", apps: 26, goals: 4, assists: 2, shots: 15, keyPasses: 14, seasonRating: 7.4 },
  { id: "p27", name: "Ryan Walker", position: "DF", nationality: "ENG", teamId: "t4", apps: 25, goals: 1, assists: 3, shots: 6, keyPasses: 16, seasonRating: 7.1 },
  { id: "p28", name: "Jacob Young", position: "MF", nationality: "USA", teamId: "t4", apps: 26, goals: 5, assists: 8, shots: 30, keyPasses: 35, seasonRating: 7.5 },
  { id: "p29", name: "Gary Allen", position: "MF", nationality: "IRL", teamId: "t4", apps: 24, goals: 3, assists: 5, shots: 20, keyPasses: 25, seasonRating: 7.2 },
  { id: "p30", name: "Nicholas King", position: "MF", nationality: "USA", teamId: "t4", apps: 21, goals: 2, assists: 4, shots: 15, keyPasses: 20, seasonRating: 7.0 },
  { id: "p31", name: "Eric Wright", position: "FW", nationality: "ENG", teamId: "t4", apps: 26, goals: 14, assists: 5, shots: 55, keyPasses: 20, seasonRating: 7.8 },
  { id: "p32", name: "Jonathan Scott", position: "FW", nationality: "USA", teamId: "t4", apps: 25, goals: 9, assists: 6, shots: 40, keyPasses: 22, seasonRating: 7.4 }
];
