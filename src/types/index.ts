export type Language = 'bn' | 'en';

export interface Division {
  id: string;
  nameEn: string;
  nameBn: string;
  headquartersEn: string;
  headquartersBn: string;
  areaKm2: number;
  populationMillions: number;
  districtCount: number;
  upazilaCount: number;
  bannerImage: string;
  descriptionBn: string;
  descriptionEn: string;
  highlightSpotsBn: string[];
  highlightSpotsEn: string[];
  climateBn: string;
  climateEn: string;
}

export interface District {
  id: string;
  divisionId: string;
  nameEn: string;
  nameBn: string;
  headquartersEn: string;
  headquartersBn: string;
  areaKm2: number;
  population: string;
  upazilaCount: number;
  image: string;
  descriptionBn: string;
  descriptionEn: string;
  famousForBn: string[];
  famousForEn: string[];
  popularSpotsBn: string[];
  popularSpotsEn: string[];
}

export interface Upazila {
  id: string;
  districtId: string;
  divisionId: string;
  nameEn: string;
  nameBn: string;
  descriptionBn: string;
  descriptionEn: string;
  unionsCount: number;
  postCode: string;
  famousSpotsBn: string[];
  famousSpotsEn: string[];
}

export interface TouristSpot {
  id: string;
  nameEn: string;
  nameBn: string;
  divisionId: string;
  districtId: string;
  locationEn: string;
  locationBn: string;
  category: 'natural' | 'historical' | 'beach' | 'hill' | 'forest' | 'religious' | 'island' | 'lake' | 'mountain';
  image: string;
  rating: number;
  reviewsCount: number;
  entryFeeEn: string;
  entryFeeBn: string;
  bestTimeEn: string;
  bestTimeBn: string;
  howToReachEn: string;
  howToReachBn: string;
  descriptionBn: string;
  descriptionEn: string;
  highlightsBn: string[];
  highlightsEn: string[];
}

export interface Article {
  id: string;
  slug: string;
  titleBn: string;
  titleEn: string;
  subtitleBn: string;
  subtitleEn: string;
  categoryBn: string;
  categoryEn: string;
  authorBn: string;
  authorEn: string;
  publishDate: string;
  views: number;
  readingTimeMinutes: number;
  coverImage: string;
  contentBn: string[];
  contentEn: string[];
  relatedSpotId?: string;
  tagsBn: string[];
  tagsEn: string[];
}

export interface CategoryItem {
  id: string;
  nameBn: string;
  nameEn: string;
  descriptionBn: string;
  descriptionEn: string;
  icon: string;
  countBn: string;
  countEn: string;
  image: string;
  link: string;
}

export interface Personality {
  id: string;
  nameBn: string;
  nameEn: string;
  lifespan: string;
  roleBn: string;
  roleEn: string;
  districtId: string;
  image: string;
  bioBn: string;
  bioEn: string;
  achievementsBn: string[];
  achievementsEn: string[];
}

export interface CulturalItem {
  id: string;
  nameBn: string;
  nameEn: string;
  category: 'festival' | 'food' | 'craft' | 'music' | 'tradition';
  regionBn: string;
  regionEn: string;
  image: string;
  descriptionBn: string;
  descriptionEn: string;
  historyBn: string;
  historyEn: string;
}
