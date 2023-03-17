import {
  EncryptJWT,
  jwtDecrypt,
  JWTPayload,
  jwtVerify,
  KeyLike,
  SignJWT,
} from "jose";

export const signJwt = async (
  subject: string,
  payload: JWTPayload,
  secret: Uint8Array | KeyLike,
) => {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(subject)
    .setIssuedAt()
    .sign(secret);
};

export const verifyJwt = async (
  jwt: string | Uint8Array,
  secret: KeyLike | Uint8Array,
) => {
  return await jwtVerify(jwt, secret, {
    algorithms: ["HS256"],
  });
};

export const generateEncryptedJwt = (
  subject: string,
  payload: JWTPayload,
  secret: Uint8Array | KeyLike,
) => {
  return new EncryptJWT(payload)
    .setProtectedHeader({ alg: "dir", enc: "A256GCM" })
    .setIssuedAt()
    .setSubject(subject)
    .encrypt(secret);
};

export const decryptJwt = async (
  jwt: string | Uint8Array,
  secret: Uint8Array | KeyLike,
) => {
  const options = {
    contentEncryptionAlgorithms: ["A256GCM"],
    keyManagementAlgorithms: ["dir"],
  };

  return jwtDecrypt(jwt, secret, options);
};
