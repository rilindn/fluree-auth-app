import { queryFluree} from '../FlureeMethods'
import argv from 'yargs';

export default async function resolveDID() {
  const id = argv.id;

  if (!id) {
    console.log('Please provide a id (--id=xyz)')
  }

  console.log("Value of --id parameter:", id);
  const query = {
    "@context": {
      "fl": "https://ns.flur.ee",
      "did": "https://www.w3.org/ns/did/v1#"
    },
    "from": "fluree-jld/387028092977721",
    "select": {
      "did:web:GcMeFAedMWdUvEaz9kRmhstB85UqoXTS5DbPm2LCrxDw": ["*"]
    }
  }
  const didDocument = await queryFluree(query)
  console.log('DID Document:');
  console.log(JSON.stringify(didDocument, null, 2));
}

// resolveDID()
