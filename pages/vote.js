import { useEffect, useState } from "react";
import ActualHeader from "../components/actualHeader";
import { votecount } from "../utils/votecount";
import { voteProposal } from "../utils/voteproposal";
import { queueAndExecute } from "../utils/queueandexecute";

export default function vote() {
  const [data, setData] = useState([]);
  const [modalState, setModalState] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState({});
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    async function fetchData() {
      let consolData = [];
      const res = await fetch("/api/list");
      const data = await res.json();
      console.log(data);
      for (let i = 0; i < data.length; i++) {
        const movieres = await fetch(data[i].dataURL);
        const moviedata = await movieres.json();
        let votecnt = await votecount(data[i].proposalID);
        let numVotes = {
          votes: votecnt.proposalVotes.split(",", 3)[1].slice(0, -18),
          state: votecnt.proposalState,
        };
        consolData.push({ ...data[i], moviedata, numVotes });
        console.log(votecnt);
      }
      setData(consolData);
      console.log(consolData);
    }
    fetchData();
  }, []);
  const handleVote = async (proposal) => {
    await voteProposal(proposal.proposalID, 1, proposal.moviedata.name)
      .then((value) => {
        console.log("voted");
        console.log(value);
        // proposalId = value.proposalId;
        // proposalState = value.proposalState;
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const handleModal = (modalData) => {
    setModalState(true);
    setSelectedMovie(modalData.moviedata);
  };
  const handleExecute = async (execData) => {
    setLoading(true);
    await queueAndExecute([execData.cid], "store", execData.moviedata.name)
      .then(async () => {
        console.log("Success");
        let proposal = await votecount(execData.proposalID);
        const prpdata = {
          proposalid: execData.proposalID,
          cid: execData.cid,
          state: proposal.proposalState,
        };
        const JSONprpdata = JSON.stringify(prpdata);
        const endpointaws = "/api/addtodb";
        const optionsadddb = {
          // The method is POST because we are sending data.
          method: "POST",
          body: JSONprpdata,
        };
        const responseaws = await fetch(endpointaws, optionsadddb);
        const resultaws = await responseaws.json();
        console.log(resultaws);
        let newData = data;
        for (let i = 0; i < data.length; i++) {
          if (data[i].proposalID == execData.proposalID) {
            newData[i].numVotes.state = proposal.proposalState;
          }
        }
        setData(newData);
      })
      .catch((error) => {
        console.error(error);
      });
    setLoading(false);
  };
  const cards = data.map((value, index) => {
    return (
      <div key={value.proposalID} onClick={() => handleModal(value)}>
        <a
          href="#"
          className="group h-96 block bg-gray-100 rounded-t-lg overflow-hidden relative"
        >
          <img
            src={value.imgURL}
            loading="lazy"
            alt="Photo by Nick Karvounis"
            className="w-full h-full object-cover object-center group-hover:scale-110 transition duration-200"
          />
        </a>

        <div className="flex justify-between items-start bg-gray-100 rounded-b-lg gap-2 p-4">
          <div className="flex flex-col">
            <a
              href="#"
              className="text-gray-800 hover:text-gray-500 lg:text-lg font-bold transition duration-100"
            >
              {value.moviedata.name}
            </a>
            <span className="text-gray-500 text-sm lg:text-base">
              {value.moviedata.releaseYear}
            </span>
            <span className="text-red-500 text-sm font-medium">
              {value.numVotes.votes}
            </span>
            {value.numVotes.state == 7 && (
              <span className="flex items-center text-gray-500 text-sm gap-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 text-green-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                Executed
              </span>
            )}
          </div>

          {value.numVotes.state == 1 && (
            <div className="flex flex-col items-end">
              <span className="text-gray-600 lg:text-lg font-bold">
                <button
                  className="btn btn-circle bg-green-500 border-green-500"
                  onClick={() => handleVote(value)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    enableBackground="new 0 0 122.88 104.19"
                    //   viewBox="0 0 24 24"
                    viewBox="0 0 122.88 104.19"
                    stroke="currentColor"
                  >
                    {/* <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  /> */}
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="4"
                      d="M62.63 6.25c.56-2.85 2.03-4.68 4.04-5.61 1.63-.76 3.54-.83 5.52-.31 1.72.45 3.53 1.37 5.26 2.69 4.69 3.57 9.08 10.3 9.64 18.71.17 2.59.12 5.35-.12 8.29-.16 1.94-.41 3.98-.75 6.1h19.95l.09.01c3.24.13 6.38.92 9.03 2.3 2.29 1.2 4.22 2.84 5.56 4.88 1.38 2.1 2.13 4.6 2.02 7.46-.08 2.12-.65 4.42-1.81 6.87.66 2.76.97 5.72.54 8.32-.36 2.21-1.22 4.17-2.76 5.63.08 3.65-.41 6.71-1.39 9.36-1.01 2.72-2.52 4.98-4.46 6.98-.17 1.75-.45 3.42-.89 4.98-.55 1.96-1.36 3.76-2.49 5.35-3.4 4.8-6.12 4.69-10.43 4.51-.6-.02-1.24-.05-2.24-.05H57.91c-3.51 0-6.27-.51-8.79-1.77-2.49-1.25-4.62-3.17-6.89-6.01l-.58-1.66v-45.5l1.98-.53c5.03-1.36 8.99-5.66 12.07-10.81 3.16-5.3 5.38-11.5 6.9-16.51V6.76l.03-.51zM4 43.02h29.08c2.2 0 4 1.8 4 4v53.17c0 2.2-1.8 4-4 4H4c-2.2 0-4-1.8-4-4V47.02c0-2.2 1.8-4 4-4zM68.9 5.48c-.43.2-.78.7-.99 1.56V20.3l-.12.76c-1.61 5.37-4.01 12.17-7.55 18.1-3.33 5.57-7.65 10.36-13.27 12.57v40.61c1.54 1.83 2.96 3.07 4.52 3.85 1.72.86 3.74 1.2 6.42 1.2h39.03c.7 0 1.6.04 2.45.07 2.56.1 4.17.17 5.9-2.27v-.01c.75-1.06 1.3-2.31 1.69-3.71.42-1.49.67-3.15.79-4.92l.82-1.75c1.72-1.63 3.03-3.46 3.87-5.71.86-2.32 1.23-5.11 1.02-8.61l-.09-1.58 1.34-.83c.92-.57 1.42-1.65 1.63-2.97.34-2.1-.02-4.67-.67-7.06l.21-1.93c1.08-2.07 1.6-3.92 1.67-5.54.06-1.68-.37-3.14-1.17-4.35-.84-1.27-2.07-2.31-3.56-3.09-1.92-1.01-4.24-1.59-6.66-1.69v.01H79.86l.59-3.15c.57-3.05.98-5.96 1.22-8.72.23-2.7.27-5.21.12-7.49-.45-6.72-3.89-12.04-7.56-14.83-1.17-.89-2.33-1.5-3.38-1.77-.81-.22-1.47-.23-1.95-.01z"
                    ></path>
                  </svg>
                </button>
              </span>
            </div>
          )}
          {value.numVotes.state == 4 && (
            <button
              className="inline-block bg-indigo-500 hover:bg-indigo-600 active:bg-indigo-700 focus-visible:ring ring-indigo-300 text-white text-sm md:text-base font-semibold text-center rounded-lg outline-none transition duration-100 px-8 py-3"
              onClick={() => handleExecute(value)}
            >
              Execute
            </button>
          )}
        </div>
      </div>
    );
  });
  return (
    <div className="bg-white py-6 sm:py-8 lg:py-2">
      <div className="max-w-screen-2xl px-4 md:px-8 mx-auto">
        <ActualHeader />
        <div className="hidden sm:block" aria-hidden="true">
          <div className="pb-4">
            <div className="border-t border-gray-200" />
          </div>
        </div>
        {loading && (
          <div className="toast toast-top toast-end">
            <div className="alert alert-success text-sm font-medium text-white">
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              <div>
                <span>Executing...</span>
              </div>
            </div>
          </div>
        )}
        <h2 className="text-gray-800 text-2xl lg:text-3xl font-bold text-center mb-8 md:mb-12 py-8">
          Proposals
        </h2>
        {modalState && (
          <div className="modal modal-open">
            <div className="modal-box relative">
              <button
                className="btn btn-sm btn-circle absolute right-2 top-2"
                onClick={() => setModalState(false)}
              >
                ✕
              </button>
              <div className="flex flex-col gap-3 py-4 md:py-8">
                <div>
                  <span className="block text-lg font-bold">
                    {selectedMovie?.name}
                  </span>
                  <span className="block text-gray-500 text-sm">
                    {selectedMovie?.releaseYear}
                  </span>
                  <div className="flex items-center text-gray-500 gap-2 mb-6">
                    <span className="text-sm">
                      {selectedMovie?.cast.split(",")[0]}
                    </span>
                    <div className="divider divider-horizontal"></div>
                    <span className="text-sm">
                      {selectedMovie?.cast.split(",")[1]}
                    </span>
                    <div className="divider divider-horizontal"></div>
                    <span className="text-sm">
                      {selectedMovie?.cast.split(",")[2]}
                    </span>
                  </div>
                </div>

                <p className="text-gray-600 text-sm">{selectedMovie?.plot}</p>
              </div>
            </div>
          </div>
        )}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
          {cards}
        </div>
      </div>
    </div>
  );
}
