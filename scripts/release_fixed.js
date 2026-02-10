import {
  Contract,
  ElectrumNetworkProvider,
  SignatureTemplate,
} from 'cashscript';
import fs from 'fs';

const artifact = JSON.parse(
  fs.readFileSync('./contracts/escrow.json', 'utf8')
);

const provider = new ElectrumNetworkProvider('chipnet');

const buyerPubKey =
  '02176229b5e93646b24ec2b91b6858bdf533c2dee8b85bb23ad228218637693a73';

const sellerPubKey =
  '02176229b5e93646b24ec2b91b6858bdf533c2dee8b85bb23ad228218637693a73';

const decision = 1n;

// 🔐 SELLER PRIVATE KEY (WIF – CHIPNET)
const sellerPrivateKey =
  'L3Gr6akrqJKx4gCE8qnB7KVk7dYrYwqVt2AXKjAjzWQrYDTYnYMn';

// ✅ VALID CHIPNET ADDRESS
const sellerAddress =
  'bchtest:qqpghgurx96sj4macw65a7sd29h7sv5jlc5qxx2mc6';

// SignatureTemplate using PRIVATE KEY (CORRECT FOR v0.10)
const sellerSig = new SignatureTemplate(sellerPrivateKey);

const contract = new Contract(
  artifact,
  [buyerPubKey, sellerPubKey, decision],
  { provider }
);

async function main() {
  console.log('🔓 RELEASE FLOW (SELLER)');
  console.log('📄 Contract Address:', contract.address);

  const balance = await contract.getBalance();
  console.log('💰 Escrow Balance:', balance.toString(), 'sats');

  if (balance === 0n) {
    throw new Error('❌ No funds in escrow');
  }

  const FEE = 1000n;
  const payout = balance - FEE;

  console.log('👤 Seller Address:', sellerAddress);
  console.log('📤 Payout:', payout.toString(), 'sats');

  const tx = await contract.functions
    .release(sellerSig)
    .to(sellerAddress, payout)
    .send();

  console.log('\n✅ RELEASE SUCCESSFUL');
  console.log('🔗 TXID:', tx.txid);
  console.log(
    '🔎 Explorer:',
    'https://chipnet.imaginary.cash/tx/' + tx.txid
  );
}

main().catch(console.error);
