import axios from "axios"
import { FlureeClient } from "./ApiBase"

interface IUserPayload {
  name: string
  email: string
  password: string,
  verificationCode: string,
  emailVerified: boolean
}

export async function findUser(email: string) {
  try {
    // Read user data from file
    const result = await FlureeClient.post('/query', {
      "@context": {
        "fl": "https://ns.flur.ee",
        "person": "http://thinkgraph.org/ontologies/core/person#",
        "email": "user:email",
        "password": "user:password",
        "emailVerified": "user:emailVerified",
        "verificationCode": "user:verificationCode",
        "name": "user:userName",
        "role": "user:role"
      },
      "from": `fluree-jld/${process.env.LEDGER}`,
      "where": {
        "@id": "?id",
        "user:email": email
      }, 
      "select": { "?id": ["*"] }
    })
    return result?.data?.[0]
  } catch (err) {
    console.log("🚀 ~ file: ApiMethods.ts:26 ~ fetchFluree ~ err:", err)
    throw err
  }
}

export async function listUsers() {
  try {
    // Read user data from file
    console.log("🚀 ~ file: FlureeMethods.ts:61 ~ listUsers ~ FlureeClient:", FlureeClient)

    const result = await FlureeClient.post('/query', {
      "@context": {
        "fl": "https://ns.flur.ee",
        "person": "http://thinkgraph.org/ontologies/core/person#",
        "email": "user:email",
        "password": "user:password",
        "emailVerified": "user:emailVerified",
        "verificationCode": "user:verificationCode",
        "name": "user:userName",
        "role": "user:role"
      },
      "from": `fluree-jld/${process.env.LEDGER}`,
      "where": {
        "@id": "?id",
        "user:role": "BasicUser"
      }, 
      "select": { "?id": ["*"] }
    })
    console.log("🚀 ~ file: FlureeMethods.ts:68 ~ listUsers ~ result?.data:", result?.data)
    return result?.data
  } catch (err) {
    console.log("🚀 ~ file: ApiMethods.ts:26 ~ fetchFluree ~ err:", err)
    throw err
  }
}

export async function registerUser(payload: IUserPayload) {
  try {
    const result = await FlureeClient.post('/transact', {
      "@context": {
        "fl": "https://ns.flur.ee",
        "person": "http://thinkgraph.org/ontologies/core/person#"
      },
      "ledger": `fluree-jld/${process.env.LEDGER}`,
      "insert": [payload]
    })
  } catch (err) {
    console.log("🚀 ~ file: ApiMethods.ts:26 ~ fetchFluree ~ err:", err)
    throw err
  }
}

export async function sendEmail({ recipientEmail, verificationCode }: any) {
  try {
    const result = await axios.post('/api/auth/send-mail', {recipientEmail, verificationCode})
    console.log("🚀 ~ file: ApiMethods.ts:12 ~ registerUser ~ result:", result)
  } catch (err) {
    throw err
  }
}

export async function updateUser(payload: Partial<IUserPayload>) {
  console.log("🚀 ~ file: ApiMethods.ts:10 ~ registerUser ~ payload:", payload)
  try {
    const result = await axios.put('/api/user', payload, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    console.log("🚀 ~ file: ApiMethods.ts:29 ~ registerUser ~ result:", result)
  } catch (err) {
    throw err
  }
}

export async function transactFluree(payload: any) {
  try {
    const result = await FlureeClient.post('/transact', payload)
    console.log("🚀 ~ file: FlureeMethods.js:23 ~ transact ~ result:", result.data)
  } catch (err) {
    console.log("🚀 ~ file: ApiMethods.ts:26 ~ fetchFluree ~ err:", err)
      // throw err
  }
}

export async function queryFluree(queryPaylaod: any) {
  try {
    const result = await FlureeClient.post('/query', queryPaylaod)
    return result.data
  } catch (err) {
    console.log("Error:", err)
    throw err
  }
}