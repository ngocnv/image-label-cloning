import {Button, OverlayTrigger, Popover} from "react-bootstrap";
import React, {useState} from "react";
import './ImagePopover.css';


const ImagePopover = ({name,imageId,md5,sourceUrl,pathStore,size,width,height,status,autoCloseDuration = 3000}) => {
    const [show,setShow] = useState(false);
    const handleToggle = () => {
        setShow(!show);
        if (!show) {
            setTimeout(() => setShow(false), autoCloseDuration);
        }
    };

    const popover = (
      <Popover id="popover-image-info" className="ImagePopover">
          <Popover.Header as="h3">{name}</Popover.Header>
          <Popover.Body>
              <div>
                  <div className="col-12 text-center">
                      <img src={sourceUrl} className="img-fluid" alt=""/>
                  </div>
                  <div className="row">
                      <div className="col-6"><small><mark>ImageId:</mark></small></div>
                      <div className="col-6"><small>{imageId}</small></div>
                  </div>
                  <div className="row">
                      <div className="col-6"><small><mark>Name:</mark></small></div>
                      <div className="col-6"><small>{name}</small></div>
                  </div>
                  <div className="row">
                      <div className="col-6"><small><mark>Md5:</mark></small></div>
                      <div className="col-6"><small>{md5}</small></div>
                  </div>
                  <div className="row">
                      <div className="col-6"><small><mark>Source url:</mark></small></div>
                      <div className="col-6"><small>{sourceUrl}</small></div>
                  </div>
                  <div className="row">
                      <div className="col-6"><small><mark>Input path stored:</mark></small></div>
                      <div className="col-6"><small>{pathStore}</small></div>
                  </div>
                  <div className="row">
                      <div className="col-6"><small><mark>Size:</mark></small></div>
                      <div className="col-6"><small>{size}</small></div>
                  </div>
                  <div className="row">
                      <div className="col-6"><small><mark>Width:</mark></small></div>
                      <div className="col-6"><small>{width}</small></div>
                  </div>
                  <div className="row">
                      <div className="col-6"><small><mark>Height:</mark></small></div>
                      <div className="col-6"><small>{height}</small></div>
                  </div>
                  <div className="row">
                      <div className="col-6"><small><mark>Status:</mark></small></div>
                      <div className="col-6">
                          {
                              status == '1' ? (<span className="badge bg-dark">Unlabeled</span>)
                                : status == '2' ? (<span className="badge bg-warning">Labeled</span>)
                                : status == '3' ? (<span className="badge bg-info">Cloud</span>)
                                      : (<></>)
                          }
                      </div>
                  </div>
              </div>
          </Popover.Body>
      </Popover>
    )

      return (
          <OverlayTrigger onToggle={handleToggle} trigger="click" placement="auto-start" overlay={popover}>
              <div className="flex-wrap p-2">
                  <img src={sourceUrl} className="img-fluid" alt=""/>
                  <div className="row">
                      <div className="col-6"><small><mark>imageId:</mark></small></div>
                      <div className="col-6"><small>{imageId}</small></div>
                  </div>
                  <div className="row">
                      <div className="col-6"><small>size:</small></div>
                      <div className="col-6"><small>{size}</small></div>
                  </div>
                  <div className="row">
                      <div className="col-6"><small>width:</small></div>
                      <div className="col-6"><small>{width}</small></div>
                  </div>
                  <div className="row">
                      <div className="col-6"><small>height:</small></div>
                      <div className="col-6"><small>{height}</small></div>
                  </div>
                  <div className="row">
                      <div className="col-6"><small>status:</small></div>
                      <div className="col-6">
                          {
                              status == '1' ? (<span className="badge bg-dark">Unlabeled</span>)
                                  : status == '2' ? (<span className="badge bg-warning">Labeled</span>)
                                      : status == '3' ? (<span className="badge bg-info">Cloud</span>)
                                          : (<></>)
                          }
                      </div>
                  </div>
              </div>
          </OverlayTrigger>
      );
}

export default ImagePopover