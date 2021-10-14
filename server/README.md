# Server

## How it is Hosted
My server is hosted at [this](https://agile-reaches-81103.herokuapp.com) link and uses heroku as a cloud service for hosting

## How my CLI interacts with my server
I have created endpoints on my server which is used to extract information regarding the trie

my endpoints are:

### GET
`host`/all --> gets all the words in the trie <br />
`host`/query?q={word} --> displays list of autocomplete suggestion based on input prefix <br />
`host`/has?q={word} --> Searches for keyword in tree and returns if the keyword is present or not <br />
`host`/display --> displays the tree


### POST
`host`/add --> adds a keyword to trie<br />
`host`/delete --> deletes a keyword from trie<br />
