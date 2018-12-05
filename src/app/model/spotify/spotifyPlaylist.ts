import { Image } from './spotifyImage';

export class Playlist {
  href?: string;
  id?: string;
  images?: Image[];
  name?: string;
  publicAccess?: boolean;
  snapshotId?: string;
  uri?: string; 
}