import { NextApiRequest, NextApiResponse } from "next";
import { decryptJwt } from "../../utils/jwt";

const secret = Buffer.from(process.env.SECRET_KEY_FOR_JWT as string, "hex");

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  const encryptedJwt = request.headers.authorization?.split(" ")[1];

  if (encryptedJwt) {
    try {
      const decrypted = await decryptJwt(encryptedJwt, secret);

      const s = JSON.stringify(decrypted);

      response.status(200);
      response.send(s);

      return;
    } catch (e) {
      console.log("Error: ", e);
    }
  }

  response.status(403);
}
