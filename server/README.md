# Server

## How it is Hosted
My server is hosted at [this](https://agile-reaches-81103.herokuapp.com) link and uses heroku as a cloud service for hosting

## How my CLI interacts with my server
I have created endpoints on my server which is used by my CLI to extract information regarding the trie

my endpoints are with the respective commands to send a request to them are:

### GET
`host`/all --> gets all the words in the trie <br />
```bash
$ curl -X GET https://agile-reaches-81103.herokuapp.com/all
```
`host`/query?q={word} --> displays list of autocomplete suggestion based on input prefix <br />
```bash
$ curl -X GET https://agile-reaches-81103.herokuapp.com/query?q={word}
```
`host`/has?q={word} --> Searches for keyword in tree and returns if the keyword is present or not <br />
```bash
$ curl -X GET https://agile-reaches-81103.herokuapp.com/has?q={word}
```
`host`/display --> displays the tree
```bash
$ curl -X GET https://agile-reaches-81103.herokuapp.com/display
```

### POST
`host`/add?q={word} --> adds a keyword to trie<br />
```bash
$ curl -X POST https://agile-reaches-81103.herokuapp.com/add?q={word}
```
`host`/delete?q={word} --> deletes a keyword from trie<br />
```bash
$ curl -X POST https://agile-reaches-81103.herokuapp.com/delete?q={word}
```
