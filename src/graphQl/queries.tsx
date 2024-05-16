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
      anime: media(type: ANIME, sort: POPULARITY_DESC) {
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
        endDate {
          year
          month
          day
        }
        coverImage {
          medium
          large
        }
        format
        type
        status
        averageScore
      }
    }
  }
`;
const TRENDING_ANIME_QUERY = gql`
  {
    Page(perPage:30){
      anime: media(type: ANIME, sort: TRENDING_DESC,) {
        id
          idMal
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
        type
        format
        status
        averageScore
        countryOfOrigin
      }
    }
  }
`;
const TRENDING_MANGA_QUERY = gql`
  {
    Page(perPage:30){
      anime: media(type: MANGA, sort: TRENDING_DESC,) {
        id
        idMal
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
        format
        status
        type
        averageScore
        countryOfOrigin
      }
    }
  }
`;
const SERIES_PAGE_QUERY = gql`
query ($id: Int!) {
  Media(id: $id) {
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
        genres
        bannerImage
        description
        episodes
        chapters
        type
        status
        countryOfOrigin
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
export { TOP_ANIME_QUERY, TRENDING_ANIME_QUERY, SEARCH_ANIME_QUERY,UPCOMING_NEXT_SEASON_ANIME_QUERY, TRENDING_MANGA_QUERY,SERIES_PAGE_QUERY}; // Export queries
