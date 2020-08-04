import React , {useState, useEffect} from 'react'
import {useHistory} from "react-router-dom"

const apiAdress = process.env.REACT_APP_SERVER_URL;
export default function Jobs() {

    let [jobList, setJobList] = useState([])
    let history = useHistory();


    const getData = async () => {
    try {
        let url = `${apiAdress}/jobs`
        console.log("url",url)
        let respone = await fetch(url)
        let result = await respone.json();
        setJobList(result)
    } catch (err){
        console.log("err", err.message);
    }
};

const getDetail = (id) =>{
 history.push(`/jobs/${id}`)
}

useEffect(() => {
    getData();
}, [])

if(jobList.length === 0){
    return (
        <h1>Loading</h1>
    )
}
    return (
        <div>
            <h1></h1>
                {jobList.map(job => {
                return(
                <h3 className = "title"onClick = {()=> getDetail(job.id)}>{job.title}</h3>
                )
            })}
        </div>
    )
}
