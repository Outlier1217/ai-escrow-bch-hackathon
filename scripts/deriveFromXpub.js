import * as ecc from 'tiny-secp256k1';
import { BIP32Factory } from 'bip32';

// create bip32 instance with ecc
const bip32 = BIP32Factory(ecc);

// BCH xpub (m/44'/145'/0')
const xpub =
  'xpub6CxPkUCiWW5UcMCy3Z5GKpaborqGbnrp2cSLK92YZPTSEZfiwWnH4uYSNohV6RdKUinNciFRGFF4PGXE9KhajNBiG6SHzF5Sm7xaRhn4bZV';

// derive node from xpub
const node = bip32.fromBase58(xpub);

// derive first receiving pubkey: m/44'/145'/0'/0/0
const child = node.derive(0).derive(0);

console.log(
  'Public Key:',
  Buffer.from(child.publicKey).toString('hex')
);
