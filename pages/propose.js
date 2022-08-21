import { useState } from "react";
import { useRouter } from "next/router";
import ActualHeader from "../components/actualHeader";
import SvgComponent from "../components/additionImage";
import { propose } from "../utils/propose";
import { Web3Storage } from "web3.storage";

export default function Propose() {
  const router = useRouter();
  const [imgAdded, setImageAdded] = useState(false);
  const [imgPath, setImgPath] = useState("");
  const [loading, setLoading] = useState(false);
  const [toastText, setToastText] = useState("Creating CIDs");
  const handleImgChange = (event) => {
    setImageAdded(true);
    console.log(event.target.files);
    setImgPath(event.target.files[0]);
  };
  const handleSubmit = async (event) => {
    // Stop the form from submitting and refreshing the page.
    event.preventDefault();
    setLoading(true);

    const client = new Web3Storage({
      token: process.env.NEXT_PUBLIC_WEB3STORAGE_TOKEN,
    });

    const data = {
      name: event.target.name.value,
      releaseYear: event.target.release.value,
      plot: event.target.plot.value,
      cast: event.target.cast.value,
    };

    const JSONdata = JSON.stringify(data);

    const blob = new Blob([JSONdata], { type: "application/json" });
    let newfilename = Math.random().toString(36).slice(2);
    const files = [
      new File([event.target.movieIMG.files[0]], newfilename),
      new File([blob], `${newfilename}data`),
    ];
    // files.push(event.target.movieIMG.files[0]);
    const cid = await client.put(files);
    console.log("stored files with cid:", cid);

    setToastText("Proposing new addition");
    let proposalId = "";
    let proposalState = 1;
    await propose([cid], "store", data.name)
      .then((value) => {
        console.log("proposed");
        console.log(value);
        proposalId = value.proposalId;
        proposalState = value.proposalState;
      })
      .catch((error) => {
        console.error(error);
      });
    setToastText("Saving proposal");
    console.log(proposalId, proposalState);
    const prpdata = {
      proposalid: proposalId,
      cid: cid,
      state: proposalState,
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
    setLoading(false);
    setToastText("Creating CIDs");
    router.push("/vote");
  };

  return (
    <div className="bg-white lg:pb-4">
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
              <span>{toastText}</span>
            </div>
          </div>
        </div>
      )}
      <div className="max-w-screen-2xl px-4 md:px-8 mx-auto">
        <ActualHeader />
        <div className="hidden sm:block" aria-hidden="true">
          <div className="pb-4">
            <div className="border-t border-gray-200" />
          </div>
        </div>
        <div>
          <div className="md:grid md:grid-cols-2">
            <div className="md:col-span-1 p-6">
              <div className="flex-col px-4 sm:px-0 justify-center items-center">
                <h3 className="text-lg font-medium leading-6 text-gray-900 text-center">
                  Add new movie
                </h3>
                <p className="mt-1 text-sm text-gray-600 text-center">
                  Please provide details on the new movie to be added.
                </p>
                <div className="xl:w-full lg:h-auto p-6 md:p-16 justify-center items-center">
                  <SvgComponent />
                </div>
              </div>
            </div>
            <div className="mt-5 md:mt-0 md:col-span-1">
              <form onSubmit={handleSubmit} method="POST">
                <div className="shadow sm:rounded-md sm:overflow-hidden">
                  <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
                    <div className="grid grid-cols-3 gap-6">
                      <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                        <label
                          htmlFor="movie-name"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Movie name
                        </label>
                        <input
                          type="text"
                          name="movie-name"
                          id="name"
                          autoComplete="given-name"
                          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                      <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                        <label
                          htmlFor="release"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Initial release
                        </label>
                        <input
                          type="text"
                          name="release"
                          id="release"
                          autoComplete="address-level2"
                          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="plot"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Plot
                      </label>
                      <div className="mt-1">
                        <textarea
                          id="plot"
                          name="plot"
                          rows={3}
                          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                          placeholder="you@example.com"
                          defaultValue={""}
                        />
                      </div>
                      <p className="mt-2 text-sm text-gray-500">
                        Brief description of the movie plot. URLs are
                        hyperlinked.
                      </p>
                    </div>
                    <div className="col-span-6">
                      <label
                        htmlFor="cast"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Cast
                      </label>
                      <input
                        type="text"
                        name="cast"
                        id="cast"
                        autoComplete="cast"
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Cover photo
                      </label>
                      <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                        <div className="space-y-1 text-center">
                          <svg
                            className="mx-auto h-12 w-12 text-gray-400"
                            stroke="currentColor"
                            fill="none"
                            viewBox="0 0 48 48"
                            aria-hidden="true"
                          >
                            <path
                              d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                              strokeWidth={2}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                          <div className="flex text-sm text-gray-600">
                            <label
                              htmlFor="movieIMG"
                              className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                            >
                              <span>{!imgAdded && "Upload a file"}</span>
                              {imgAdded && (
                                <span>
                                  {imgPath.name + "(" + imgPath.size + ")"}
                                </span>
                              )}
                              <input
                                id="movieIMG"
                                name="movieIMG"
                                type="file"
                                accept="*"
                                className="sr-only"
                                onChange={handleImgChange}
                              />
                            </label>
                            <p className="pl-1">
                              {!imgAdded && "or drag and drop"}
                            </p>
                          </div>
                          <p className="text-xs text-gray-500">
                            PNG, JPG, GIF, WEBP up to 10MB
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                    <button
                      type="submit"
                      className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      {loading && (
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
                      )}
                      {loading ? "Processing..." : "Save"}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>

        <div className="hidden sm:block" aria-hidden="true">
          <div className="py-5">
            <div className="border-t border-gray-200" />
          </div>
        </div>
      </div>
    </div>
  );
}
