import React, {useEffect, useState} from 'react';
import './LabelSearch.css';
import axios from "axios";
import {Link} from "react-router-dom";
const LabelSearch = () => {
    const [listLabelSearch,setListLabelSearch]=useState([]);

    const fetchLabelSearches = async () => {
        try{
            let response = await axios.get(`http://localhost:8000/label-searches`);
            setListLabelSearch(response.data);
        }catch (error){
            console.error("Error fetching label search",error);
        }
    }
    useEffect(()=>{
        fetchLabelSearches().then(()=>{})
    },[]);
    return (
      <div className="Label-search">
          <h5 className="m-2 text-black-50">Label Search</h5>
          <hr/>


         <div className="Label-search-result m-2 p-2">
              <div className="row">
                  <table className="table table-striped table-hover ">
                      <thead>
                        <tr>
                            <th scope="col">id</th>
                            <th scope="col">name</th>
                            <th scope="col">source</th>
                            <th scope="col">label name</th>
                            <th scope="col">action</th>
                        </tr>
                      </thead>
                      <tbody>
                      {listLabelSearch.map(entry=>
                          (<tr key={entry.labelSearchId}>
                              <th scope="row">{entry.labelSearchId}</th>
                              <td>{entry.name}</td>
                              <td>{entry.source.sourceName}</td>
                              <td>{entry.label.labelName}</td>
                              <th>
                                  <Link to={`${entry.labelSearchId}`}>Detail</Link>
                              </th>
                          </tr>)
                      )}
                      </tbody>
                  </table>
              </div>
          </div>
          <div >
              <Link to="new"   >
                  <button type="button"  className="btn btn-outline-primary m-1" >
                      New
                  </button>
              </Link>
          </div>
      </div>
  )
}

export default LabelSearch;