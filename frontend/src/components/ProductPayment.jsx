import { useState, useEffect } from "react";

const ESCROW_ADDRESS = "bchtest:pd8ncemlz7nwsnpckn73puqtxljqpu2lwejgckjdc0n454aqpxjvxp5n5yhya";

export default function ProductPayment({ product, onBack }) {
  const [status, setStatus] = useState("WAITING FOR PAYMENT");
  const [balance, setBalance] = useState(0);
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (status !== "WAITING FOR PAYMENT") {
      const interval = setInterval(checkPayment, 5000);
      return () => clearInterval(interval);
    }
  }, [status]);

  const copyAddress = async () => {
    await navigator.clipboard.writeText(ESCROW_ADDRESS);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const checkPayment = async () => {
    setLoading(true);
    try {
      // Simulated API call - replace with actual explorer API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock balance update for demo
      const mockBalance = Math.random() > 0.5 ? product.price : 0;
      setBalance(mockBalance);

      if (mockBalance > 0) {
        setStatus(
          product.type === "hold"
            ? "⏳ ON HOLD (Waiting for Admin Approval)"
            : "✅ PAYMENT COMPLETED"
        );
      } else {
        setStatus("⏳ WAITING FOR PAYMENT");
      }
    } catch (error) {
      console.error("Error checking payment:", error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = () => {
    if (status.includes("WAITING")) return "#f59e0b";
    if (status.includes("ON HOLD")) return "#3b82f6";
    if (status.includes("COMPLETED")) return "#10b981";
    return "#6b7280";
  };

  return (
    <div className="payment-container">
      <div className="payment-header">
        <button onClick={onBack} className="back-button">
          ← Back to Products
        </button>
        <h2>Complete Your Purchase</h2>
      </div>

      <div className="payment-details">
        <div className="product-summary">
          <div className="product-icon-large">
            {product.id === 1 ? "📚" : product.id === 2 ? "📝" : "⚡"}
          </div>
          <div>
            <h3>{product.name}</h3>
            <p className="product-type">
              {product.type === "instant" ? "⚡ Instant Delivery" : "🛡️ Escrow Protected"}
            </p>
          </div>
          <div className="price-tag">{product.price} BCH</div>
        </div>

        <div className="payment-steps">
          <div className="step active">
            <div className="step-number">1</div>
            <div className="step-content">
              <h4>Send Payment to Escrow</h4>
              <p>Copy the escrow address below</p>
            </div>
          </div>

          <div className="step">
            <div className="step-number">2</div>
            <div className="step-content">
              <h4>Confirm Transaction</h4>
              <p>Wait for blockchain confirmation</p>
            </div>
          </div>

          <div className="step">
            <div className="step-number">3</div>
            <div className="step-content">
              <h4>Receive Product</h4>
              <p>Get instant or escrow release</p>
            </div>
          </div>
        </div>

        <div className="address-section">
          <label>Escrow Smart Contract Address</label>
          <div className="address-box">
            <code>{ESCROW_ADDRESS}</code>
            <button 
              onClick={copyAddress} 
              className={`copy-button ${copied ? 'copied' : ''}`}
            >
              {copied ? '✓ Copied' : 'Copy'}
            </button>
          </div>
          <p className="helper-text">
            Send exactly <strong>{product.price} BCH</strong> to this address
          </p>
        </div>

        <div className="status-section">
          <div className="status-header">
            <h4>Payment Status</h4>
            <button 
              onClick={checkPayment} 
              className="check-button"
              disabled={loading}
            >
              {loading ? 'Checking...' : '🔄 Check Status'}
            </button>
          </div>
          
          <div className="status-indicator" style={{ borderColor: getStatusColor() }}>
            <div className="status-dot" style={{ backgroundColor: getStatusColor() }} />
            <span style={{ color: getStatusColor() }}>{status}</span>
          </div>
          
          <div className="balance-card">
            <div className="balance-label">Escrow Balance</div>
            <div className="balance-amount">{balance.toFixed(5)} BCH</div>
            <div className="balance-progress">
              <div 
                className="progress-bar" 
                style={{ width: `${(balance / product.price) * 100}%` }}
              />
            </div>
          </div>
        </div>

        <div className="payment-note">
          <p>💡 <strong>Note:</strong> This is a Bitcoin Cash testnet demonstration. 
          In production, users can scan QR code for payment.</p>
        </div>
      </div>
    </div>
  );
}