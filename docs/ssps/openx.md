# OpenX SSP Integration

## Authentication
- Obtain an API key from the OpenXSelect UI > Settings tab.
- Authenticate by adding the key as an `x-apikey` header in requests.

## Example GraphQL Query
```graphql
query {
  deals(limit: 5, offset: 0) {
    id
    deal_id
    name
  }
}
```

## Example GraphQL Mutation (Create Deal)
```graphql
mutation DealCreate($input: DealCreateParams!) {
  dealCreate(input: $input) {
    id
    deal_id
    name
    status
  }
}
```

## Official Docs
- [OpenXSelect API Reference](https://select.openx.com/docs//openxselect/oxs-api/) 