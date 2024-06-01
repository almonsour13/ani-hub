import { ApolloClient, InMemoryCache,ApolloProvider } from '@apollo/client';
import cache from './cache';
const client = new ApolloClient({
  uri: 'https://graphql.anilist.co/',
  cache: cache
});
export { client, ApolloProvider };
