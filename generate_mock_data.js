const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'lib', 'data');
if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
}

// 1. Teams
const teams = [
    { id: 't1', name: 'Metro United', city: 'Metropolis', founded: 1995, badgeInitials: 'MU', accentColor: '#e11d48', stadiumName: 'Metro Arena' },
    { id: 't2', name: 'Capital City FC', city: 'Capital City', founded: 1982, badgeInitials: 'CC', accentColor: '#2563eb', stadiumName: 'The Capital Bowl' },
    { id: 't3', name: 'Harbor Rovers', city: 'Harbor Bay', founded: 2005, badgeInitials: 'HR', accentColor: '#16a34a', stadiumName: 'Bayview Park' },
    { id: 't4', name: 'Northside Athletic', city: 'Northside', founded: 1992, badgeInitials: 'NA', accentColor: '#d97706', stadiumName: 'Athletic Grounds' },
    { id: 't5', name: 'Southpointe Wanderers', city: 'Southpointe', founded: 2010, badgeInitials: 'SW', accentColor: '#9333ea', stadiumName: 'Wanderers Stadium' },
    { id: 't6', name: 'Eastend United', city: 'Eastend', founded: 1988, badgeInitials: 'EU', accentColor: '#0891b2', stadiumName: 'Eastend Arena' },
    { id: 't7', name: 'Westwood FC', city: 'Westwood', founded: 2001, badgeInitials: 'WW', accentColor: '#475569', stadiumName: 'Westwood Park' },
    { id: 't8', name: 'Central Sporting', city: 'Central City', founded: 1998, badgeInitials: 'CS', accentColor: '#dc2626', stadiumName: 'Sporting Arena' }
];

teams.forEach(t => {
    t.points = 0; t.played = 0; t.won = 0; t.drawn = 0; t.lost = 0;
    t.goalsFor = 0; t.goalsAgainst = 0; t.goalDifference = 0; t.position = 0;
});

// 2. Players
const positions = ['GK', 'DF', 'DF', 'MF', 'MF', 'MF', 'FW', 'FW'];
const nationalities = ['USA', 'ENG', 'ESP', 'GER', 'FRA', 'BRA', 'ARG', 'ITA', 'NED', 'POR'];
const firstNames = ['James', 'John', 'Robert', 'Michael', 'William', 'David', 'Richard', 'Joseph', 'Thomas', 'Charles', 'Daniel', 'Matthew', 'Anthony', 'Mark', 'Steven', 'Paul', 'Andrew', 'Joshua'];
const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez', 'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson', 'Thomas', 'Taylor', 'Moore'];

let players = [];
let playerId = 1;
teams.forEach(team => {
    positions.forEach(pos => {
        const first = firstNames[Math.floor(Math.random() * firstNames.length)];
        const last = lastNames[Math.floor(Math.random() * lastNames.length)];
        const nat = nationalities[Math.floor(Math.random() * nationalities.length)];
        players.push({
            id: `p${playerId++}`,
            name: `${first} ${last}`,
            position: pos,
            nationality: nat,
            teamId: team.id,
            apps: 0,
            goals: 0,
            assists: 0,
            shots: Math.floor(Math.random() * 20),
            keyPasses: Math.floor(Math.random() * 15),
            seasonRating: parseFloat((6.0 + Math.random() * 3.0).toFixed(1))
        });
    });
});

// 3. Matches
let matches = [];
let matchId = 1;
let matchdays = 14;
let date = new Date('2025-08-10T15:00:00Z');
const referees = ['Michael Oliver', 'Anthony Taylor', 'Mike Dean', 'Howard Webb', 'Mark Clattenburg'];
const rr = [
    [[1,8], [2,7], [3,6], [4,5]],
    [[1,7], [8,6], [2,5], [3,4]],
    [[1,6], [7,5], [8,4], [2,3]],
    [[1,5], [6,4], [7,3], [8,2]],
    [[1,4], [5,3], [6,2], [7,8]],
    [[1,3], [4,2], [5,8], [6,7]],
    [[1,2], [3,8], [4,7], [5,6]]
];

