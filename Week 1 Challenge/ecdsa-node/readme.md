## Thoughts
Damn I found it hard to figure out which library to use for the encryption/decryption and signing of the transactions.
In the end I used js-sha3 and elliptic and secp256k1. Then I watch the walkthrough video and I see that I should have used ethereum-cryptography library instead.😅 Oh well...

I created 5 demo accounts, they are stored in server/accounts.js, also there are stored private keys of those accounts in accountsWithPrivateKey constant. But not to be on the server, but just for ease of use. In real application each account would have their private key stored somewhere safe. So the BE nor FE know about these private keys. This keeps it secure.
On FE I hash the message with keccak256 and sign the message with secp256k1 using the private key provided in an input in component Transfer just before calling the send endpoint.
And the BE I do some input checks for if the addreses provided exist and then I get the public key from the signature and hash, then I compare the recovered public key to the sender public key and if they are matching I proceed to update the balances accordingly and sending a successful message to the FE. Otherwise send error message to FE. 

## ECDSA Node

This project is an example of using a client and server to facilitate transfers between different addresses. Since there is just a single server on the back-end handling transfers, this is clearly very centralized. We won't worry about distributed consensus for this project.

However, something that we would like to incoporate is Public Key Cryptography. By using Elliptic Curve Digital Signatures we can make it so the server only allows transfers that have been signed for by the person who owns the associated address.

### Video instructions
For an overview of this project as well as getting started instructions, check out the following video:

https://www.loom.com/share/0d3c74890b8e44a5918c4cacb3f646c4
 
### Client

The client folder contains a [react app](https://reactjs.org/) using [vite](https://vitejs.dev/). To get started, follow these steps:

1. Open up a terminal in the `/client` folder
2. Run `npm install` to install all the depedencies
3. Run `npm run dev` to start the application 
4. Now you should be able to visit the app at http://127.0.0.1:5173/

### Server

The server folder contains a node.js server using [express](https://expressjs.com/). To run the server, follow these steps:

1. Open a terminal within the `/server` folder 
2. Run `npm install` to install all the depedencies 
3. Run `node index` to start the server 

The application should connect to the default server port (3042) automatically! 

_Hint_ - Use [nodemon](https://www.npmjs.com/package/nodemon) instead of `node` to automatically restart the server on any changes.
