import Head from "next/head";
import Card from "../components/contents/card";
import Search from "../components/icons/search";
import data from "../dummy_data";

export default function Home() {
  console.log(data);
  return (
    <>
      <Head>
        <title>Movie Search</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300&family=Roboto:wght@700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <div className="container mx-auto">
        <header
          className="text-xl font-bold text-center w-full mt-10 h-10 text-4xl mb-10"
          style={{ fontFamily: "Roboto" }}
        >
          Movie Search
        </header>
        <main>
          <div className="flex flex-row items-center justify-around">
            <div className="w-1/2 my-2 border border-slate-300 hover:border-slate-400 flex flex-row space-between p-2 rounded-2xl">
              <Search className="w-20" />
              <input
                type="text"
                placeholder="Search..."
                className="grow pl-2 outline-none"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 content-start justify-items-center mt-10">
            {data.Search.map((item) => (
              <Card
                title={item.Title}
                poster={item.Poster}
                key={item.imdbID}
                year={item.Year}
                type={item.Type}
              />
            ))}
          </div>
        </main>
      </div>
    </>
  );
}
