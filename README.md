# gaggle-mode-service

This repo contains a Lambda function that calculates the mode of a series of numbers. It also attaches that Lambda to an AWS API Gateway instance.

This is a simple Lambda function without any overarching framework. It uses the AWS Lambda types package to keep everything type-safe. This allows us to build lightweight Lambda functions with standard TypeScript packages and tooling.

## Set Up Node

This repo is configured with NVM. Run the `nvm use` command to configure the [correct version of NodeJS](./.nvmrc) for this repo.

If you don't have that version installed, run `nvm install` first.

## Install Dependencies

Install NPM dependencies with the following command.

```bash
npm install
```
## How to Build

You can build the distribution files with the following command. They will be in the `./dist` directory.

```bash
npm run build
```

## How to Deploy

### Automated Deployment

Commits merged into the `main` branch automatically trigger the Github Actions CI/CD pipeline to deploy to AWS. No further action is required.

If you're setting up this repo for the first time, make sure to add the following Github secrets. They are used in the CI/CD pipeline.

- AWS_ACCESS_KEY_ID
- AWS_SECRET_ACCESS_KEY
- AWS_REGION

### Manual Deployment

First, build the distribution files with `npm run build`.

From there, `cd` into the `./infrastructure` directory and follow [the instructions](./infrastructure/README.md) for deploying to AWS using the CDK.

## Testing

You can either invoke the Lambda from the AWS console with an API Gateway proxy event, or hit the live URL below.

```bash
curl -XPOST 'https://jl8fxuewvl.execute-api.us-west-2.amazonaws.com/prod/mode' \
    --header 'Content-Type: application/json' \
    --data '{ "values": [1, 2, 2, 3] }'
```

### Example Request

```bash
curl -XPOST '<api-url>/mode' \
    --header 'Content-Type: application/json' \
    --data '{ "values": [1, 2, 2, 3] }'
```

### Example Response

```json
{
    "mode": 2.0
}
```

### Unit Tests

You can run local unit tests with the following command.

```bash
npm test
```
