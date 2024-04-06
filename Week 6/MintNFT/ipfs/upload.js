async function run() {
    const { create } = await import('ipfs-http-client');
    const ipfs = await create();
    
    // we added three attributes, add as many as you want!
    const metadata = {
        path: '/',
        content: JSON.stringify({
            name: "Joes Experiences NFT",
            attributes: [
            {
                "trait_type": "Hard",
                "value": "10" 
            },
            {
                "trait_type": "Work",
                "value": "100"
            },
            {
                "trait_type": "Beats",
                "value": "1000"
            },
            {
                "trait_type": "Talent",
                "value": "1000"
            },
            {
                "trait_type": "Every",
                "value": "1000"
            },
            {
                "trait_type": "Time",
                "value": "1000"
            }
            ],
            // update the IPFS CID to be your image CID
            image: "https://ipfs.io/ipfs/QmPVBXy78grnd4YHMsqaTYZ86AfN16cC1cZY9kLqHsL9cZ",
            description: "So much Hard Work!"
        })
    };

    const result = await ipfs.add(metadata);
    console.log(result);

    process.exit(0);
}

run();