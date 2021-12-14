import { rest } from "msw";
import { IAgencyResponseDTO } from "../../data/entities/Agency/types";
import { agencies } from "./data/agencies";
import { getTimeout } from "./utils/getTimeout";

export const handlers = [
  rest.get("/agency", (req, res, ctx) => {
    return res(
      ctx.json<IAgencyResponseDTO>(agencies[0]),
      ctx.delay(getTimeout(0)),
      ctx.status(200)
    );
  }),
];
