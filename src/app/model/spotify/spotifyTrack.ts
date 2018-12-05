import { Image } from './spotifyImage';
import { Artirst } from './spotifyArtist';
import { SpotifyUser } from './spotifyUser';

export class Track {
  addedBy?: SpotifyUser;
  albumId?: string;
  albumImages?: Image[];
  albumName?: string;
  artists?: Artirst[];
  explicit?: boolean;
  id: string;
  isLocal?: boolean;
  isPlayable?: boolean;
  name?: string;
  popularity?: number;
  previewUrl: string;
  trackNumber?: number;
  uri?: string;
}