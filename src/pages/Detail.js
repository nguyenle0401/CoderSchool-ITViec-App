import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Moment from "react-moment";
import { NavLink , ListGroup, Card,ListGroupItem} from "react-bootstrap";


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
  <div className = "top-100px">
  <Card style={{ width: '38rem' }}>
  <Card.Img src={job.img} width ="50px" height = "500px" />
  <Card.Body>
  <Card.Title className="card-style">{job.title}</Card.Title>
    <Card.Text>
      {job.description}
    </Card.Text>
  </Card.Body>
  <ListGroup className="list-group-flush">
  <ListGroupItem> {job.salary}$</ListGroupItem>
  <ListGroupItem>{job.city}</ListGroupItem>
    <ListGroupItem><Moment fromNow>{job.time}</Moment></ListGroupItem>
  </ListGroup>
  <Card.Body>
      <div>
      <div>
      <ul>{job.benefits.map((benifit, indexBenifit) =>(
      <li className = "hihi">{benifit}</li>
  ) )}</ul>
      </div>
      </div>
  </Card.Body>
</Card>
  </div>
 
      
    </div>
  );
}
