import React, {useEffect, useState} from 'react';
import axios from 'axios';
import ImagePopover from "./ImagePopover";
import './Crawling.css'
import {Pagination} from "react-bootstrap";
import queryString from 'query-string';
const Crawling = () => {
    const [labelDropdownData,setLabelDropdownData] = useState([]);
    const [selectedLabelValue,setSelectedLabelValue] = useState('0');
    const [labelSearchDropdownData,setLabelSearchDropdownData] = useState([]);
    const [selectedLabelSearchValue,setSelectedLabelSearchValue] = useState('0');
    const [imageSampleData,setImageSampleData] = useState([]);
    let [currentPage,setCurrentPage] =useState(1);
    const fetchLabelData = async ()=>{
        try{
            let response = await axios.get("http://localhost:8000/labels");
            setLabelDropdownData(response.data);
        }catch (error){
            console.error('Error fetching up label data',error);
        }
    }
    const fetchLabelSearchData = async () =>{
        try{
            let response = await axios.post(`http://localhost:8000/labels/${selectedLabelValue}/label-searches`);
            setLabelSearchDropdownData(response.data);
            setSelectedLabelSearchValue('0')
        }catch (error){
            console.error('Error fetching up label search data',error);
        }
    }

    const fetchImageSample = async ()=>{
        try{
            let response = await  axios.post(`http://localhost:8000/label-searches/${selectedLabelSearchValue}/crawl`,
                queryString.stringify(
                     {
                            page: currentPage,
                            size: 100}
                )
            );
            setImageSampleData(response.data.content);
        }catch (error){
            console.error('Error crawling image',error);
        }

    }

    useEffect(()=>{
        fetchLabelData().then(() => {});
        fetchLabelSearchData().then(()=>{});
    },[])

    React.useEffect(()=>{
        fetchImageSample().then(()=>{})
    },[currentPage,selectedLabelSearchValue,selectedLabelValue]);

    React.useEffect(()=>{
        fetchLabelSearchData().then(() => {
        });
    },[selectedLabelValue]);
    const handleLabelChange = (event) => {
        setSelectedLabelValue(event.target.value);
        setCurrentPage(1);
        setImageSampleData([]);
    };

    const postLabelImages= async (imageIds)=>{
        try{
            let response = await  axios.post(`http://localhost:8000/labels/${selectedLabelValue}/label-on?imageIds=${imageIds.join(',')}`)
        }catch (error){
            console.error("Error to fetch label images",error);
        }
    }

    const labelAll = (event)=>{
        event.preventDefault();
        postLabelImages(imageSampleData.filter(i=>i.status===1).map(i=>i.imageId)).then(()=>{
            setImageSampleData(imageSampleData.map(i=>
                {
                    i.status =2;
                    return i;
                }
            ));
        });

    }

    const handleLabelSearchChange = (event) => {
        setSelectedLabelSearchValue(event.target.value);
        setCurrentPage(1);
        setImageSampleData([]);
    };

    const handleLabelImage = (imageId) =>{
        postLabelImages([imageId]).then(()=>{
            setImageSampleData(imageSampleData.map(i=> {
                if(i.imageId === imageId)
                    i.status=2;
                return i;
            }));
        })
    }

    const handleSubmit =()=>{
        setCurrentPage(1);
    }


    const handlePagePrev= ()=> {
        if(currentPage>1)
            setCurrentPage(currentPage-1);
    }


    const handlePageNext = () => {
        setCurrentPage(currentPage+1);
    }

    return (
      <div className="Crawling">
          <h5 className="m-2 text-black-50">Crawling sample</h5>
          <hr/>
          <form className="mt-4 g-3 border m-2 p-2">
              <div className="row">
                  <div className="col-2">
                      <label htmlFor="labelInput" className="form-label"><h6>Label</h6></label>
                  </div>
                  <div className="col-3">
                      <select id="label"
                              className="form-select"
                              aria-label="Default select label"
                              value={selectedLabelValue}
                              onChange={handleLabelChange}>
                          <option key="0" selected value='0'>Select option</option>
                          {
                              labelDropdownData?.map( (item)=>
                                  ( <option value={item.labelId} key={item.labelId}>{item.labelName}</option>)
                              )
                          }
                      </select>
                  </div>
                  <div className="col-2">
                      <label htmlFor="label-search" className="form-label"><h6>Label search</h6></label>
                  </div>
                  <div className="col-3">
                      <select id="label-search"
                              className="form-select"
                              aria-label="Default select label search"
                              value={selectedLabelSearchValue}
                              onChange={handleLabelSearchChange}>
                          <option key="0" selected value='0'>Select option</option>
                          {labelSearchDropdownData?.map((item)=>
                              (<option value={item.labelSearchId} key={item.labelSearchId}>{item.name}</option>)
                          )}
                      </select>
                  </div>
              </div>
              <hr/>
          </form>
          <div className="Crawling-search-result m-2 p-2">
              <div className="row">
              {
                  [...Array(imageSampleData.length).keys()].map(i=>
                      (
                               (i <imageSampleData.length) ?(
                                   <div  className="col-auto   border p-2 m-2">
                                       <ImagePopover
                                           imageId={`${imageSampleData[i].imageId}`}
                                           name={`${imageSampleData[i].name}`}
                                           md5={`${imageSampleData[i].md5}`}
                                           sourceUrl={`${imageSampleData[i].sourceUrl}`}
                                           pathStore={`${imageSampleData[i].pathStore}`}
                                           size={`${imageSampleData[i].size}`}
                                           width={`${imageSampleData[i].width}`}
                                           height={`${imageSampleData[i].height}`}
                                           status={`${imageSampleData[i].status}`}
                                       >
                                       </ImagePopover>
                                       { imageSampleData[i].status===1 &&
                                           <button type="button" className="btn btn-outline-primary mt-4" onClick={ () =>handleLabelImage(imageSampleData[i].imageId)}>
                                               Label it
                                           </button>
                                       }
                                   </div>
                                   )
                                  :''
                      )
                  )
              }
              </div>
              { (currentPage>1 || imageSampleData?.length>0) &&
                  <div className="Crawling-search-page-control row">
                        <Pagination className="col-12 m-2 p-2 justify-content-center">
                            <Pagination.Prev disabled={currentPage === 1} onClick={handlePagePrev}/>
                             <Pagination.Item active>{currentPage}</Pagination.Item>
                             <Pagination.Next onClick={handlePageNext}/>
                        </Pagination>
                  </div>
              }
          </div>
          <form onSubmit={labelAll}>
              {
                  imageSampleData?.length>0 && <button  type="submit" className="btn btn-outline-primary mt-4 mb-5">Label All</button>
              }
          </form>
      </div>
  )
}

export default Crawling;