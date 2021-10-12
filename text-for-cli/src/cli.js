const axios = require('axios')

export function cli(args) {
    let command = args[2];
    let word = args[3];
    switch (command) {
        case 'add':
            let link = 'http://localhost:3000/add?q=' + word;
            axios.post(link).then(function (response) {
                console.log('successfully added ' + word + ' to trie');
            }).catch(function (err) {
                console.log(err)
            })
            break;
        case 'all':
            let link2 = 'http://localhost:3000/all';
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
            let link3 = 'http://localhost:3000/delete?q=' + word;
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
            let link4 = 'http://localhost:3000/query?q=' + word;
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
            let link5 = 'http://localhost:3000/has?q=' + word;
            axios.get(link5).then((res) => {
                console.log(res.data)
            }).catch((err) => {
                console.log(err);
            })
            break;
        case '--help':
            console.log("Here is what you can do: ");
            console.log("1. Add keyword to the trie, command: trie add [keyword]");
            console.log("2. Delete keyword from the trie, command: trie del [keyword]");
            console.log("3. search for keyword in trie, command: trie has [keyword]");
            console.log("4. Return list of autocomplete suggestion based on an input prefix, command: trie query [prefix]");
            console.log("5. Display the words in the tree, command: trie display");
            console.log("6. Quit, command: trie quit");
    }
}