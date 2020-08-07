import React, { useState, useEffect } from "react";
import { NavLink, Button, Form } from "react-bootstrap";
import Moment from "react-moment";
import { useHistory, useLocation } from "react-router-dom";
import CircleLoader from "react-spinners/CircleLoader";
import {  useSelector } from "react-redux"
const apiAdress = process.env.REACT_APP_SERVER_URL;

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function Jobs() {
  let query = useQuery();
  let [jobList, setJobList] = useState([]);
  let [keyword, setKeyword] = useState(query.get("q"));
  let [originalList, setOriginalList] = useState([]);
  let history = useHistory();

  const getData = async () => {
    try {
      let url = `${apiAdress}/jobs`;
      console.log("url", url);
      let respone = await fetch(url);
      let result = await respone.json();
      setJobList(result);
      setOriginalList(result);
    } catch (err) {
      console.log("err", err.message);
    }
  };

  const searchByKeyword = (e) => {
    let filteredList = originalList;
    if (e) {
      e.preventDefault();
      console.log("keyword?", keyword);
      if (keyword !== "") history.push(`/jobs?q=${keyword}`);
      else history.push("/jobs");
    }

    if (keyword) {
      filteredList = originalList.filter((job) =>
        job.title.toLowerCase().includes(keyword.toLowerCase())
      );
    }

    setJobList(filteredList);
  };
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

  const getDetail = (id) => {
    console.log("hoho",getDetail)
    if(isAuthenticated){
      history.push(`/jobs/${id}`);
    }else{
      history.push(`/login`)
    }
  };
  

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    searchByKeyword();
  }, [originalList]);

  const [loading, setLoading] = useState(false);

  if (jobList.length === 0) {
    return (
      <div className="sweet-loading style-loading">
        <CircleLoader
          //   css={overide}
          size={150}
          color={"green"}
          loading={loading}
        />
      </div>
    );
  }
  return (
    <div className="style-search">
      <ul className="list-group style-login">
        <div className="style-tbn-s mb-5">
          <span>
            <Form onSubmit={(e) => searchByKeyword(e)}>
              <input
                className="style-input"
                placeholder="Find job in your dream"
                type="text"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
              />
              <Button variant="danger" type="submit">
                Search
              </Button>
            </Form>
          </span>
        </div>

        {jobList.map((job) => {
          return (
            <li className="list-group-item" key={job.id}>
              <div className="media">
                <img src={job.img} width="100px" className=" style-img m-5" />
                <div className="media-body mt-2">
                  <h3 className="title" onClick={() => getDetail(job.id)}>
                    {job.title}
                    <span className="ml-3">
                      {job.isHotjob === true ? (
                        <button className="btn-hotjob">Hot Job🔥</button>
                      ) : (
                        ""
                      )}
                    </span>
                  </h3>
                  <h6 className="d-flex align-items-start text-muted ml-2 mt-2 mb-2">
                    {job.city}
                  </h6>

                  <h5 className="d-flex align-items-start text-success ml-2 mt-3 mb-3">
                    💲{job.salary}
                  </h5>
                  <span>
                    <h5 className="d-flex align-items-start m-2">
                      <strong>Benefits:</strong>
                    </h5>
                    <h6 className="style-be">
                      <ul>
                        {job.benefits.map((benifit, indexBenifit) => (
                          <li>{benifit}</li>
                        ))}
                      </ul>
                    </h6>
                    <div className="content-footer d-flex align-items-start">
                      {job.tags.map((label) => (
                        <div>
                          <span
                            className="badge badge-danger mr-2"
                            color={label.color}
                            key={label.id}
                          >
                            {label}
                          </span>
                        </div>
                      ))}
                      <div className="d-flex align-items-start ml-auto">
                        <span className="ml-auto text-primary">
                          <Moment fromNow>{job.time}</Moment>
                        </span>
                      </div>
                    </div>
                  </span>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
