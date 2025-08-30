// graph
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

// bfsGraph(graph, 'david', p => p.at(-1) === 'm');

// dijkstras algorithm
// weightened graph

// setup
const wgraph = new Map();
wgraph.set('start', { 'a': 6, 'b': 2 });
wgraph.set('a', { 'fin': 1 });
wgraph.set('b', { 'a': 3, 'fin': 5 });
wgraph.set('fin', {});

const getEdgeWeight = ({ a, b }) => [a, b];

const costGraph = new Map();
costGraph.set('a', 6);
costGraph.set('b', 2);
costGraph.set('fin', Infinity);

const parentGraph = new Map();
parentGraph.set('a', 'start');
parentGraph.set('b', 'start');
parentGraph.set('fin', null);

const processed = new Set();
// end setup

function algo(costs) {
    const node = findLowestCostNode(costs);

    while(node) {
        const cost = costGraph[node];
        const neighboors = graph[node];

        for (const n of neighboors.keys().next().value) {
            const newCost = cost + neighboors[n];

            if (costs[n] > newCost) {
                costs[n] = newCost;
                parentGraph[n] = node;
            }
        }
        processed.add(node);
        node = findLowestCostNode(costs);
    }

}