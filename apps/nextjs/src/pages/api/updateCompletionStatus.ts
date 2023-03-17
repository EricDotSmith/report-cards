import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@acme/db";
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

      await prisma.report.update({
        where: {
          id: decrypted.payload.reportId as string,
        },
        data: {
          comments: {
            create: {
              comment: s,
              studentId: "1",
            },
          },
        },
      });

      response.status(200);

      return;
    } catch (e) {
      console.log("Error: ", e);
    }
  }

  response.status(403);
}
