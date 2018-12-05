import { CurrentUser } from './currentUser';

export class UserStats {
    id?: string;
    gameDate?: string;
    difficulty?: number;
    score?: number;
    playlistName?: string;
    playlistPlayed?: string;
    user?: CurrentUser;
}