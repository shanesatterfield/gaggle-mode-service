import {
  APIGatewayProxyEventV2,
  APIGatewayProxyStructuredResultV2,
  Handler,
} from "aws-lambda";
import { calculateMode } from "src/calculate-mode";
import { CalculationRequest } from "src/types";

export const calcModeHandler: Handler<
  APIGatewayProxyEventV2,
  APIGatewayProxyStructuredResultV2
> = async (
  event: APIGatewayProxyEventV2
): Promise<APIGatewayProxyStructuredResultV2> => {
  // Parse request from JSON string
  const parsedJSON = safeJSONParse(event.body);
  const parseResult = await CalculationRequest.safeParseAsync(parsedJSON);

  // Validate request
  if (!parseResult.success) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        error: parseResult.error,
      }),
    };
  }

  const mode = calculateMode(parseResult.data.values);
  return {
    statusCode: 200,
    body: JSON.stringify({ mode }),
  };
};

function safeJSONParse(value: string | undefined): unknown | undefined {
  if (!value) {
    return undefined;
  }

  try {
    return JSON.parse(value);
  } catch (e) {
    console.error("Invalid JSON");
    return undefined;
  }
}
