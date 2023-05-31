import { z } from "zod";

export const CalculationRequest = z.object({
  values: z.array(z.number()).nonempty({
    message: "Specify at least one number",
  }),
});
