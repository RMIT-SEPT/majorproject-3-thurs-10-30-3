import React, { useState, useEffect, useRef } from "react";
import SuperLayout from "./AdminLayout";
import "./EditWorker.scss";
import { currentUser, readUser } from "../../API/userAPI";
import { getBusiness } from "../../API/businessAPI";
import EditWorkerForm from "./EditWorkerForm";
import Modal from "../../Template/Modal"

const EditWorker = ({ history, location }) => {

  const [error, setError] = useState("")
  const [user, setUser] = useState()
  const [business, setBusiness] = useState({})

  const [editFormOpened, setEditFormOpened] = useState(false)
  const [selectedWorker, setSelectedWorker] = useState()

  useEffect(() => {
    currentUser().then((data) => {
      if (data.errors) {

      } else {
        setUser(data.currentUser)

        getBusiness({ businessId: data.currentUser.businessId }).then((data) => {
          setBusiness(data)
          populateWorkerData(data.workers)
        }).catch()
      }
    }).catch()


  }, [])

  const populateWorkerData = (workers) => {
    var length = workers.length
    var count = 0
    var newWorkers = []
    workers.map((w) => {
      readUser({ userId: w }).then((data) => {
        if (length - 1 === count) {
          newWorkers.push(data)
          setBusiness({ ...business, workers: newWorkers })

        } else {
          newWorkers.push(data)
          count = +1
        }
      }).catch()
    })
  }

  const handleEdit = (worker) => () => {
    console.log("worekr : ", worker)
    setSelectedWorker(worker)
    setEditFormOpened(true)
  }

  const renderWorkers = () => {
    return (
      <table className="table-cont" >
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Shift</th>
          <th>Days</th>
        </tr>

        {business.workers?.map((w, index) => {
          return (
            <tr className="tr">
              <td>{w.name}</td>
              <td>{w.email}</td>
              <td>{w.shift}</td>
              <td>{w.days?.map((d) => <span>{d} </span>)}</td>
              <td className="edit-btn btn" onClick={handleEdit(w)}>Edit</td>
            </tr>
          )
        })}
      </table >
    )

  }


  const editWorkerModalStyle = {
    width: '50vw',
    height: '47vw'
  }

  return (
    <SuperLayout >
      <div className="super-cont row AIC JCC">
        <div className="edit-worker-cont">
          {renderWorkers()}
        </div>
      </div>

      <Modal opened={editFormOpened} setOpened={setEditFormOpened} options={editWorkerModalStyle}>
        <EditWorkerForm reference={useRef({ setOpened: setEditFormOpened })} worker={selectedWorker} />
      </Modal>
    </SuperLayout>
  );
};

export default EditWorker;
