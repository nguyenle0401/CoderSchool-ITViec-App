import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Moment from "react-moment";
import { ListGroup, Card, ListGroupItem} from "react-bootstrap";
import CircleLoader from "react-spinners/CircleLoader";


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
  const [loading, setLoading] = useState(false);
  if (job === null) {
    return <div className="sweet-loading style-loading">
    <CircleLoader
    //   css={overide}
      size={150}
      color={"green"}
      loading={loading}
    />
  </div>
  }
  return (
    <div>
      
  <div className = "top1-100px">
  <Card style={{ width: '38rem' }}>
  {/* <Card.Img src={job.img} width ="50px" height = "500px" /> */}
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
      <h6 className = "hihi"><strong>Bennefits:</strong></h6>
      <div>{job.benefits.map((benifit, indexBenifit) =>(
      <ListGroupItem className = "hihi">{benifit}</ListGroupItem>
  ) )}</div>
      </div>
      </div>
  </Card.Body>
</Card>
  </div>
 
      
    </div>
  );
}
