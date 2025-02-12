// This approach is taken from https://github.com/vercel/next.js/tree/canary/examples/with-mongodb
// This approach is taken from https://github.com/vercel/next.js/tree/canary/examples/with-mongodb
import { MongoClient } from "mongodb";

if (!process.env.MONGODB_URL) {
  throw new Error('Invalid/Missing environment variable: "MONGODB_URL"');
}

const uri = process.env.MONGODB_URL;

const options = {};

let client;
let clientPromise;

if (process.env.NODE_ENV === "development") {
  // Giữ kết nối MongoDB trong bộ nhớ để tránh tạo lại nhiều lần
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  // Trong production, mỗi request có một kết nối riêng
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default clientPromise;
