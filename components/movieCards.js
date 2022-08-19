import Link from "next/link";
import { movies } from "../data/tempdata.json";
export default function MovieCards() {
  const movieCards = movies.map((value, index) => {
    return (
      <div
        key={value + index}
        className="2xl:w-1/6 xl:w-1/5 lg:w-1/4 md:w-1/2 -ml-20 first:ml-0 hover:-translate-y-10 hover:scale-110 peer peer-hover:translate-x-24 transition-all duration-200"
      >
        <Link href={`/details/${value.id}`}>
          <a
            href="#"
            className="group h-48 md:h-64 xl:h-96 flex flex-col bg-gray-100 rounded-lg shadow-lg overflow-hidden relative"
          >
            <img
              src={value.imgURL}
              loading="lazy"
              alt="Photo by Lorenzo Herrera"
              className="w-full h-full object-cover object-center absolute inset-0 transition duration-200"
            />

            <div className="bg-gradient-to-t from-gray-800 md:via-transparent to-transparent absolute inset-0 pointer-events-none"></div>

            <div className="relative p-4 mt-auto">
              <span className="block text-gray-200 text-sm">
                {value.releaseYear}
              </span>
              <h2 className="text-white text-xl font-semibold transition duration-100 mb-2">
                {value.name}
              </h2>

              <span className="text-indigo-300 font-semibold">View more</span>
            </div>
          </a>
        </Link>
      </div>
    );
  });
  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-2 mx-auto">
        <div className="flex flex-wrap w-full mb-10">
          <div className="lg:w-1/2 w-full mb-6 lg:mb-0">
            <h1 className="sm:text-3xl text-2xl font-medium title-font text-gray-900">
              Movies
            </h1>
            <div className="h-1 w-20 bg-indigo-500 rounded"></div>
          </div>
        </div>
        <div className="flex">{movieCards}</div>
      </div>
    </section>
  );
}
