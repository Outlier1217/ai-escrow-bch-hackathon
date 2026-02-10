export default function ProductCard({ product, onBuy }) {
  const getProductIcon = () => {
    switch (product.id) {
      case 1: return "📚";
      case 2: return "📝";
      case 3: return "⚡";
      default: return "🎁";
    }
  };

  return (
    <div className="product-card-alt">
      <div className="product-badge">
        {product.type === "instant" ? "⚡ Instant" : "🛡️ Escrow"}
      </div>
      
      <div className="product-icon-alt">
        {getProductIcon()}
      </div>
      
      <h3 className="product-title">{product.name}</h3>
      
      <p className="product-desc">
        {product.description || "Secure digital product"}
      </p>
      
      <div className="product-footer">
        <div className="price-container">
          <span className="price-amount">{product.price}</span>
          <span className="price-unit">BCH</span>
        </div>
        
        <button
          onClick={() => onBuy(product)}
          className="buy-button-alt"
        >
          Purchase Now
        </button>
      </div>
    </div>
  );
}