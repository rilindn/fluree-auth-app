import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import fs from 'fs'
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

import { FlureeClient } from "../../../../lib/api/ApiBase";
import { findUser, transactFluree } from "../../../../lib/api/FlureeMethods";
import { createIdentifier } from '../../../../utils/did-manager'

export const POST = async (request: any) => {
  const requestBody = await request.json();
  const { email, password } = requestBody;

  if (!email) {
    return new NextResponse("Email not provided!", { status: 401 });
  }

  // const existingUser = await findUser(email)
  // console.log("🚀 ~ file: route.ts:67 ~ POST ~ existingUser:", existingUser)

  // if (existingUser) {
  //   return new NextResponse("Email is already in use!", { status: 400 });
  // }


  try {

    // create DID and DID document and assign it to the user
    const didDocument = await createIdentifier()
    console.log("🚀 ~ file: route.ts:31 ~ POST ~ didDocument:", didDocument)
    const res = await FlureeClient.post('/transact', {
      "@context": {
        "fl": "https://ns.flur.ee",
        "did": "https://www.w3.org/ns/did/v1#"
      },
      "ledger": `fluree-jld/${process.env.LEDGER}`,
      "insert": [didDocument]
    })
    console.log("🚀 ~ file: route.ts:38 ~ POST ~ res:", res)

    const hashedPassword = await bcrypt.hash(password, 10);
    const id = uuidv4()
    const currentDate = new Date().toISOString()
    const user = {
      "@id": `sys:user:${id}`,
      "@type": "User",
      // We have not created the person yet, so we cannot add the ID below.
      // We must come back later and update this.
      "person:did": { "@id": didDocument["@id"] },
      "person:personId": { "@id": `person:${id}` },
      "user:userName": requestBody.name,
      "user:email": email,
      "user:role": "BasicUser",
      "user:password": hashedPassword,
      "user:dateCreated": currentDate,
      // This assumes that this user is being created by himself as he/she's creating the account
      // Otherwise it will be someone else's Id such as an admin
      "user:createdUserId": `sys:user:${id}`,
      "user:dateModified": currentDate,
      // This assumes that this user is being created by himself as he/she's creating the account or modifing the account
      // Otherwise it will be someone else's Id such as an admin
      "user:modifiedUserId": `sys:user:${id}`,
      "user:verificationCode": requestBody.verificationCode,
      "user:emailVerified": false
    };
    const result = await FlureeClient.post('/transact', {
      "@context": {
        "fl": "https://ns.flur.ee",
        "person": "http://thinkgraph.org/ontologies/core/person#"
      },
      "ledger": `fluree-jld/${process.env.LEDGER}`,
      "insert": [user]
    })
    return new NextResponse("User is registered successfully!", { status: 200 });
  } catch (err: any) {
    console.log("🚀 ~ file: route.ts:111 ~ POST ~ err:", err)
    return new NextResponse(err, {
      status: 500,
    });
  }
};

export const PUT = async (request: any) => {
  const requestBody = await request.json();
  const { email } = requestBody;

  if (!email) {
    return;
  }

  const existingUser = await findUser(email)
  if (!existingUser) {
    return new NextResponse("User not found!", { status: 404 });
  }

  try {
    const result = await FlureeClient.post('/transact', {
      "@context": {
        "fl": "https://ns.flur.ee",
        "person": "http://thinkgraph.org/ontologies/core/person#"
      },
      "ledger": `fluree-jld/${process.env.LEDGER}`,
      "delete": {
        "@id": existingUser['@id'],
        "user:emailVerified": false
      },
      "insert": [
        {
          "@id": existingUser['@id'],
          "user:emailVerified": true
        }
      ]
    })
    return new NextResponse("Email verified successfully!", { status: 200 });
  } catch (err: any) {
    console.log("🚀 ~ file: route.ts:111 ~ POST ~ err:", err)
    return new NextResponse(err, {
      status: 500,
    });
  }
};

export const GET = async (request: any) => {
  return new NextResponse('test', { status: 200 })
}