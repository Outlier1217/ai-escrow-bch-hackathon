import {
  Contract,
  ElectrumNetworkProvider,
  SignatureTemplate,
} from 'cashscript';
import fs from 'fs';

// Load compiled artifact
const artifact = JSON.parse(
  fs.readFileSync('./contracts/escrow.json', 'utf8')
);

// Chipnet provider
const provider = new ElectrumNetworkProvider('chipnet');

// SAME pubkeys used in escrow creation
const buyerPubKey =
  '02176229b5e93646b24ec2b91b6858bdf533c2dee8b85bb23ad228218637693a73';

const sellerPubKey =
  '02176229b5e93646b24ec2b91b6858bdf533c2dee8b85bb23ad228218637693a73';

// decision = 2 (REFUND)
const decision = 2n;

// 🔐 BUYER PRIVATE KEY (WIF – CHIPNET)
const buyerPrivateKey =
  'L3Gr6akrqJKx4gCE8qnB7KVk7dYrYwqVt2AXKjAjzWQrYDTYnYMn';

// Buyer payout address (Chipnet)
const buyerAddress =
  'bchtest:qqpghgurx96sj4macw65a7sd29h7sv5jlc5qxx2mc6';

// SignatureTemplate using PRIVATE KEY
const buyerSig = new SignatureTemplate(buyerPrivateKey);

// Recreate escrow contract
const contract = new Contract(
  artifact,
  [buyerPubKey, sellerPubKey, decision],
  { provider }
);

async function main() {
  console.log('↩️  REFUND FLOW (BUYER)');
  console.log('📄 Contract Address:', contract.address);

  const balance = await contract.getBalance();
  console.log('💰 Escrow Balance:', balance.toString(), 'sats');

  if (balance === 0n) {
    throw new Error('❌ No funds in escrow');
  }

  const FEE = 1000n;
  const payout = balance - FEE;

  console.log('👤 Buyer Address:', buyerAddress);
  console.log('📤 Refund Amount:', payout.toString(), 'sats');

  const tx = await contract.functions
    .refund(buyerSig)
    .to(buyerAddress, payout)
    .send();

  console.log('\n✅ REFUND SUCCESSFUL');
  console.log('🔗 TXID:', tx.txid);
  console.log(
    '🔎 Explorer:',
    'https://chipnet.imaginary.cash/tx/' + tx.txid
  );
}

main().catch(console.error);
