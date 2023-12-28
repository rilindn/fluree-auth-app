import sodium from 'libsodium-wrappers'
import crypto from 'crypto'
import bs58 from 'bs58'
import { transactFluree } from '../FlureeMethods'
// import { v4: uuidv4 } from 'uuid'

export default async function createCredental({ issuer }) {
  // Step 1: Choose the Ed25519 algorithm
  await sodium.ready;

  // Step 2: Generate an Ed25519 key pair
  const keyPair = sodium.crypto_sign_keypair();
  const privateKeyBase64 = sodium.to_base64(keyPair.privateKey);
  console.log("🚀 ~ file: create_did_v2.js:12 ~ createCredental ~ keyPair:", privateKeyBase64)
  const publicKeyBase64 = sodium.to_base64(keyPair.publicKey);

  // Step 4: Create a Verifable Credential
  const credential = {
    "@context": {
      "cred": "https://www.w3.org/ns/credentials/v2",
      "pop": "https://www.w3.org/2023/credentials/v2/proof-of-personhood#",
      "corePoP": "http://thinkgraph.org/ontologies/core/PoP#",
      "coreCoTL1": "http://thinkgraph.org/ontologies/core/PoP#CoTL1"
    },
    "@type": [
      "cred:VerifiableCredential",
      "pop:ProofOfPersonhoodCredential",
      "ex:CircleOfTrustLevel1Credential"
    ],
    "@id": crypto.randomUUID(),
    issuer,
    "issuanceDate": new Date(),
    "expirationDate": new Date(new Date().setFullYear(new Date().getFullYear() + 4)),
    "credentialSubject": {
      "id": "did:example:123456789abcdefghi#me",
      "name": "John Doe",
      "emailAddress": "john@example.com"
      // "pop:circleOfTrust": {
      //   "id": "did:example:123456789abcdefghi",
      //   "corePoP:type": "poP-CoT-L1",
      //   "corePoP:verificationItems": [
      //     {
      //       "coreCoTL1:id": "123456787abcd",
      //       "coreCoTL1:coT-Person": "did:example:123456789abcdefghi#circle-1"
      //     },
      //     {
      //       "coreCoTL1:id": "123456787abcd",
      //       "coreCoTL1:coT-Person": "did:example:123456789abcdefghi#circle-1"
      //     }
      //   ]
      // }
    },
    "proof": {
      "type": "cred:DataIntegrityProof",
      "cryptosuite": "eddsa-2022",
      "created": "2023-10-13T13:29:13Z",
      "proofPurpose": "assertionMethod",
      "verificationMethod": "did:example:123456789abcdefghi#keys-1",
      "challenge": "1f44d55f-f161-4938-a659-f8026467f126",
      "domain": "4jt78h47fh47",
      "proofValue": "zqpLMweBrSxMY2xHX5XTYV8nQAJeV6doDwLWxQeVbY4oey5q2pmEcqaqA3Q1 gVHMrXFkXM3XKaxup3tmzN4DRFTLV"
    }
  };

  return credential;
}

// createCredental({issuer: 'did:web:3YLcuXjtkj6wHy244W1DVDe5wMHojGooHjReSGLzxZHr'})
//   .then((credential) => {
//     console.log('Generated DID Document:');
//     console.log(JSON.stringify(credential, null, 2));
//     const transactPayload = {
//       "@context": {
//         "fl": "https://ns.flur.ee",
//         "did": "https://www.w3.org/ns/did/v1#"
//       },
//       "ledger": `fluree-jld/387028092977721`,
//       "insert": [credential]
//     }
//     transactFluree(transactPayload)
//   })
//   .catch((error) => {
//     console.error('Error:', error.message);
//   });
