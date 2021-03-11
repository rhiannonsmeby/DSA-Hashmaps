//hash tables are used to store key:value pairs- fast for adding, finding, and removing

/**
 * the hash part: in order to lookup values by key we need a way to convert keys
 * into valid array indicies- a hash function
 * A good hash function:
 * - is constant time
 * - doesnt cluster outputs at specific indicies, but distributes uniformly
 * - deterministic (same input yeilds same output)
 */
function hash(key, arraylen) {
    let total = 0;
    let weird_prime = 31;
    for (let i = 0; i < Math.min(key.length, 100); i++) {
        let char = key[i]
        let value = char.charCodeAt(0) - 96
        total = (total * weird_prime + value) % arraylen;
    }
    return total;
}

/**
 * Handling collisions:
 * 1. Seperate chaining:
 * - store the pieces of data at the same spot, using another nested data structure
 * like an array or linked list so we can store multiple key:value pairs at the 
 * same index
 * 2. Linear probing:
 * - only store one piece of data at eash position, when there is a collision,
 * we search through the array to find the next empty slot, allows us to store 
 * a single key:value pair at each index- no nested structure
 */
class HashTable {
    constructor(size=53) {
        this.keyMap = new Array(size);
    }
    _hash(key) {
        let total = 0;
        let weird_prime = 31;
        for (let i = 0; i < Math.min(key.length, 100); i++) {
            let char = key[i];
            let value = char.charCodeAt(0) - 96
            total = (total * weird_prime + value) % this.keyMap.length;
        }
        return total;
    }
    //set
    //accepts a key and value
    //hashes the key
    // stores the key:value pair in the hash table array via seperate chaining
    set(key, value) {
        let index = this._hash(key);
        if(!this.keyMap[index]) {
            this.keyMap[index] = [];
        }
        this.keyMap[index].push([key, value]);
    }
    //get
    //accepts a key
    //hashes the key
    //retrieves the key:value pair in the hash table 
    //if the key isn't found, return undefined
    get(key) {
        let index = this._hash(key);
        if (this.keyMap[index]) {
            for (let i = 0; i < this.keyMap[index].length; i++) {
                if (this.keyMap[index][i][0] === key) {
                    return this.keyMap[index][i][1]
                }
            }
        }
        return undefined
    }
    //Hash table keys and values
    //Keys:
    //loops through the hash table array and returns an array of keys in the table
    keys() {
        let keysArr = [];
        for (let i = 0; i < this.keyMap.length; i++) {
            if (this.keyMap[i]) {
                for (let j = 0; j < this.keyMap[i].length; j++) {
                    if (!keysArr.includes(this.keyMap[i][j][0])) {
                        keysArr.push(this.keyMap[i][j][0])
                    }
                }
            }
        }
        return keysArr;
    }
    //Values:
    //loops through the hash table array and returns an array of all the values in
    //the table *just return unique
    values() {
        let valuesArr = [];
        for (let i = 0; i < this.keyMap.length; i++) {
            if (this.keyMap[i]) {
                for (let j = 0; j < this.keyMap[i].length; j++) {
                    if (!valuesArr.includes(this.keyMap[i][j][1])) {
                        valuesArr.push(this.keyMap[i][j][1])
                    }
                }
            }
            return valuesArr;
        }
    }
}