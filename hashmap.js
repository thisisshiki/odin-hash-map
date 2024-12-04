export class HashMap {
  constructor(loadFactor = 0.75, initialCapacity = 16) {
    // Load factor determines when to resize the hash table
    this.loadFactor = loadFactor;
    // Initial capacity of the hash table
    this.capacity = initialCapacity;
    // Number of key-value pairs in the hash table
    this.size = 0;
    // Array of buckets, each bucket is an array to handle collisions
    this.buckets = Array(this.capacity).fill(null).map(() => []);
  }

  // Hash function to convert a string key into a hash code
  hash(key) {
    let hashCode = 0;
    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = primeNumber * hashCode + key.charCodeAt(i);
      hashCode = hashCode % this.capacity; // Apply modulo to avoid overflow
    }
    return hashCode;
  }

  // Method to set a key-value pair in the hash table
  set(key, value) {
    const index = this.hash(key);
    if (index < 0 || index >= this.buckets.length) {
      throw new Error("Trying to access index out of bounds");
    }

    const bucket = this.buckets[index];
    // Check if the key already exists in the bucket
    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i][0] === key) {
        bucket[i][1] = value; // Update the value if key exists
        return;
      }
    }

    // If key does not exist, add a new key-value pair
    bucket.push([key, value]);
    this.size++;

    // Resize the hash table if the load factor is exceeded
    if (this.size / this.capacity > this.loadFactor) {
      this.resize();
    }
  }

  // Method to get the value associated with a key
  get(key) {
    const index = this.hash(key);
    if (index < 0 || index >= this.buckets.length) {
      throw new Error("Trying to access index out of bounds");
    }

    const bucket = this.buckets[index];
    // Search for the key in the bucket
    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i][0] === key) {
        return bucket[i][1]; // Return the value if key is found
      }
    }
    return null; // Return null if key is not found
  }

  // Method to check if a key exists in the hash table
  has(key) {
    return this.get(key) !== null;
  }

  // Method to remove a key-value pair from the hash table
  remove(key) {
    const index = this.hash(key);
    if (index < 0 || index >= this.buckets.length) {
      throw new Error("Trying to access index out of bounds");
    }

    const bucket = this.buckets[index];
    // Search for the key in the bucket
    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i][0] === key) {
        bucket.splice(i, 1); // Remove the key-value pair if key is found
        this.size--;
        return true;
      }
    }
    return false; // Return false if key is not found
  }

  // Method to get the number of key-value pairs in the hash table
  length() {
    return this.size;
  }

  // Method to clear the hash table
  clear() {
    this.buckets = Array(this.capacity).fill(null).map(() => []); // Reset the buckets
    this.size = 0; // Reset the size
  }

  // Method to get all keys in the hash table
  keys() {
    const keysArray = [];
    for (const bucket of this.buckets) {
      for (const [key] of bucket) {
        keysArray.push(key); // Collect all keys
      }
    }
    return keysArray;
  }

  // Method to get all values in the hash table
  values() {
    const valuesArray = [];
    for (const bucket of this.buckets) {
      for (const [, value] of bucket) {
        valuesArray.push(value); // Collect all values
      }
    }
    return valuesArray;
  }

  // Method to get all key-value pairs in the hash table
  entries() {
    const entriesArray = [];
    for (const bucket of this.buckets) {
      for (const [key, value] of bucket) {
        entriesArray.push([key, value]); // Collect all key-value pairs
      }
    }
    return entriesArray;
  }

  // Method to resize the hash table when the load factor is exceeded
  resize() {
    const oldBuckets = this.buckets;
    this.capacity *= 2; // Double the capacity
    this.buckets = Array(this.capacity).fill(null).map(() => []); // Create new buckets
    this.size = 0; // Reset the size

    // Rehash all key-value pairs into the new buckets
    for (const bucket of oldBuckets) {
      for (const [key, value] of bucket) {
        this.set(key, value);
      }
    }
  }

  // Method to print the contents of the hash table
  print() {
    console.log("HashMap contents:");
    for (let i = 0; i < this.buckets.length; i++) {
      const bucket = this.buckets[i];
      if (bucket.length > 0) {
        console.log(`Bucket ${i}:`, bucket);
      }
    }
  }
}