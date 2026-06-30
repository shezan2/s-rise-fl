export interface Article {
  id: string;
  category: string;
  date: string;
  title: string;
  excerpt: string;
  readTimeMinutes: number;
}

export const articles: Article[] = [
  {
    id: "a1",
    category: "Match Report",
    date: "2026-05-01",
    title: "Metro United Edge Closer to the Title",
    excerpt: "A thrilling late goal ensured Metro United took all three points in a dramatic finish, cementing their position at the top.",
    readTimeMinutes: 4
  },
  {
    id: "a2",
    category: "Transfer News",
    date: "2026-04-28",
    title: "Capital City FC Announce Star Signing for Next Season",
    excerpt: "Capital City FC have bolstered their midfield options ahead of the next campaign by securing a highly-rated prospect.",
    readTimeMinutes: 3
  },
  {
    id: "a3",
    category: "Interview",
    date: "2026-04-25",
    title: "Manager Speaks Out on Controversial Referee Decisions",
    excerpt: "Following a heated weekend, the manager expresses his frustration regarding the officiating standards in recent matches.",
    readTimeMinutes: 5
  },
  {
    id: "a4",
    category: "League Update",
    date: "2026-04-20",
    title: "Title Race Heats Up as Top Three Win",
    excerpt: "The race for the championship is closer than ever as the leaders refuse to drop points, setting up an explosive finale.",
    readTimeMinutes: 4
  },
  {
    id: "a5",
    category: "Player Spotlight",
    date: "2026-04-15",
    title: "The Rise of a Young Prodigy",
    excerpt: "An in-depth look at the academy graduate who is taking the league by storm with a string of incredible performances.",
    readTimeMinutes: 6
  },
  {
    id: "a6",
    category: "Preview",
    date: "2026-04-10",
    title: "Weekend Fixtures: What to Watch For",
    excerpt: "Key matchups that could define the season, including a vital relegation six-pointer at the bottom of the table.",
    readTimeMinutes: 3
  }
];
