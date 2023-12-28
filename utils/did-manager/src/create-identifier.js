import sodium from 'libsodium-wrappers'
import crypto from 'crypto'
import bs58 from 'bs58'
import {transactFluree} from '../FlureeMethods'

export default async function generateDIDDocument() {
  // Step 1: Choose the Ed25519 algorithm
  await sodium.ready;

  // Step 2: Generate an Ed25519 key pair
  const keyPair = sodium.crypto_sign_keypair();
  const privateKeyBase64 = sodium.to_base64(keyPair.privateKey);
  console.log("🚀 ~ file: create_did_v2.js:12 ~ generateDIDDocument ~ keyPair:", privateKeyBase64)
  const publicKeyBase64 = sodium.to_base64(keyPair.publicKey);

  // Step 3: Generate a dynamic DID identifier (replace with your preferred method)
  const didIdentifier = generateDynamicDIDIdentifier();

  // Step 4: Create a JSON-LD DID document
  const didDocument = {
    '@context': 'https://www.w3.org/ns/did/v1',
    "@type": "did:DID",
    '@id': didIdentifier,
    'did:publicKey': [
      {
        'did:id': `${didIdentifier}#keys-1`,
        'did:type': 'Ed25519VerificationKey2018',
        'did:publicKeyJwk': {
          'did:kty': 'OKP',
          'did:crv': 'Ed25519',
          'did:x': publicKeyBase64,
        },
      },
    ],
    'did:controller': `${didIdentifier}#controller`,
    'did:authentication': [
      {
        'did:type': 'Ed25519SignatureAuthentication2018',
        'did:publicKeyId': `${didIdentifier}#keys-1`,
      },
    ],
  };

  return didDocument;
}


function generateDynamicDIDIdentifier() {
  // Generate a random 32-byte buffer
  const randomBytes = crypto.getRandomValues(new Uint8Array(32));
 
  // Encode the randomBytes in base58
  const base58String = bs58.encode(randomBytes);

  // Construct a DID identifier using a method name (e.g., 'key') and the base58-encoded randomBytes
  return `did:web:${base58String}`;
}
