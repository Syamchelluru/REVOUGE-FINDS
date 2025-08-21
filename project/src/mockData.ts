export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  condition: 'New' | 'Used' | 'Like New';
  description: string;
  category: string;
  seller: string;
  badge?: 'New' | 'Discount' | 'Popular';
}

export interface Category {
  id: number;
  name: string;
  image: string;
  count: number;
}

export const mockProducts: Product[] = [
  {
    id: 1,
    name: "Vintage Leather Jacket",
    price: 89.99,
    image: "https://images.pexels.com/photos/1124465/pexels-photo-1124465.jpeg?auto=compress&cs=tinysrgb&w=400",
    condition: "Like New",
    description: "Classic vintage leather jacket in excellent condition. Perfect for casual outings and adds a stylish edge to any outfit.",
    category: "Fashion",
    seller: "John Doe",
    badge: "Popular"
  },
  {
    id: 2,
    name: "MacBook Pro 2019",
    price: 899.99,
    image: "https://images.pexels.com/photos/18105/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=400",
    condition: "Used",
    description: "MacBook Pro 13-inch from 2019, 8GB RAM, 256GB SSD. Good working condition with minor wear on the keyboard.",
    category: "Electronics",
    seller: "Tech Store",
    badge: "Discount"
  },
  {
    id: 3,
    name: "Designer Handbag",
    price: 149.99,
    image: "https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=400",
    condition: "New",
    description: "Brand new designer handbag with tags. Elegant design perfect for formal occasions.",
    category: "Fashion",
    seller: "Fashion Hub",
    badge: "New"
  },
  {
    id: 4,
    name: "Gaming Chair",
    price: 199.99,
    image: "https://images.pexels.com/photos/4050291/pexels-photo-4050291.jpeg?auto=compress&cs=tinysrgb&w=400",
    condition: "Used",
    description: "Comfortable gaming chair with lumbar support. Used for 6 months, still in great condition.",
    category: "Furniture",
    seller: "Gamer Pro"
  },
  {
    id: 5,
    name: "Smartphone iPhone 12",
    price: 599.99,
    image: "https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg?auto=compress&cs=tinysrgb&w=400",
    condition: "Like New",
    description: "iPhone 12 in excellent condition. No scratches, comes with original box and accessories.",
    category: "Electronics",
    seller: "Mobile World",
    badge: "Popular"
  },
  {
    id: 6,
    name: "Classic Novel Collection",
    price: 29.99,
    image: "https://images.pexels.com/photos/1130980/pexels-photo-1130980.jpeg?auto=compress&cs=tinysrgb&w=400",
    condition: "Used",
    description: "Collection of 10 classic novels in good condition. Perfect for book lovers.",
    category: "Books",
    seller: "Book Lover"
  },
  {
    id: 7,
    name: "Wooden Coffee Table",
    price: 299.99,
    image: "https://images.pexels.com/photos/1866149/pexels-photo-1866149.jpeg?auto=compress&cs=tinysrgb&w=400",
    condition: "Like New",
    description: "Beautiful wooden coffee table, handcrafted with premium wood. Barely used.",
    category: "Furniture",
    seller: "Wood Craft"
  },
  {
    id: 8,
    name: "Vintage Camera",
    price: 249.99,
    image: "https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&w=400",
    condition: "Used",
    description: "Vintage film camera in working condition. Great for photography enthusiasts.",
    category: "Electronics",
    seller: "Photo Studio",
    badge: "Discount"
  }
];

export const categories: Category[] = [
  {
    id: 1,
    name: "Electronics",
    image: "https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg?auto=compress&cs=tinysrgb&w=400",
    count: 45
  },
  {
    id: 2,
    name: "Fashion",
    image: "https://images.pexels.com/photos/934070/pexels-photo-934070.jpeg?auto=compress&cs=tinysrgb&w=400",
    count: 89
  },
  {
    id: 3,
    name: "Furniture",
    image: "https://images.pexels.com/photos/1866149/pexels-photo-1866149.jpeg?auto=compress&cs=tinysrgb&w=400",
    count: 32
  },
  {
    id: 4,
    name: "Books",
    image: "https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=400",
    count: 67
  },
  {
    id: 5,
    name: "Sports",
    image: "https://images.pexels.com/photos/1752757/pexels-photo-1752757.jpeg?auto=compress&cs=tinysrgb&w=400",
    count: 28
  },
  {
    id: 6,
    name: "Home & Garden",
    image: "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=400",
    count: 41
  }
];