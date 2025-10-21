import React, { useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"

import '../style/layout.css'

import rest from '../rest/rest'

import SideBar from "./SideBar"
import Header from "./Header"
import DeviceModel from "../model/DeviceModel"

type Props = {
    children: React.ReactNode;
}

export default function Layout({ children }: Props) {
    const navigator = useNavigate()
    const calledRef = useRef(false);

    const local_uuid = localStorage.getItem("device_uuid") || ""

    const [myDevice, setMyDevice] = useState<DeviceModel>()
    const [allDevice, setAllDevice] = useState<DeviceModel[]>()

    useEffect(() => {
        if (calledRef.current) return;
        calledRef.current = true;

        if (local_uuid === "") {
            navigator("/init")
            return;
        }

        loadData()

    }, [])

    const loadData = async () => {
        rest.auth(local_uuid).then((data) => {
            setMyDevice(data)
            rest.getAllClient(local_uuid).then((data) => {
                setAllDevice(data.clients)
            })
        }).catch((err: any) => {
            console.error("Auth Failed: ", err.status, err.message)
        })
    }



    return (
        <div className="body">
            {
                (
                    <SideBar local_uuid={local_uuid} myDevice={myDevice} devicesList={allDevice} />
                )
            }
            <div className="content">
                {
                    (
                        <Header />
                    )
                }
                <div className="content-body">
                    {children}
                </div>
            </div>
        </div>
    )
}