import { useState } from "react";
import { products } from "./products";
import ProductPayment from "./components/ProductPayment";
import TrackPurchase from "./components/TrackPurchase";

export default function App() {
  const [selectedProduct, setSelectedProduct] = useState(null);

  return (
    <div className="container">
      <div style={{ textAlign: "center", marginBottom: 40 }}>
        <h1 className="gradient-text">🔒 AI Escrow Store</h1>
        <p className="subtitle">Secure Bitcoin Cash Payments with Smart Escrow</p>
      </div>

      {!selectedProduct ? (
        <div>
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <h2 className="section-title">🎁 Available Products</h2>
            <p className="section-subtitle">Select a product to purchase securely</p>
          </div>
          
          <div className="products-grid">
            {products.map((product) => (
              <div key={product.id} className="product-card">
                <div className="product-icon">
                  {product.id === 1 ? "📚" : product.id === 2 ? "📝" : "⚡"}
                </div>
                <h3 className="product-name">{product.name}</h3>
                <p className="product-description">
                  {product.type === "instant" ? "Instant Delivery" : "Admin Verification Required"}
                </p>
                <div className="product-price">
                  {product.price} BCH
                </div>
                <button
                  onClick={() => setSelectedProduct(product)}
                  className="buy-button"
                >
                  Purchase Now
                </button>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <ProductPayment
          product={selectedProduct}
          onBack={() => setSelectedProduct(null)}
        />
      )}

      <div className="divider">
        <span>OR</span>
      </div>

      <TrackPurchase />
    </div>
  );
}