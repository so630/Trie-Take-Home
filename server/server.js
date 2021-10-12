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

const express = require('express');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/TrieDB')

const trieSchema = mongoose.Schema({
    words: Array
})

const TrieModel = mongoose.model('Trie', trieSchema);

const app = express();
let trie = new Trie();

app.post('/add', function (req, res) {
    let word = req.query.q;
    trie.add(word);
    res.sendStatus(200);
})

app.get('/query', function (req, res) {
    let query = req.query.q;
    res.json(trie.query(query)); 
})

app.get('/all', function(req, res) {
    res.json(trie.queryAll());
})

app.get('/has', function (req, res) {
    let query = req.query.q;
    res.json(trie.hasWord(query))
})

app.post('/delete', function (req, res) {
    let query = req.query.q;
    let result = trie.del(query);
    console.log(result == null);
    if (result == null) {
        res.json({message: 'word not found'})
    } else {
        res.sendStatus(200);
    }
})

app.listen(3000 || process.env.PORT);