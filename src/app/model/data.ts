import { Playlist } from './spotify/spotifyPlaylist';
import { Track } from './spotify/spotifyTrack';
import { GameScore } from './gameScore';

export class Data {
  difficulty?: number;
  playlist?: Playlist;
  score?: number;
  gameScore?: GameScore[];
  tracks?: Track[];
}
