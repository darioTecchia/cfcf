import express, { NextFunction, Request, Response } from "express";
import bodyParser from "body-parser";

import { Validator } from "@marketto/codice-fiscale-utils";

const app = express();
const PORT = process.env.PORT || 3030;

app.use(bodyParser.json());

app.use("*", (req: Request, res: Response, next: NextFunction) => {
  console.log("Request Headers", req.rawHeaders);
  console.log("Request Body", req.body);
  next();
});

app.post("/check-fiscal-code", (req: Request, res: Response) => {
  const fiscalCode: string = req.body.data;

  if (!fiscalCode) {
    return res.send("false");
  }

  const isValidFiscalCode = checkFiscalCode(fiscalCode);

  res.send(JSON.stringify(isValidFiscalCode));
});

function checkFiscalCode(fiscalCode: string): boolean {
  return Validator.codiceFiscale(fiscalCode).valid;
}

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

export default app;
