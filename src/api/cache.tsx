import { InMemoryCache } from '@apollo/client';

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        Page: {
          keyArgs: false,
          merge(existing = {}, incoming, { args }) {
            const { media: incomingMedia = [] } = incoming;
            const mergedMedia = existing.media ? existing.media.slice(0) : [];

            // Here we use the incoming arguments to determine how to merge media arrays
            if (args && args.genre_in) {
              // If we have genre_in argument, we might want to replace the media list
              return {
                ...incoming,
                media: incomingMedia,
              };
            } else {
              // Default merging behavior for other cases
              return {
                ...incoming,
                media: [...mergedMedia, ...incomingMedia],
              };
            }
          },
        },
      },
    },
  },
});

export default cache;
