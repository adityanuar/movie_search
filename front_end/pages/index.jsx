import Head from "next/head";
import Card from "../components/contents/card";
import Next from "../components/icons/next";
import Prev from "../components/icons/prev";
import Search from "../components/icons/search";
import data from "../dummy_data";
import axios from "axios";
import { useState, useRef } from "react";
import Last from "../components/icons/last";
import First from "../components/icons/first";
import { Skeleton } from "@mui/material";
import Popup from "reactjs-popup";
import Minipage from "../components/contents/minipage";

const STATUS = {
  idle: 0,
  progress: 1,
};

let axiosMemoData = {};
let axiosMemoDataDetails = {};

const axiosMemo = async (s, page = 1) => {
  const url = `s=${s}&page=${page}`;
  const data = axiosMemoData[url];
  console.log(data);
  if (!data) {
    const { data: d } = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/movie?${url}`
    );
    data = d;
    if (data) {
      axiosMemoData[url] = data;
    }
  }
  return data;
};

const axiosMemoDetail = async (i) => {
  const data = axiosMemoDataDetails[i];
  if (!data) {
    const { data: d } = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/moviedetail?i=${i}`
    );
    data = d;
    if (data) {
      axiosMemoDataDetails[i] = data;
    }
  }
  return data;
};

export default function Home() {
  let searchField = useRef(null);
  let [activities, setActivities] = useState({
    current: 1,
    totalResults: null,
    max: null,
    query: "",
  });
  let [searchData, setSearchData] = useState(null);
  let [searchDataDetail, setSearchDataDetail] = useState(null);
  let [status, setStatus] = useState(STATUS.idle);
  let [statusDetail, setStatusDetail] = useState(STATUS.idle);
  let [showDetail, setShowDetail] = useState(false);
  let [choosenImage, setChoosenImage] = useState("");
  const doSearch = async (e, query, page = 1) => {
    console.log("do search");
    try {
      setStatus(STATUS.progress);
      let s = query;
      if (!s) {
        const { value: search } = e.target;
        s = search;
      }
      const data = await axiosMemo(s, page);
      if (data) {
        setSearchData(data);
        const max = Math.ceil(data.totalResults / 10);
        setActivities({
          ...activities,
          totalResults: data.totalResults,
          max,
          query: s,
          current: page,
        });
      } else {
        setSearchData(null);
      }
      setStatus(STATUS.idle);
    } catch (e) {
      setStatus(STATUS.idle);
      console.log(e);
    }
  };
  const doSearchDetail = async (i) => {
    try {
      setStatusDetail(STATUS.progress);
      const data = await axiosMemoDetail(i);
      console.log(data);
      if (data) {
        setSearchDataDetail(data);
      } else {
        setSearchDataDetail(null);
      }
      setStatusDetail(STATUS.idle);
    } catch (e) {
      setStatusDetail(STATUS.idle);
      console.log(e);
    }
  };
  const defineColor = (title) => {
    const colors = ["yellow", "blue", "green", "red"];
    for (let i = 0; i < colors.length; i++) {
      if (title.toLowerCase().includes(colors[i])) return colors[i];
    }
    return "black";
  };
  const closeDetail = () => setShowDetail(false);
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
                name="searchTerm"
                type="text"
                placeholder="Search..."
                className="grow pl-2 outline-none"
                onKeyPress={(event) => {
                  if (event.key === "Enter") {
                    doSearch(event);
                  }
                }}
                ref={searchField}
              />
            </div>
          </div>
          {!searchData ? (
            <div className="text-center mt-10 font-regular text-xl italic">
              Type your favorite movie in search box then press Enter...
            </div>
          ) : searchData.Search === undefined ||
            searchData.Search.length <= 0 ? (
            <div className="text-center mt-10 font-regular text-xl italic">
              Sorry, no result...
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 content-start justify-items-center mt-10">
                {status === STATUS.idle
                  ? searchData.Search.map((item) => (
                      <Card
                        title={item.Title}
                        poster={item.Poster}
                        key={item.imdbID}
                        year={item.Year}
                        type={item.Type}
                        color={defineColor(item.Title)}
                        onClick={() => {
                          setShowDetail(true);
                          doSearchDetail(item.imdbID);
                          setChoosenImage(item.Poster);
                        }}
                      />
                    ))
                  : new Array(10)
                      .fill(0)
                      .map((item) => (
                        <Skeleton
                          variant="rectangular"
                          width={208}
                          height={208}
                          animation="wave"
                        />
                      ))}
              </div>
              <div className="flex w-60 mx-auto mt-20 gap-2 mb-20">
                <First
                  className={`w-10 h-10 ${
                    activities.current === 1
                      ? "fill-gray-200"
                      : "hover:cursor-pointer "
                  }`}
                  onClick={() => {
                    if (activities.current > 1) {
                      doSearch(searchField, activities.query, 1);
                    }
                  }}
                />
                <Prev
                  className={`w-10 h-10 ${
                    activities.current === 1
                      ? "fill-gray-200"
                      : "hover:cursor-pointer "
                  }`}
                  onClick={() => {
                    if (activities.current > 1) {
                      doSearch(
                        searchField,
                        activities.query,
                        activities.current - 1
                      );
                    }
                  }}
                />
                <span className="text-xl m-auto">
                  {activities.current}/{activities.max}
                </span>

                <Next
                  className={`w-10 h-10 ${
                    activities.current === activities.max
                      ? "fill-gray-200"
                      : "hover:cursor-pointer "
                  }`}
                  onClick={() => {
                    if (activities.current < activities.max) {
                      doSearch(
                        searchField,
                        activities.query,
                        activities.current + 1
                      );
                    }
                  }}
                />
                <Last
                  className={`w-10 h-10 ${
                    activities.current === activities.max
                      ? "fill-gray-200"
                      : "hover:cursor-pointer "
                  }`}
                  onClick={() => {
                    if (activities.current < activities.max) {
                      doSearch(searchField, activities.query, activities.max);
                    }
                  }}
                />
              </div>
            </>
          )}
        </main>
        <Popup
          modal
          overlayStyle={{ background: "rgba(0, 0, 0, 0.5)" }}
          open={showDetail}
          closeOnDocumentClick
          onClose={closeDetail}
          contentStyle={{
            width: "50vw",
            height: "90vh",
            backgroundColor: "rgba(255,255,255,1)",
            borderRadius: "15px",
          }}
        >
          {statusDetail === STATUS.progress || !searchDataDetail ? (
            <Skeleton
              variant="rectangular"
              width={"100%"}
              height={"100%"}
              animation="wave"
              color="rgba(255,255,255,1)"
            />
          ) : (
            <Minipage
              title={searchDataDetail.Title}
              released={searchDataDetail.Released}
              runtime={searchDataDetail.Runtime}
              genre={searchDataDetail.Genre}
              director={searchDataDetail.Director}
              writer={searchDataDetail.Writer}
              actors={searchDataDetail.Actors}
              type={searchDataDetail.Type}
              plot={searchDataDetail.Plot}
              imageSrc={choosenImage}
            />
          )}
        </Popup>
      </div>
    </>
  );
}
