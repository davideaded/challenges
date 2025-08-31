const graph = new Map();
graph.set('david', ['alice', 'bob', 'claire']);
graph.set('bob', ['anuj', 'peggy']);
graph.set('alice', ['peggy']);
graph.set('claire', ['thor', 'jonny']);
graph.set('anuj', []);
graph.set('peggy', []);
graph.set('thor', []);
graph.set('jonny', []);

// breadth first search. find the shortest path between two nodes, if there is one
function bfsGraph(graph, source, action) {
    const queue = graph.get(source);
    const searched = new Set();
    let turnCount = 0;

    while (queue[0] !== undefined) {
        turnCount++;
        const item = queue.shift();
        if (searched.has(item)) continue;
        if (action(item)) {
            console.log(item, 'is the target');
            console.log('done in ', turnCount, 'turns');
            return true;
        } else {
            console.log(item, 'is not the target');
            searched.add(item);
            const itemAdjacents = graph.get(item);
            Array.isArray(itemAdjacents) ? queue.push(...itemAdjacents) : queue.push(itemAdjacents);
        }
    }
    console.log('done in ', turnCount, 'turns');

    return false;
}

bfsGraph(graph, 'david', p => p.at(-1) === 'm');
