export type ModerationStatus = 'pending' | 'approved' | 'rejected';

export interface StoryComment {
  id: string;
  storyId: string;
  authorName: string;
  authorEmail: string;
  authorAvatar?: string;
  content: string;
  createdAt: string;
  likesCount: number;
}

export interface TravelStory {
  id: string;
  titleBn: string;
  titleEn: string;
  storyBn: string;
  storyEn: string;
  destinationNameBn: string;
  destinationNameEn: string;
  destinationSpotId?: string; // e.g. 'sajek_valley', 'coxsbazar_beach'
  divisionId: string;
  districtId: string;
  upazilaNameBn?: string;
  upazilaNameEn?: string;
  visitDate: string; // YYYY-MM or display date
  rating: number; // 1 to 5
  whatSawBn: string;
  whatSawEn: string;
  whatLikedMostBn: string;
  whatLikedMostEn: string;
  travelTipsBn: string;
  travelTipsEn: string;
  estimatedCostBn?: string;
  estimatedCostEn?: string;
  photos: string[];
  authorName: string;
  authorEmail: string;
  authorAvatar?: string;
  authorLocation?: string;
  createdAt: string;
  likesCount: number;
  helpfulCount: number;
  commentsCount: number;
  status: ModerationStatus;
  rejectionReason?: string;
  isPublicApproved: boolean;
  reportsCount: number;
  tagsBn?: string[];
  tagsEn?: string[];
}

export interface StorySubmissionPayload {
  title: string;
  story: string;
  destinationName: string;
  destinationSpotId?: string;
  divisionId: string;
  districtId: string;
  upazilaName?: string;
  visitDate: string;
  rating: number;
  whatSaw: string;
  whatLikedMost: string;
  travelTips: string;
  estimatedCost?: string;
  photos: string[];
  grantPublicPermission: boolean;
}

export interface StoryFilterOptions {
  divisionId?: string;
  districtId?: string;
  destinationName?: string;
  minRating?: number;
  sortBy: 'newest' | 'mostLiked' | 'highestRated';
  searchQuery?: string;
}
