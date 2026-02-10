import { Contract, ElectrumNetworkProvider } from 'cashscript';
import fs from 'fs';

const artifact = JSON.parse(
  fs.readFileSync('./contracts/escrow.json', 'utf8')
);

const provider = new ElectrumNetworkProvider('chipnet');

const buyerPubKey =
  '02176229b5e93646b24ec2b91b6858bdf533c2dee8b85bb23ad228218637693a73';

const sellerPubKey =
  '02176229b5e93646b24ec2b91b6858bdf533c2dee8b85bb23ad228218637693a73';

async function checkAll() {
  console.log('🔍 DEBUG CHECK');
  
  // Check for decision = 1 (RELEASE)
  const contract1 = new Contract(artifact, [buyerPubKey, sellerPubKey, 1n], { provider });
  console.log('\n1. For RELEASE (decision=1):');
  console.log('   Address:', contract1.address);
  console.log('   Match?', contract1.address === 'bchtest:pd8ncemlz7nwsnpckn73puqtxljqpu2lwejgckjdc0n454aqpxjvxp5n5yhya');
  
  const balance1 = await contract1.getBalance();
  console.log('   Balance:', balance1.toString(), 'sats');
  
  // Check for decision = 2 (REFUND)
  const contract2 = new Contract(artifact, [buyerPubKey, sellerPubKey, 2n], { provider });
  console.log('\n2. For REFUND (decision=2):');
  console.log('   Address:', contract2.address);
  console.log('   Match?', contract2.address === 'bchtest:pd8ncemlz7nwsnpckn73puqtxljqpu2lwejgckjdc0n454aqpxjvxp5n5yhya');
  
  const balance2 = await contract2.getBalance();
  console.log('   Balance:', balance2.toString(), 'sats');
}

checkAll().catch(console.error);