import { gql } from "@apollo/client";

const GENRE = gql`
  query {
    GenreCollection
  }
`;
const FORMAT = gql`
  query {
      __type(name: "MediaFormat") {
        enumValues {
          name
        }
      }
  }
`;
const SEASON = gql`
  query {
    __type(name: "MediaSeason") {
      enumValues {
        name
      }
    }
  }
`;
const STATUS = gql`
  query {
    __type(name: "MediaStatus") {
      enumValues {
        name
      }
    }
  }
`;

const SORT = gql`
  query {
    __type(name: "MediaSort") {
      enumValues {
        name
      }
    }
  }
`;
const TYPE = gql`
  query {
    __type(name: "MediaType") {
      enumValues {
        name
      }
    }
  }
`;
export { GENRE, FORMAT, SEASON, STATUS, SORT,TYPE };
