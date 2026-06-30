export interface Team {
  id: string;
  name: string;
  city: string;
  founded: number;
  badgeInitials: string;
  accentColor: string;
  stadiumName: string;
  points: number;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDifference: number;
  position: number;
}

export const teams: Team[] = [
  {
    id: "t1",
    name: "Metro United",
    city: "Metropolis",
    founded: 1995,
    badgeInitials: "MU",
    accentColor: "#e11d48",
    stadiumName: "Metro Arena",
    points: 75,
    played: 26,
    won: 24,
    drawn: 3,
    lost: 1,
    goalsFor: 80,
    goalsAgainst: 20,
    goalDifference: 60,
    position: 1
  },
  {
    id: "t2",
    name: "Capital City FC",
    city: "Capital City",
    founded: 1982,
    badgeInitials: "CC",
    accentColor: "#2563eb",
    stadiumName: "The Capital Bowl",
    points: 68,
    played: 26,
    won: 21,
    drawn: 5,
    lost: 2,
    goalsFor: 65,
    goalsAgainst: 25,
    goalDifference: 40,
    position: 2
  },
  {
    id: "t3",
    name: "Harbor Rovers",
    city: "Harbor Bay",
    founded: 2005,
    badgeInitials: "HR",
    accentColor: "#16a34a",
    stadiumName: "Bayview Park",
    points: 62,
    played: 26,
    won: 19,
    drawn: 5,
    lost: 4,
    goalsFor: 55,
    goalsAgainst: 30,
    goalDifference: 25,
    position: 3
  },
  {
    id: "t4",
    name: "Northside Athletic",
    city: "Northside",
    founded: 1992,
    badgeInitials: "NA",
    accentColor: "#d97706",
    stadiumName: "Athletic Grounds",
    points: 50,
    played: 26,
    won: 15,
    drawn: 5,
    lost: 8,
    goalsFor: 45,
    goalsAgainst: 40,
    goalDifference: 5,
    position: 4
  },
  {
    id: "t5",
    name: "Southpointe Wanderers",
    city: "Southpointe",
    founded: 2010,
    badgeInitials: "SW",
    accentColor: "#9333ea",
    stadiumName: "Wanderers Stadium",
    points: 40,
    played: 26,
    won: 11,
    drawn: 7,
    lost: 10,
    goalsFor: 35,
    goalsAgainst: 45,
    goalDifference: -10,
    position: 5
  },
  {
    id: "t6",
    name: "Eastend United",
    city: "Eastend",
    founded: 1988,
    badgeInitials: "EU",
    accentColor: "#0891b2",
    stadiumName: "Eastend Arena",
    points: 35,
    played: 26,
    won: 9,
    drawn: 8,
    lost: 11,
    goalsFor: 30,
    goalsAgainst: 50,
    goalDifference: -20,
    position: 6
  },
  {
    id: "t7",
    name: "Westwood FC",
    city: "Westwood",
    founded: 2001,
    badgeInitials: "WW",
    accentColor: "#475569",
    stadiumName: "Westwood Park",
    points: 25,
    played: 26,
    won: 6,
    drawn: 7,
    lost: 15,
    goalsFor: 25,
    goalsAgainst: 60,
    goalDifference: -35,
    position: 7
  },
  {
    id: "t8",
    name: "Central Sporting",
    city: "Central City",
    founded: 1998,
    badgeInitials: "CS",
    accentColor: "#dc2626",
    stadiumName: "Sporting Arena",
    points: 15,
    played: 26,
    won: 3,
    drawn: 6,
    lost: 19,
    goalsFor: 15,
    goalsAgainst: 80,
    goalDifference: -65,
    position: 8
  }
];
