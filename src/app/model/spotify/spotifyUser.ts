import { Image } from './spotifyImage';

export class SpotifyUser {
  birthdate?: string;
  country?: string;
  display_name?: string;
  email?: string;
  external_urls?: { key: string; value?: string };
  followers?: { href?: string; total?: string; };
  href: string;
  id: string;
  images: Image[];
  product?: string;
  type?: string;
  uri?: string;
}