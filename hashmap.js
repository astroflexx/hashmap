function hashMap() {
    let capacity = 16;
    let LOAD_FACTOR = 0.75;
    let load = 0;

    let hashmap = Array(capacity)
        .fill(null)
        .map(() => []);

    function hash(key) {
        let hashCode = 0;

        const primeNumber = 31;
        for (let i = 0; i < key.length; i++) {
            hashCode = primeNumber * hashCode + key.charCodeAt(i);
            hashCode %= capacity;
        }

        if (hashCode < 0 || hashCode >= capacity) {
            throw new Error("Generated hash is out of bounds!");
        }

        return hashCode;
    }

    function set(key, value) {
        const generatedHash = hash(key);

        const collision = hashmap[generatedHash].findIndex(
            (element) => element.key === key
        );

        if (collision === -1) {
            hashmap[generatedHash].push({ key, value });
        } else {
            hashMap[generatedHash][collision].value = value;
        }

        load++;

        if (load === LOAD_FACTOR * capacity) {
            increaseCapacity();
        }
    }

    function get(key) {
        const hashedKey = hash(key);

        return hashmap[hashedKey].find((element) => element.key === key).value;
    }

    function has(key) {
        const hashedKey = hash(key);

        return (
            hashMap[hashedKey].findIndex((element) => element.key === key) !== -1
        );
    }

    function remove(key) {
        if (!has(key)) {
            return false;
        }

        const hashedKey = hash(key);

        const index = hashMap[hashedKey].findIndex(
            (element) => element.key === key
        );

        hashMap[hashedKey].splice(index, 1);

        return true;
    }

    function length() {
        return hashmap.reduce((accumulated, current) => accumulated + current.length, 0);
    }

    function clear() {
        hashmap.map(() => []);
    }

    function keys() {
        return hashmap.reduce(
            (accumulated, current) =>
                accumulated.concat(
                    current.reduce(
                        (accumulatedKeys, currentCell) =>
                            accumulatedKeys.concat(currentCell.key),
                        []
                    )
                ),
            []
        );
    }

    function values() {
        return hashmap.reduce(
            (accumulated, current) =>
                accumulated.concat(
                    current.reduce(
                        (accumulatedKeys, currentCell) =>
                            accumulatedKeys.concat(currentCell.value),
                        []
                    )
                ),
            []
        );
    }

    function entries() {
        return hashMap.reduce(
            (accumulated, current) =>
                accumulated.concat(
                    current.reduce(
                        (accumulatedEntries, currentCell) =>
                            accumulatedEntries.concat(currentCell),
                        []
                    )
                ),
            []
        );
    }

    function increaseCapacity() {

        const oldEntries = entries();
        capacity *= 2;

        hashmap = Array(capacity)
            .fill(null)
            .map(() => []);

        oldEntries.forEach((entry) => {
            set(entry.key, entry.value)
        });
    }

    return {
        set,
        get,
        has,
        remove,
        length,
        clear,
        keys,
        values,
        entries,
    };
}

export default hashMap;