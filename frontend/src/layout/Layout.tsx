import React, { useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"

import '../style/layout.css'

import SideBar from "./SideBar"
import Header from "./Header"

type Props = {
    children: React.ReactNode;
}

export default function Layout({ children }: Props) {
    const navigator = useNavigate()
    const calledRef = useRef(false);

    const local_uuid = localStorage.getItem("device_uuid") || ""

    useEffect(() => {
        if (calledRef.current) return;
        calledRef.current = true;
    }, [])



    return (
        <div className="body">
            {
                (
                    <SideBar local_uuid={local_uuid} />
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