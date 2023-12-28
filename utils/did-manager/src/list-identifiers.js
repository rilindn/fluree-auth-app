import {queryFluree} from '../FlureeMethods'

export default async function listDIDs() {
  const query = {
    "@context": {
      "fl": "https://ns.flur.ee",
      "did": "https://www.w3.org/ns/did/v1#"
    },
    "from": "fluree-jld/387028092977721",
    "select": {
      "?s": [
        "*",
        {"did:authentication": ["*"]},
        {"did:publicKey": ["*"]}
      ]
    },
    "where": {
      "@id": "?s",
      "@type": "did:DID"
    }
  }
  const result = await queryFluree(query)
  console.log('DID Document:');
  console.log(JSON.stringify(result, null, 2));
}

// listDIDs()
