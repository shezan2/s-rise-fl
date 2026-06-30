export interface Team {
  id: string;
  name: string;
  city: string;
  founded: number;
  badgeInitials: string;
  accentColor: string;
  stadiumName: string;
}

export const teams: Team[] = [
  {
    id: "t1",
    name: "Metro United",
    city: "Metropolis",
    founded: 1995,
    badgeInitials: "MU",
    accentColor: "#e11d48",
    stadiumName: "Metro Arena"
  },
  {
    id: "t2",
    name: "Capital City FC",
    city: "Capital City",
    founded: 1982,
    badgeInitials: "CC",
    accentColor: "#2563eb",
    stadiumName: "The Capital Bowl"
  },
  {
    id: "t3",
    name: "Harbor Rovers",
    city: "Harbor Bay",
    founded: 2005,
    badgeInitials: "HR",
    accentColor: "#16a34a",
    stadiumName: "Bayview Park"
  },
  {
    id: "t4",
    name: "Northside Athletic",
    city: "Northside",
    founded: 1992,
    badgeInitials: "NA",
    accentColor: "#d97706",
    stadiumName: "Athletic Grounds"
  }
];
