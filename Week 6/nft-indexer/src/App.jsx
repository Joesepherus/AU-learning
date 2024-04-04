import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  Image,
  Input,
  SimpleGrid,
  Text,
  Spinner,
} from "@chakra-ui/react";
import { Alchemy, Network } from "alchemy-sdk";
import { useState, useEffect } from "react";
import { ethers } from "ethers";

const provider = new ethers.providers.Web3Provider(window.ethereum);

function App() {
  const [userAddress, setUserAddress] = useState("");
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [signer, setSigner] = useState();
  console.log("signer: ", signer);

  const [tokenDataObjects, setTokenDataObjects] = useState([]);

  useEffect(() => {
    async function initMetaMask() {
      if (window.ethereum) {
        try {
          // Request access to MetaMask accounts
          console.log("hi");
          setIsLoading(true);
          const accounts = await provider.send("eth_requestAccounts", []);
          setIsLoading(false);

          console.log("accounts: ", accounts);

          setSigner(provider.getSigner());
          setUserAddress(accounts[0]);
          console.log("MetaMask successfully connected");
        } catch (error) {
          console.error("Error connecting to MetaMask:", error);
        }
      } else {
        console.error("MetaMask not found");
        setIsLoading(false);
      }
    }

    initMetaMask();
  }, []);

  console.log("import.meta.env: ", import.meta.env);
  async function getNFTsForOwner() {
    setTokenDataObjects([])
    setResults([])
    try {
      const config = {
        apiKey: import.meta.env.VITE_REACT_APP_ALCHEMY_API_KEY,
        network: Network.ETH_MAINNET,
      };

      const alchemy = new Alchemy(config);
      setIsLoading(true);

      const data = await alchemy.nft.getNftsForOwner(userAddress);
      setIsLoading(false);

      console.log("data: ", data);
      setResults(data);

      const tokens = [];
      for (let i = 0; i < data.ownedNfts.length; i++) {
        tokens.push({
          tokenId: data.ownedNfts[i].tokenId,
          contractAddress: data.ownedNfts[i].contract.address,
        });
      }
      const tokenData = await alchemy.nft.getNftMetadataBatch(tokens);
      console.log("tokenData: ", tokenData);

      setTokenDataObjects(tokenData);
    } catch (error) {
      setIsLoading(false);
    }
  }
  return (
    <Box w="100vw">
      <Center>
        <Flex
          alignItems={"center"}
          justifyContent="center"
          flexDirection={"column"}
        >
          <Heading mb={0} fontSize={36}>
            NFT Indexer 🖼
          </Heading>
          <Text>
            Plug in an address and this website will return all of its NFTs!
          </Text>
        </Flex>
      </Center>
      <Flex
        w="100%"
        flexDirection="column"
        alignItems="center"
        justifyContent={"center"}
      >
        <Heading mt={42}>Get all the ERC-721 tokens of this address:</Heading>
        <Input
          onChange={(e) => setUserAddress(e.target.value)}
          value={userAddress}
          color="black"
          w="600px"
          textAlign="center"
          p={4}
          bgColor="white"
          fontSize={24}
        />
        <Button fontSize={20} onClick={getNFTsForOwner} mt={36} bgColor="blue">
          Fetch NFTs
        </Button>

        <Heading my={36}>Here are your NFTs:</Heading>

        {!isLoading ? (
          results?.ownedNfts?.length > 0 ? (
            <SimpleGrid w={"90vw"} columns={4} spacing={24}>
              {results.ownedNfts.map((e, i) => {
                return (
                  <Flex
                    flexDir={"column"}
                    color="white"
                    bg="blue"
                    w={"20vw"}
                    key={e.id}
                  >
                    <Image
                      src={
                        tokenDataObjects[i]?.rawMetadata?.image ??
                        "https://via.placeholder.com/200"
                      }
                      alt={"Image"}
                    />
                    <Box>
                      <b>Name:</b>{" "}
                      {tokenDataObjects[i]?.title?.length === 0
                        ? "No Name"
                        : tokenDataObjects[i]?.title}
                    </Box>
                  </Flex>
                );
              })}
            </SimpleGrid>
          ) : null
        ) : (
          <Spinner width="50px" height="50px" />
        )}
      </Flex>
    </Box>
  );
}

export default App;
