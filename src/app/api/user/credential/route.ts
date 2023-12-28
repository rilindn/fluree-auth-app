import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import fs from 'fs'
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

import { FlureeClient } from "../../../../../lib/api/ApiBase";
import { findUser, transactFluree } from "../../../../../lib/api/FlureeMethods";
import { createIdentifier } from '../../../../../utils/did-manager'
import createCredental from "../../../../../utils/did-manager/src/create-credential";

export const POST = async (request: any) => {
  const requestBody = await request.json();
  const { issuer, userId } = requestBody;

  if (!issuer) {
    return new NextResponse("Issuer not provided!", { status: 401 });
  }

  if (!userId) {
    return new NextResponse("User not provided!", { status: 401 });
  }

  try {

    // create VC and assign it to the user
    const credential = await createCredental({issuer})
    const credentialRes = await FlureeClient.post('/transact', {
      "@context": {
        "fl": "https://ns.flur.ee",
        "did": "https://www.w3.org/ns/did/v1#"
      },
      "ledger": `fluree-jld/${process.env.LEDGER}`,
      "insert": [credential]
    })
    console.log("🚀 ~ file: route.ts:36 ~ POST ~ credentialRes:", credentialRes)

    const updateUserRes = await FlureeClient.post('/transact', {
      "@context": {
        "fl": "https://ns.flur.ee",
        "did": "https://www.w3.org/ns/did/v1#",
        "cred": "https://www.w3.org/ns/credentials/v2",
      },
      "ledger": `fluree-jld/${process.env.LEDGER}`,
      "insert": [{
        "@id": userId,
        "user:cred": {"@id": credential['@id']}
      }]
    })
    console.log("🚀 ~ file: route.ts:50 ~ POST ~ updateUserRes:", updateUserRes)

    return new NextResponse("User's credential was created successfully!", { status: 200 });
  } catch (err: any) {
    console.log("🚀 ~ file: route.ts:111 ~ POST ~ err:", err)
    return new NextResponse(err, {
      status: 500,
    });
  }
};