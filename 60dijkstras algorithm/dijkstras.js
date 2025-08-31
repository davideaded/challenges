// dijkstras algorithm
// weightened graph

// setup
const wgraph = {
    start: { a: 6, b: 2 },
    a: { fin: 1 },
    b: { a: 3, fin: 5 },
    fin: {}
};

function findLowestCostNode(costs, processed) {
    let lowestCost = Infinity;
    let lowestCostNode = null;

    for (const node in costs) {
        const cost = costs[node];
        if (cost < lowestCost && !processed.has(node)) {
            lowestCost = cost;
            lowestCostNode = node;
        }
    }
    return lowestCostNode;
}

function createCostsObj(graph, start) {
    const costs = {};
    for (const node in graph) {
        if (node === start) continue;
        costs[node] = graph[start][node] ?? Infinity;
    }

    return costs;
}

function createParentObj(graph, start) {
    const parent = {};
    for (const node in graph[start]) {
        parent[node] = start;
    }

    return parent;
}

function dijkstra(wgraph, start) {
    const costs = createCostsObj(wgraph, start);
    const parent = createParentObj(wgraph, start);
    const processed = new Set();

    let node = findLowestCostNode(costs, processed);

    while (node) {
        const cost = costs[node];
        const neighbors = wgraph[node];

        for (const n of Object.keys(neighbors)) {
            const newCost = cost + neighbors[n];
            if (newCost < costs[n]) {
                costs[n] = newCost;
                parent[n] = node;
            }
        }

        processed.add(node);
        node = findLowestCostNode(costs, processed);
    }

    return { costs, parent };
}

// const result = dijkstra(wgraph, "start");
// console.log(result);

// exercises
// A
const exa = {
    start: { a: 5, b: 2 },
    a: { c: 4, d: 2 },
    b: { a: 8, d: 7 },
    c: { fin: 3, d: 6 },
    d: { fin: 1 },
    fin: {}
};
const eA = dijkstra(exa, 'start');
console.log(eA);

// B
const exb = {
    start: { a: 10 },
    a: { c: 20 },
    b: { a: 1 },
    c: { b: 1, fin: 30 },
    fin: {},
}
const eB = dijkstra(exb, 'start');
console.log(eB);

// C
const exc = {
    start: { a: 2, b: 2 },
    a: { fin: 2, c: 2 },
    b: { c: 2 },
    c: { b: -1, fin: 2 },
    fin: {}
}
const eC = dijkstra(exc, 'start');
console.log(eC);