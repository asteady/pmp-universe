# Index Exchange SSP Integration

## Authentication
- Generate a user account token via POST to https://app.indexexchange.com/api/authentication/v1/login
- Use the access token as a Bearer token in the Authorization header.

## Example Endpoints
- Create Deal: POST https://app.indexexchange.com/api/deals/v2/deals
- Get Deal: GET https://app.indexexchange.com/api/deals/v2/deals/{internalDealID}

## Official Docs
- [Index Exchange API Docs](https://app.indexexchange.com/api/) 