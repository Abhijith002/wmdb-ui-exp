# Governance and WMDB DAO User Interface

This is a front end application for [`WMDB DAO`](https://github.com/Abhijith002/WMDB) an on-chain governance movie database platform.

Check it Out: <https://wmdb-ui-exp.vercel.app>

## Inspiration

In web2 space we have movie platforms like IMDB, TMDB, etc., If the users want to build some custom applications consuming
data from these platfoms they have to pay for the subscription as the data is owned by the platforms itself.
What if we have a well maintained (DAO maintained) database that is publicly available? What if the movie promotions can be taken to the next level by generating the NFTs for movie characters/posters? What if the critics get rewarded with tokens for their valuable reviews?

## The Platform

### Features

- Users can propose addition of new movies.
- The DAO members (Holders of WMDB token) review the proposals and approve/deny based on the quality of data.
- The succeeded proposal (proposal who got 5% votes) are executed.
- The new data is added to the WMDB smart contract by the governance contract.
- ✨Magic ✨
- The data is availabe for consumption.

## Tech

WMDB is built using number of open source projects:

- [NextJS](https://nextjs.org/) - User Interface
- [Tailwindcss](https://tailwindcss.com/) - CSS
- [Framer Motion](https://www.framer.com/motion/) - Animation
- [Web3.storage](https://web3.storage/) - Web3 file/data storage
- [AWS DynamoDB](https://aws.amazon.com/dynamodb/) - Data storage for indexing/querying, easy access
- [Polygon Mumbai](https://polygon.technology/) - Blockchain, Smart Contracts, decentralization

## Getting Started

1. Clone this repo:

```
git clone https://github.com/Abhijith002/WMDB
cd WMDB
```

2. Install dependencies

```sh
yarn
```

3. Run the development server:

```sh
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Contact

Abhijith - [@AbhijithGowdar](https://twitter.com/AbhijithGowdar)
