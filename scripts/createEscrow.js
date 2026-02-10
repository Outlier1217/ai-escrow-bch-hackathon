import { Contract, ElectrumNetworkProvider } from 'cashscript';
import fs from 'fs';

// 🔥 BOM-safe JSON load
const rawBuffer = fs.readFileSync('./contracts/escrow.json');
const raw = rawBuffer.toString('utf8').replace(/^[^\{]*/, '');
const artifact = JSON.parse(raw);

// BCH testnet (Chipnet)
const provider = new ElectrumNetworkProvider('chipnet');

// 🔑 PUBLIC KEYS (hex, compressed)
const buyerPubKey =
  '02176229b5e93646b24ec2b91b6858bdf533c2dee8b85bb23ad228218637693a73';

// Demo ke liye same seller key
const sellerPubKey =
  '02176229b5e93646b24ec2b91b6858bdf533c2dee8b85bb23ad228218637693a73';

// AI decision: 0 = HOLD
const decision = 2n;

const contract = new Contract(
  artifact,
  [buyerPubKey, sellerPubKey, decision],
  { provider }
);

async function main() {
  console.log('\n🔒 ESCROW CONTRACT ADDRESS');
  console.log(contract.address);

  console.log('\n👉 Please send testnet to this address');
}

main();
