import { gql } from '@apollo/client';

interface Title {
  romaji: string;
  english: string;
  native: string;
}

interface StartDate {
  year: number;
  month: number;
  day: number;
}

interface CoverImage {
  medium: string;
  large: string;
}

interface Anime {
  id: string;
  title: Title;
  bannerImage?: string;
  description: string;
  genres: string[];
  episodes: number;
  startDate: StartDate;
  coverImage: CoverImage;
  status: string;
  averageScore: number;
}

interface Media {
  id: string;
  title: Title;
  coverImage: CoverImage;
  startDate: StartDate;
  episodes: number;
  chapters?: number;
  type: string;
  status: string;
}

const TOP_ANIME_QUERY = gql`
  {
    Page {
      anime: media(type: MANGA, sort: POPULARITY_DESC) {
        id
        title {
          romaji
          english
          native
        }
        bannerImage
        description
        genres
        episodes
        startDate {
          year
          month
          day
        }
        coverImage {
          medium
          large
        }
        status
        averageScore
      }
    }
  }
`;

const TRENDING_ANIME_QUERY = gql`
  {
    Page {
      anime: media(type: ANIME, sort: TRENDING_DESC) {
        id
        title {
          romaji
          english
          native
        }
        description
        genres
        episodes
        startDate {
          year
          month
          day
        }
        coverImage {
          large
          medium
        }
        status
        averageScore
        countryOfOrigin
      }
    }
  }
`;
const SEARCH_ANIME_QUERY = gql`
  query SearchAnime($searchValue: String!) {
    Page {
      media(search: $searchValue, type: ANIME) {
        id
        title {
          romaji
          english
          native
        }
        coverImage {
          large
          medium
        }
        startDate {
          year
          month
          day
        }
        episodes
        chapters
        type
        status
      }
    }
  }
`;
const UPCOMING_NEXT_SEASON_ANIME_QUERY = gql`
       {
    Page {
      Media (startDate: $startDate, endDate: $endDate, type: ANIME) {
        id
        title {
          romaji
          english
          native
        }
        description
        genres
        episodes
        startDate {
          year
          month
          day
        }
        coverImage {
          large
          medium
        }
        status
        averageScore
      }
    }
  }
`;
export type { Anime, Media }; // Export types/interfaces
export { TOP_ANIME_QUERY, TRENDING_ANIME_QUERY, SEARCH_ANIME_QUERY,UPCOMING_NEXT_SEASON_ANIME_QUERY }; // Export queries