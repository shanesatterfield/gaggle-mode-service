import { describe, test, expect } from "@jest/globals";
import {
  APIGatewayProxyEventV2,
  Context,
  Callback,
  Handler,
  APIGatewayProxyStructuredResultV2,
} from "aws-lambda";
import { calcModeHandler } from "src/handlers/calc-mode-handler";

describe("Handler", () => {
  test("valid request", async () => {
    await testHandler(
      calcModeHandler,
      {
        values: [1, 2, 2, 3, 4],
      },
      {
        statusCode: 200,
        body: JSON.stringify({ mode: 2 }),
      }
    );
  });

  test("invalid request missing values field", async () => {
    await testHandler(calcModeHandler, { hello: "world" }, { statusCode: 400 });
  });

  test("undefined values in numbers array", async () => {
    await testHandler(
      calcModeHandler,
      { values: [1, 2, 2, undefined, 3, 4] },
      { statusCode: 400 }
    );
  });

  test("empty values array", async () => {
    await testHandler(calcModeHandler, { values: [] }, { statusCode: 400 });
  });
});

async function testHandler(
  handler: Handler<APIGatewayProxyEventV2, APIGatewayProxyStructuredResultV2>,
  requestBody: unknown,
  expectedValue: APIGatewayProxyStructuredResultV2
): Promise<void> {
  const result = (await handler(
    mockAPIEvent(requestBody),
    mockContext(),
    mockCallback()
  )) as APIGatewayProxyStructuredResultV2;

  expect(result).toMatchObject(expectedValue as Record<string, unknown>);
}

function mockAPIEvent(body: unknown): APIGatewayProxyEventV2 {
  return { body: JSON.stringify(body) } as APIGatewayProxyEventV2;
}

function mockContext(): Context {
  return {} as unknown as Context;
}

function mockCallback(): Callback {
  return () => undefined;
}
