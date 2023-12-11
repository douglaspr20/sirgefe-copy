## Installation

On initial installation you will may encounter react dependency errors which is expected as they are not compatable with React 13. ONLY on initial installation it is ok to install using the --force option to get past this.

Update hosts file with the following

```
127.0.0.1       accounts.dev.sirge.local
127.0.0.1       book.dev.sirge.local
127.0.0.1       apple.dev.sirge.local
127.0.0.1       news5.dev.sirge.local
127.0.0.1       herjuice.dev.sirge.local
```

You will need to create a .env file. Request a copy from a dev

run
`PORT=3002 npm run dev`

### Sentry Environment Variables

```
NEXT_PUBLIC_SENTRY_DSN=https://622ca296826d4edc9530d23d7d5f9cb3@glitchtip.prod.sirge.com/2
SENTRY_AUTH_TOKEN=c7a9c4ddf3c350a62721bd7dbae2a1449da6d5540a3ff5be43ed00fe925dd643
```

### Notes

- @mui/styles is not compatable with React 18. MAY need to find another option
- simple-react-lightbox is not compatible with React 18 and is deprecated as well. Will need to find another option

### Updating Schema

If you get errors running npm run update-schema, you may need to run aws configure
from there you will need to take the access key id, and the access key secret from your appsync .env file and paste them in at the command prompt

###
