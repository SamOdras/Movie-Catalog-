import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Card,
  CardImg,
  Button,
  Modal,
  ModalHeader,
  ModalFooter,
} from "reactstrap";
import './main-page.style.scss'
import Axios from 'axios';
import history from '../../history';
const movieAPI = "http://www.omdbapi.com/?apikey=e3fad09a&";

const MainPage = () => {
  const dispatch = useDispatch();
  const [listMovie, setListMovie] = useState([])
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true)
  const [isOpen, setIsOpen] = useState(false);
  // const [isLoading, setIsLoading] = useState(false)
  const { searchValue, isLoading } = useSelector(state => state.movie)

  const setIsLoading = useCallback((e) => dispatch({
    type:"SEARCH_LOADING",
    payload:e
  }), [dispatch])

  useEffect(() => {
    let cancel = () => {};
    async function search() {
      setIsLoading(true);
      let sval = searchValue;
      if (sval === "") sval = "lego";
      try {
        const response = await Axios.get(`${movieAPI}s=${sval}&page=1`, {
          cancelToken: new Axios.CancelToken(c => (cancel = c))
        });
        let data = response.data;
        if (data.Response === "True") {
          setPage(1);
          setListMovie(data.Search);
        }
      } catch (e) {
        if (Axios.isCancel(e)) return;
      }
      setIsLoading(false);
    }

    search();
        console.log("hello");
    return () => cancel();

  }, [searchValue, setIsLoading]);

  useEffect(() => {
    async function init() {
      setIsLoading(true);
      try {
        let data = await Axios.get(`${movieAPI}s=lego&page=${1}`);
        if (data.data.Response === "True") {
          setListMovie(data.data.Search);
          setPage(1);
        }
      } catch (e) {
        console.log(e);
      }
      
      setIsLoading(false);
    }
    init();
  }, [setIsLoading]);

  const infiniteSearch = useCallback(async() => {
    let sval = searchValue;
    if (sval === "") sval = "lego";
    setIsLoading(true);
    try {
      const response = await Axios.get(
        `${movieAPI}s=${sval}&page=${page + 1}`
      );
      if (response.data.Response === "True") {
        let data = response.data.Search;
        setListMovie(list => [...list, ...data]);
      } else {
        setHasMore(false);
      }
    } catch (e) {
      console.log(e);
    }
    setIsLoading(false);
    setPage(npage => npage + 1);
  }, [searchValue, page, setIsLoading])

    const observer = useRef();
    const lastMovieItemRef = useCallback(
      node => {
        if (isLoading) return;
        if (observer.current) observer.current.disconnect();
        observer.current = new IntersectionObserver(e => {
          if (e[0].isIntersecting && hasMore) {
            infiniteSearch();
          }
        });
        if (node) observer.current.observe(node);
      },
      [hasMore, isLoading, infiniteSearch]
    );
  return (
    <>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          padding: "80px 30px 30px 30px"
        }}
      >
        {listMovie.map((item, key) => {
          if(key + 1 === listMovie.length) {
            return (
              item.Poster &&
              item.Poster !== "N/A" && (
                <div
                  key={item.imdbID + key}
                  style={{
                    width: "246px",
                    marginRight: "10px",
                    marginBottom: "10px"
                  }}
                  ref={lastMovieItemRef}
                >
                  <Card className="card-wrapper">
                    <CardImg
                      alt="Card image cap"
                      src={item.Poster || ""}
                      top
                      width="100%"
                      height="366px"
                      className="card-image"
                      onClick={() => setIsOpen(item.Poster)}
                    />
                    <div className="image-overlay">
                      <div className="button-wrapper">
                        <Button
                          onClick={() => history.push("/detail")}
                          color="warning"
                          style={{ marginRight: "5px" }}
                        >
                          Read More
                        </Button>
                      </div>
                    </div>
                  </Card>
                </div>
              )
            );
          } else {
            return (
              item.Poster &&
              item.Poster !== "N/A" && (
                <div
                  key={item.imdbID + key}
                  style={{
                    width: "246px",
                    marginRight: "10px",
                    marginBottom: "10px"
                  }}
                >
                  <Card className="card-wrapper">
                    <CardImg
                      alt="Card image cap"
                      src={item.Poster || ""}
                      top
                      width="100%"
                      height="366px"
                      className="card-image"
                      onClick={() => setIsOpen(item.Poster)}
                    />
                    <div className="image-overlay">
                      <div className="button-wrapper">
                        <Button
                          color="warning"
                          style={{ marginRight: "5px" }}
                          onClick={() => history.push("/detail")}
                        >
                          Read More
                        </Button>
                      </div>
                    </div>
                  </Card>
                </div>
              )
            );
          }

        })}
      </div>
      <Modal isOpen={!!isOpen} toggle={() => setIsOpen("")}>
        <ModalHeader toggle={() => setIsOpen("")}>Movie Poster</ModalHeader>
        <div
          style={{
            textAlign: "center",
            marginTop: "10px",
            marginBottom: "10px"
          }}
        >
          <CardImg
            alt="Card image cap"
            src={isOpen || ""}
            top
            style={{ width: "300px" }}
            height="366px"
            className="card-image"
          />
        </div>
        <ModalFooter>
          <Button onClick={() => setIsOpen("")}>Tutup</Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default MainPage;