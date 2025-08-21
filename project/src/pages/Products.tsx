import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { mockProducts } from "../mockData";
import ProductCard from "../components/ProductCard";
import { Filter, Grid, List } from "lucide-react";
import { useCart } from "../context/CartContext";

const Products: React.FC = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get("search") || "";

  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedCondition, setSelectedCondition] = useState("all");
  const [sortBy, setSortBy] = useState("name");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const { addToCart } = useCart();

  const categories = ["all", ...Array.from(new Set(mockProducts.map((p) => p.category)))];
  const conditions = ["all", ...Array.from(new Set(mockProducts.map((p) => p.condition)))];

  const filteredProducts = mockProducts
    .filter(
      (product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter((product) => selectedCategory === "all" || product.category === selectedCategory)
    .filter((product) => selectedCondition === "all" || product.condition === selectedCondition)
    .sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "name":
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });

  return (
    <div className="products-page py-5">
      <div className="container">
        {/* Page Header */}
        <div className="row mb-4">
          <div className="col-12">
            <h1 className="display-5 fw-bold mb-2">All Products</h1>
            <p className="lead text-muted">Discover amazing deals on quality pre-owned items</p>
          </div>
        </div>

        {/* Filters */}
        <div className="row mb-4">
          <div className="col-12">
            <div className="card border-0 shadow-sm">
              <div className="card-body">
                <div className="row g-3 align-items-center">
                  {/* Category Filter */}
                  <div className="col-lg-3 col-md-6">
                    <select
                      className="form-select"
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                    >
                      {categories.map((category) => (
                        <option key={category} value={category}>
                          {category === "all" ? "All Categories" : category}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Condition Filter */}
                  <div className="col-lg-3 col-md-6">
                    <select
                      className="form-select"
                      value={selectedCondition}
                      onChange={(e) => setSelectedCondition(e.target.value)}
                    >
                      {conditions.map((condition) => (
                        <option key={condition} value={condition}>
                          {condition === "all" ? "All Conditions" : condition}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Sort */}
                  <div className="col-lg-3 col-md-6">
                    <select
                      className="form-select"
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                    >
                      <option value="name">Sort by Name</option>
                      <option value="price-low">Price: Low to High</option>
                      <option value="price-high">Price: High to Low</option>
                    </select>
                  </div>

                  {/* View Mode */}
                  <div className="col-lg-3 col-md-6">
                    <div className="btn-group w-100" role="group">
                      <button
                        type="button"
                        className={`btn ${viewMode === "grid" ? "btn-primary" : "btn-outline-primary"}`}
                        onClick={() => setViewMode("grid")}
                      >
                        <Grid size={16} />
                      </button>
                      <button
                        type="button"
                        className={`btn ${viewMode === "list" ? "btn-primary" : "btn-outline-primary"}`}
                        onClick={() => setViewMode("list")}
                      >
                        <List size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="row mb-3">
          <div className="col-12">
            <p className="text-muted mb-0">
              Showing {filteredProducts.length} of {mockProducts.length} products
            </p>
          </div>
        </div>

        {/* Products Grid */}
        <div className="row g-4">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <div
                key={product.id}
                className={viewMode === "grid" ? "col-lg-3 col-md-6" : "col-12"}
              >
                <ProductCard
                  product={{
                    ...product,
                    price: product.price,
                  }}
                  onAddToCart={() =>
                    addToCart({
                      id: product.id,
                      name: product.name,
                      price: product.price,
                      image: product.image,
                    })
                  }
                />
              </div>
            ))
          ) : (
            <div className="col-12">
              <div className="text-center py-5">
                <p className="text-muted mb-4">No products found</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;
