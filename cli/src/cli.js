const axios = require('axios')

class Node {
    constructor(key) {
        this.key = key;
        this.parentNode = null;
        this.children = {};
        this.isEnd = false;
    }

    getWord() {
        let word = [];
        let node = this;

        while (node !== null) {
            word.push(node.key)
            node = node.parentNode;
        }

        word.reverse()


        return word.join('');
    }
}

class Trie {
    constructor(key) {
        this.root = new Node(key);
    }

    add(word) {
        let node = this.root;

        for (let i = 0; i < word.length; i++) {
            if (!node.children[word[i]]) {
                node.children[word[i]] = new Node(word[i]);
                node.children[word[i]].parentNode = node;
            }
            node = node.children[word[i]];

            if (i == word.length - 1) {
                node.isEnd = true;
            }
        }
    }

    query(q) {
        let node = this.root;
        let output = [];

        for (let i = 0; i < q.length; i++) {
            if (node.children[q[i]]) {
                node = node.children[q[i]];
            } else {
                return output;
            }
        }

        function findQueries(node, output) {
            if (node.isEnd) {
                output.unshift(node.getWord());
            }

            for (let childNode in node.children) {
                findQueries(node.children[childNode], output);
            }
        }

        findQueries(node, output);

        return output;
    }

    queryAll() {
        return this.query('');
    }

    hasWord(word) {
        let node = this.root;

        for (let i = 0; i < word.length; i++) {
            if (node.children[word[i]]) {
                node = node.children[word[i]]
            } else {
                return false;
            }
        }

        return node.isEnd;
    }

    del(word) {
        let node = this.root;
        const output = [];

        for (let i = 0; i < word.length; i++) {
            if (node.children[word[i]]) {
                output.push(node);
                node = node.children[word[i]];
            } else {
                return null;
            }
        }

        if (Object.keys(node.children).length) {
            node.isEnd = false;
            return node;
        }

        let childNode = null;
        let parentNode = null;

        if (output.length) {
            childNode = output.pop();
            parentNode = output.pop();
        }

        while (true) {
            if (childNode && parentNode) {
                delete parentNode.children[childNode.key];
            }

            if (Object.keys(parentNode.children).length != undefined || output.length == undefined) {
                node.isEnd = false;
                return node;
            }
            childNode = parentNode;
            parentNode = output.pop();
        }
    }
}

export function cli(args) {
    let command = args[2];
    let word = args[3];
    switch (command) {
        case 'add':
            if (!word) {
                console.log('No word specified');return
            }
            let link = 'https://agile-reaches-81103.herokuapp.com/add?q=' + word;
            axios.post(link).then(function (response) {
                console.log('successfully added ' + word + ' to trie');
            }).catch(function (err) {
                console.log(err)
            })
            break;
        case 'all':
            let link2 = 'https://agile-reaches-81103.herokuapp.com/all';
            axios.get(link2).then(function (response) {
                if (response.data.length == 0) {
                    console.log('no data in trie');
                } else {
                    for (let i = 0; i < response.data.length; i++) {
                        console.log(response.data[i]);
                    }
                }
            }).catch(function (err) {
                console.log(err);
            })
            break;
        case 'delete':
            if (!word) {
                console.log('No word specified');return
            }
            let link3 = 'https://agile-reaches-81103.herokuapp.com/delete?q=' + word;
            axios.post(link3).then((res) => {
                if (res.data.message == 'word not found') {
                    console.log('word not found');
                } else {
                    console.log('successfully deleted ' + word + ' from trie');
                }
            }).catch((err) => {
                console.log(err);
            })
            break;
        case 'find':
            if (!word) {
                console.log('No word specified');return
            }
            let link4 = 'https://agile-reaches-81103.herokuapp.com/query?q=' + word;
            axios.get(link4).then((res) => {
                if (res.data.length == 0) {
                    console.log('no data in trie with suffix ' + word);
                } else {
                    for (let i = 0; i < res.data.length; i++) {
                        console.log(res.data[i]);
                    }
                }
            }).catch((err) => {
                console.log(err);
            })
            break;
        case 'has':
            if (!word) {
                console.log('No word specified');return
            }
            let link5 = 'https://agile-reaches-81103.herokuapp.com/has?q=' + word;
            axios.get(link5).then((res) => {
                console.log(res.data)
            }).catch((err) => {
                console.log(err);
            })
            break;
        case 'display':
            let link6 = 'https://agile-reaches-81103.herokuapp.com/all'
            axios.get(link6).then((res) => {
                let trie = new Trie();
                for (let word of res.data) {
                    trie.add(word);
                }
                console.log(trie.root);
            }).catch((err) => {
                console.log(err);
            })
            break;
        case '--help':
            console.log("Here is what you can do: ");
            console.log("1. Add keyword to the trie, command: trie add [keyword]");
            console.log("2. Delete keyword from the trie, command: trie delete [keyword]");
            console.log("3. search for keyword in trie, command: trie has [keyword]");
            console.log("4. Return list of autocomplete suggestion based on an input prefix, command: trie find [prefix]");
            console.log("5. Display the words in the tree, command: trie all");
            console.log("6. Display the tree, command: trie display");
            break;
    }
}