for (let md = 1; md <= matchdays; md++) {
    let currentRR = rr[(md - 1) % 7];
    let isReverse = md > 7;

    currentRR.forEach(pair => {
        let homeIndex = pair[0] - 1;
        let awayIndex = pair[1] - 1;
        if (isReverse) { let temp = homeIndex; homeIndex = awayIndex; awayIndex = temp; }

        let homeTeam = teams[homeIndex];
        let awayTeam = teams[awayIndex];

        let homeScore = Math.floor(Math.random() * 4);
        let awayScore = Math.floor(Math.random() * 3);
        
        homeTeam.played++; awayTeam.played++;
        homeTeam.goalsFor += homeScore; homeTeam.goalsAgainst += awayScore;
        awayTeam.goalsFor += awayScore; awayTeam.goalsAgainst += homeScore;

        if (homeScore > awayScore) { homeTeam.won++; homeTeam.points += 3; awayTeam.lost++; }
        else if (awayScore > homeScore) { awayTeam.won++; awayTeam.points += 3; homeTeam.lost++; }
        else { homeTeam.drawn++; awayTeam.drawn++; homeTeam.points += 1; awayTeam.points += 1; }

        homeTeam.goalDifference = homeTeam.goalsFor - homeTeam.goalsAgainst;
        awayTeam.goalDifference = awayTeam.goalsFor - awayTeam.goalsAgainst;

        let events = [];
        let homePlayers = players.filter(p => p.teamId === homeTeam.id && p.position !== 'GK');
        let awayPlayers = players.filter(p => p.teamId === awayTeam.id && p.position !== 'GK');

        for (let i = 0; i < homeScore; i++) {
            let scorer = homePlayers[Math.floor(Math.random() * homePlayers.length)];
            scorer.goals++;
            let assister = homePlayers[Math.floor(Math.random() * homePlayers.length)];
            if (scorer.id !== assister.id) assister.assists++;
            events.push({ player: scorer.name, assistedBy: scorer.id !== assister.id ? assister.name : null, minute: Math.floor(Math.random() * 90) + 1, type: 'goal', teamId: homeTeam.id });
        }

        for (let i = 0; i < awayScore; i++) {
            let scorer = awayPlayers[Math.floor(Math.random() * awayPlayers.length)];
            scorer.goals++;
            let assister = awayPlayers[Math.floor(Math.random() * awayPlayers.length)];
            if (scorer.id !== assister.id) assister.assists++;
            events.push({ player: scorer.name, assistedBy: scorer.id !== assister.id ? assister.name : null, minute: Math.floor(Math.random() * 90) + 1, type: 'goal', teamId: awayTeam.id });
        }
        
        events.sort((a, b) => a.minute - b.minute);
        homePlayers.forEach(p => p.apps++);
        awayPlayers.forEach(p => p.apps++);

        matches.push({
            id: `m${matchId++}`,
            matchday: md,
            date: date.toISOString().split('T')[0],
            time: '15:00',
            venue: homeTeam.stadiumName,
            homeTeamId: homeTeam.id,
            awayTeamId: awayTeam.id,
            homeScore,
            awayScore,
            status: 'completed',
            attendance: 15000 + Math.floor(Math.random() * 30000),
            referee: referees[Math.floor(Math.random() * referees.length)],
            events
        });
    });
    date.setDate(date.getDate() + 7);
}

teams.sort((a, b) => {
    if (b.points !== a.points) return b.points - a.points;
    if (b.goalDifference !== a.goalDifference) return b.goalDifference - a.goalDifference;
    return b.goalsFor - a.goalsFor;
});

teams.forEach((t, i) => t.position = i + 1);

const articles = [
    { id: 'a1', category: 'Match Report', date: '2026-05-12', title: 'Metro United Secures Crucial Victory', excerpt: 'A thrilling late goal ensured Metro United took all three points in a dramatic finish.', readTimeMinutes: 4 },
    { id: 'a2', category: 'Transfer News', date: '2026-05-10', title: 'Capital City FC Announce Star Signing', excerpt: 'Capital City FC have bolstered their midfield options ahead of the crucial run-in.', readTimeMinutes: 3 },
    { id: 'a3', category: 'Interview', date: '2026-05-08', title: 'Manager speaks out on referee decisions', excerpt: 'Following a controversial weekend, the manager expresses his frustration.', readTimeMinutes: 5 },
    { id: 'a4', category: 'League Update', date: '2026-05-05', title: 'Title Race Heats Up as Top Three Win', excerpt: 'The race for the championship is closer than ever as the leaders refuse to drop points.', readTimeMinutes: 4 },
    { id: 'a5', category: 'Player Spotlight', date: '2026-05-02', title: 'The Rise of a Young Prodigy', excerpt: 'An in-depth look at the academy graduate who is taking the league by storm.', readTimeMinutes: 6 },
    { id: 'a6', category: 'Preview', date: '2026-04-30', title: 'Weekend Fixtures: What to Watch For', excerpt: 'Key matchups that could define the season, including a vital relegation six-pointer.', readTimeMinutes: 3 }
];

const toTS = (name, typeName, data, typeDef) => `${typeDef}\n\nexport const ${name}: ${typeName}[] = ${JSON.stringify(data, null, 2)};\n`;

const teamTypeDef = `export interface Team { id: string; name: string; city: string; founded: number; badgeInitials: string; accentColor: string; stadiumName: string; points: number; played: number; won: number; drawn: number; lost: number; goalsFor: number; goalsAgainst: number; goalDifference: number; position: number; }`;
const playerTypeDef = `export interface Player { id: string; name: string; position: string; nationality: string; teamId: string; apps: number; goals: number; assists: number; shots: number; keyPasses: number; seasonRating: number; }`;
const matchTypeDef = `export interface MatchEvent { player: string; assistedBy: string | null; minute: number; type: 'goal' | 'yellow' | 'red'; teamId: string; }\n\nexport interface Match { id: string; matchday: number; date: string; time: string; venue: string; homeTeamId: string; awayTeamId: string; homeScore: number; awayScore: number; status: 'upcoming' | 'live' | 'completed'; liveMinute?: number; attendance: number; referee: string; events: MatchEvent[]; }`;
const articleTypeDef = `export interface Article { id: string; category: string; date: string; title: string; excerpt: string; readTimeMinutes: number; }`;

fs.writeFileSync(path.join(dir, 'teams.ts'), toTS('teams', 'Team', teams, teamTypeDef));
fs.writeFileSync(path.join(dir, 'players.ts'), toTS('players', 'Player', players, playerTypeDef));
fs.writeFileSync(path.join(dir, 'matches.ts'), toTS('matches', 'Match', matches, matchTypeDef));
fs.writeFileSync(path.join(dir, 'articles.ts'), toTS('articles', 'Article', articles, articleTypeDef));

console.log('Successfully generated all mock data!');
