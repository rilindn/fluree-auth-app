import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import fs from 'fs'
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

import { FlureeClient } from "../../../../lib/api/ApiBase";
import { findUser } from "../../../../lib/api/FlureeMethods";

export const POST = async (request: any) => {
  const requestBody = await request.json();
  const { email, password } = requestBody;

  if (!email) {
    return new NextResponse("Email not provided!", { status: 401 });
  }

  // Read user data from file
  const existingUser = await findUser(email)
  console.log("🚀 ~ file: route.ts:67 ~ POST ~ existingUser:", existingUser)

  if (existingUser) {
    return new NextResponse("Email is already in use!", { status: 400 });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const id = uuidv4()
  const currentDate = new Date().toISOString()
  const user = {
    "@id": `sys:user:${id}`,
    "@type": "User",
    // We have not created the person yet, so we cannot add the ID below.
    // We must come back later and update this.
    "person:personId": { "@id": `person:${id}` },
    "user:userName": requestBody.name,
    "user:email": email,
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

  try {
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

  // Read user data from file
  const usersData = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'db', 'users.json'), 'utf8'));
  const userIndex = usersData.findIndex((u: any) => u.email === email);
  const userData = usersData[userIndex]

  if (!userData) {
    return new NextResponse("User not found!", { status: 404 });
  }

  const userPayload = {
    ...userData,
    ...requestBody,
  };

  try {
    // users[userIndex] = userPayload
    // fs.writeFileSync(path.join(process.cwd(), 'db', 'users.json'), JSON.stringify(users, null, 2));
    return new NextResponse("User updated successfully!", { status: 200 });
  } catch (err: any) {
    return new NextResponse(err, {
      status: 500,
    });
  }
};

export const GET = async (request: any) => {
  return new NextResponse('test', { status: 200 })
}