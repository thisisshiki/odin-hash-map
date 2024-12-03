export class HashMap {
  constructor(loadFactor = 0.75, initialCapacity = 16) {
    this.loadFactor = loadFactor;
    this.capacity = initialCapacity;
    this.size = 0;
    this.buckets = Array(this.capacity).fill(null).map(() => []);
  }

  hash(key) {
    let hashCode = 0;
    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = primeNumber * hashCode + key.charCodeAt(i);
      hashCode = hashCode % this.capacity; // Apply modulo to avoid overflow
    }
    return hashCode;
  }

  set(key, value) {
    const index = this.hash(key);
    if (index < 0 || index >= this.buckets.length) {
      throw new Error("Trying to access index out of bounds");
    }

    const bucket = this.buckets[index];
    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i][0] === key) {
        bucket[i][1] = value;
        return;
      }
    }

    bucket.push([key, value]);
    this.size++;

    if (this.size / this.capacity > this.loadFactor) {
      this.resize();
    }
  }

  get(key) {
    const index = this.hash(key);
    if (index < 0 || index >= this.buckets.length) {
      throw new Error("Trying to access index out of bounds");
    }

    const bucket = this.buckets[index];
    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i][0] === key) {
        return bucket[i][1];
      }
    }
    return null;
  }

  has(key) {
    return this.get(key) !== null;
  }

  remove(key) {
    const index = this.hash(key);
    if (index < 0 || index >= this.buckets.length) {
      throw new Error("Trying to access index out of bounds");
    }

    const bucket = this.buckets[index];
    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i][0] === key) {
        bucket.splice(i, 1);
        this.size--;
        return true;
      }
    }
    return false;
  }

  length() {
    return this.size;
  }

  clear() {
    this.buckets = Array(this.capacity).fill(null).map(() => []);
    this.size = 0;
  }

  keys() {
    const keysArray = [];
    for (const bucket of this.buckets) {
      for (const [key] of bucket) {
        keysArray.push(key);
      }
    }
    return keysArray;
  }

  values() {
    const valuesArray = [];
    for (const bucket of this.buckets) {
      for (const [, value] of bucket) {
        valuesArray.push(value);
      }
    }
    return valuesArray;
  }

  entries() {
    const entriesArray = [];
    for (const bucket of this.buckets) {
      for (const [key, value] of bucket) {
        entriesArray.push([key, value]);
      }
    }
    return entriesArray;
  }

  resize() {
    const oldBuckets = this.buckets;
    this.capacity *= 2;
    this.buckets = Array(this.capacity).fill(null).map(() => []);
    this.size = 0;

    for (const bucket of oldBuckets) {
      for (const [key, value] of bucket) {
        this.set(key, value);
      }
    }
  }
}
