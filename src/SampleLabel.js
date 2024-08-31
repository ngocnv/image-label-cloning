import './SampleLabel.css';
import {Link,useNavigate} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {Button, Modal} from "react-bootstrap";
import axios from "axios";


const SampleLabel= ()=>{
    let navigate = useNavigate();
    const [showPopup,setShowPopup] =useState(false);
    const [selectedItemId,setSelectedItemId] = useState(null);
    const [listLabel,setListLabel] = useState([]);
    const handleCancel=()=>{
        setShowPopup(false);
    }

    const fetchListLabel = async () =>{
        try{
            let response = await axios.get("http://localhost:8000/labels");
            setListLabel(response.data);
        }catch (error){
            console.log("Error to fetch labels",error);
        }
    }

    useEffect(()=>{
        fetchListLabel().then(()=>{});
    },[])

    const handleClickDeleteBtn = (labelId) =>{
        setSelectedItemId(labelId);
        setShowPopup(true);
    }

    const sendDeleteLabel = async () => {
        try {
            let response = await axios.delete(`http://localhost:8000/labels/${selectedItemId}`);
            setListLabel(listLabel.filter(l => l.labelId!=selectedItemId));
        } catch (error) {
            console.log("Failed to delete", error);
        }
    }
    const handleConfirmDelete = ()=>{
        sendDeleteLabel().then(()=>{});
        setShowPopup(false);
    }
    return (
        <div className="Sample-label">
            <h5 className="m-2 text-black-50">Label</h5>
            <hr/>

            <div className="sample-label-result m-2 p-2">
                <div className="row">
                    <table className="table table-striped table-hover">
                        <thead>
                        <tr>
                            <th scope="col">id</th>
                            <th scope="col">name</th>
                            <th scope="col">path</th>
                            <th scope="col">action</th>
                        </tr>
                        </thead>
                        <tbody>
                        {listLabel.map( label =>   (
                            <tr key={label.labelId}>
                                <th scope="row">{label.labelId}</th>
                                <td>{label.labelName}</td>
                                <td>{label.labelPath}</td>
                                <th>
                                    <Link onClick={()=>handleClickDeleteBtn(label.labelId)}>Delete</Link>
                                    <Link to={`${label.labelId}`} className="mx-lg-2" onClick={()=>{}}>Detail</Link>
                                </th>
                            </tr>
                        )
                        )}
                        </tbody>
                    </table>
                    <Modal show={showPopup} onHide={handleCancel}>
                        <Modal.Header closeButton>
                            <Modal.Title>Confirm Delete</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            Are you sure you want to delete ?
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleCancel}>
                                No
                            </Button>
                            <Button variant="danger" onClick={handleConfirmDelete}>
                                Yes
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </div>
            </div>
            <Link to="new">
                <button type="button" className="btn btn-outline-primary m-1">New</button>
            </Link>
        </div>
    )
}

export default SampleLabel;