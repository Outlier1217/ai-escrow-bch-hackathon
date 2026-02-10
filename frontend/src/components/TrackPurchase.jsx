import { useState } from "react";

export default function TrackPurchase() {
  const [status, setStatus] = useState(null);
  const [trackingId, setTrackingId] = useState("");
  const [loading, setLoading] = useState(false);

  const trackPurchase = () => {
    if (!trackingId.trim()) {
      alert("Please enter a tracking ID or transaction hash");
      return;
    }

    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const statuses = [
        "🔍 Escrow Funded - Awaiting Confirmation",
        "✅ Payment Confirmed - Processing Delivery",
        "🔄 In Escrow - Admin Decision Pending",
        "🚚 Product Delivered - Escrow Released"
      ];
      setStatus(statuses[Math.floor(Math.random() * statuses.length)]);
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="track-container">
      <div className="track-header">
        <h2>📦 Track Your Purchase</h2>
        <p className="track-subtitle">Monitor escrow status with transaction ID</p>
      </div>

      <div className="track-card">
        <div className="input-group">
          <label htmlFor="trackingId">Transaction Hash / Tracking ID</label>
          <input
            id="trackingId"
            type="text"
            placeholder="Enter your transaction hash here..."
            value={trackingId}
            onChange={(e) => setTrackingId(e.target.value)}
            className="track-input"
          />
          <button 
            onClick={trackPurchase} 
            className="track-button"
            disabled={loading}
          >
            {loading ? 'Tracking...' : 'Track Purchase'}
          </button>
        </div>

        {status && (
          <div className="status-result">
            <div className="status-header-result">
              <h4>Current Status</h4>
              <div className="live-indicator">
                <div className="pulse-dot" />
                LIVE
              </div>
            </div>
            <div className="status-message">
              {status}
            </div>
            <div className="status-timeline">
              <div className="timeline-step completed">
                <div className="timeline-dot" />
                <span>Payment Sent</span>
              </div>
              <div className="timeline-step active">
                <div className="timeline-dot" />
                <span>In Escrow</span>
              </div>
              <div className="timeline-step">
                <div className="timeline-dot" />
                <span>Release</span>
              </div>
            </div>
          </div>
        )}

        <div className="track-info">
          <h4>How Bitcoin Cash Escrow Works:</h4>
          <ul>
            <li>💰 Payment is locked in smart contract</li>
            <li>🛡️ Both buyer and seller are protected</li>
            <li>⚡ No accounts needed - track by transaction</li>
            <li>🤖 AI escrow can auto-release based on conditions</li>
          </ul>
        </div>
      </div>
    </div>
  );
}