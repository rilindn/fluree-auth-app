import axios from "axios"
import { FlureeClient } from "./ApiBase"

interface IUserPayload {
  name: string
  email: string
  password: string,
  verificationCode: string,
  emailVerified: boolean
}

export async function fetchFluree() {
  try {
    const result = await FlureeClient.post('/query', {
      "from": "fluree-jld/387028092977721",
      "where": {
        "@id": "?id",
        "@type": "Yeti"
      },
      "select": { "?id": ["@type", "age", "name", "verified"] }
    })
  } catch (err) {
    console.log("🚀 ~ file: ApiMethods.ts:26 ~ fetchFluree ~ err:", err)
    throw err
  }
}

export async function registerUser(payload: IUserPayload) {
  try {
    const result = await axios.post('/api/user', payload, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    console.log("🚀 ~ file: ApiMethods.ts:29 ~ registerUser ~ result:", result.data)
    // console.log("🚀 ~ file: ApiMethods.ts:12 ~ registerUser ~ result:", result)
  } catch (err) {
    console.log("🚀 ~ file: ApiMethods.ts:26 ~ fetchFluree ~ err:", err)
    throw err
  }
}


export async function createCredential({issuer, userId}: {issuer: string, userId: string}) {
  try {
    const result = await axios.post('/api/user/credential', {issuer, userId}, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    console.log("🚀 ~ file: ApiMethods.ts:29 ~ registerUser ~ result:", result.data)
    // console.log("🚀 ~ file: ApiMethods.ts:12 ~ registerUser ~ result:", result)
  } catch (err) {
    console.log("🚀 ~ file: ApiMethods.ts:26 ~ fetchFluree ~ err:", err)
    throw err
  }
}

export async function sendEmail({ recipientEmail, verificationCode, locationOrigin }: any) {
  try {
    const result = await axios.post('/api/auth/send-mail', {recipientEmail, verificationCode, locationOrigin})
  } catch (err) {
    throw err
  }
}

export async function updateUser(payload: Partial<IUserPayload>) {
  try {
    const result = await axios.put('/api/user', payload, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
  } catch (err) {
    throw err
  }
}