import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Moment from "react-moment";
import { NavLink} from "react-bootstrap";


const apiAdress = process.env.REACT_APP_SERVER_URL;
export default function Detail() {
  // console.log("What inside of props?", props);
  let { id } = useParams();
  let [job, setJob] = useState(null);

  let getDetailData = async () => {
    let url = `${apiAdress}/jobs/${id}`;
    console.log("url", url);
    let respone = await fetch(url);
    let result = await respone.json();
    setJob(result);
  };
  useEffect(() => {
    getDetailData();
  }, []);

  if (job === null) {
    return <div>loading</div>;
  }

  

  return (
    <div>
  <NavLink className="navbar navbar-expand-lg navbar-light bg-dark position-fixed style-nav" to="/#">
    <img
      class="logo-itviec"
      alt="itviec"
      src="https://itviec.com/assets/logo-itviec-65afac80e92140efa459545bc1c042ff4275f8f197535f147ed7614c2000ab0f.png"
      width="108"
      height="42"
    />
  </NavLink>
  <div className = "top-100px "> 
   <ul className="list-group">
        <li className="list-group-item " key={job.id}>
          <div className="media style-detail">
            <img src={job.img} width="200px" />
            <div className="media-body d-flex flex-column align-items-start mt-2">
              <h3>{job.title}</h3>
              <h5 className="mt-0 d-flex align-items-start">{job.salary}$</h5>
              <h5>{job.city}</h5>
              <div className="d-flex align-items-start style-login mr-2">
                <span className="ml-auto">
                  <Moment fromNow>{job.time}</Moment>
                </span>
              </div>
              
                <ul className="d-flex align-items-start">{job.benefits}</ul>
                <div>
                <ul className = "style-ul ">
                  <li>Coffee</li>
                  <li>Tea</li>
                  <li>Milk</li>
                </ul>
                </div>
              
              <h4>{job.description}</h4>
            </div>
          </div>
        </li>
      </ul> 
  </div>
      
    </div>
  );
}
