export interface Artwork {
  id: string;
  title: string;
  artist: string;
  year: number;
  medium: string;
  description: string;
  imageUrl: string;
}

export type ArtMedium = 'Painting' | 'Sculpture' | 'Photography' | 'Digital' | 'Installation';