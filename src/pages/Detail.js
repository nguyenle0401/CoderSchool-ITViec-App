import React , {useState,useEffect} from 'react';
import { useParams } from "react-router-dom";


const apiAdress = process.env.REACT_APP_SERVER_URL;
export default function Detail() {
    // console.log("What inside of props?", props);
    let {id} = useParams()
    let [job, setJob] = useState(null)

    let getDetailData = async () => {
        let url = `${apiAdress}/jobs/${id}`
        console.log("url",url)
        let respone = await fetch(url)
        let result = await respone.json();
        setJob(result)
    }
useEffect(() => {
    getDetailData();
}, [])

if(job === null) {
    return <div>loading</div>
}
    return (
        <div>
            <h1>
                <div>{job.title}</div>
                <div>{job.description}</div>
                {/* Details {jobtitle} is value is :{id} */}
            </h1>
        </div>
    )
}

