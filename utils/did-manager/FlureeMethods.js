import axios from 'axios'

const FlureeClient = axios.create({
  baseURL: 'https://data.flur.ee/fluree/',
  timeout: 10000,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    "Authorization": `7G0RpgdeEcnOFAb1yiMLLnvb9LHLDk-icCJTFdUV2J-E28WbcjoZtlTVPb46cGE1jwn__RwYAmp9ed5jiK4dlA`
  }
});

export { transactFluree, queryFluree }

async function transactFluree(payload) {
  try {
    const result = await FlureeClient.post('/transact', payload)
    console.log("🚀 ~ file: FlureeMethods.js:23 ~ transact ~ result:", result.data)
  } catch (err) {
    console.log("🚀 ~ file: ApiMethods.ts:26 ~ fetchFluree ~ err:", err.message)
      throw err
  }
}

async function queryFluree(queryPaylaod) {
  try {
    const result = await FlureeClient.post('/query', queryPaylaod)
    return result.data
  } catch (err) {
    console.log("Error:", err.message)
    throw err
  }
}