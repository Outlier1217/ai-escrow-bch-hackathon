export default function AdminPanel() {
  return (
    <div className="border p-4 bg-yellow-50">
      <h3>Admin Panel</h3>

      <p>Pending Escrow Detected</p>

      <button>Release Funds</button>
      <button style={{ marginLeft: 10 }}>Refund Buyer</button>

      <p className="text-xs">
        (Calls release_fixed.js / refund.js)
      </p>
    </div>
  );
}
