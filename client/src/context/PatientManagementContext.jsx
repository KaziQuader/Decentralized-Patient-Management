import React, {createContext, useEffect, useState} from "react";
import Web3 from "web3";

const artifact = require("../contracts/PatientManagement.json")
const PatientManagementContext = createContext()
const {ethereum} = window

const getEthContract = () => {
    const {abi} = artifact
    const address  = artifact.networks[networkID].address
    const web3 = new Web3(Web3.givenProvider || "ws://localhost:8545")

    const networkID = web3.eth.net.getId();

    const patientContract = new web3.eth.Contract(abi, address)

    console.log({
        web3,
        patientContract
    })
}

export const  PatientProvider = ({children}) => {
    const checkIfWalletIsConn = () => {
        if (!ethereum) return alert("Plase Connect to a Waller")
            
        const accounts = ethereum.request({method: 'eth_accounts'})

        console.log(accounts)
    }

    useEffect(() => {
        checkIfWalletIsConn()
    }, [])

    return (
        <PatientManagementContext.Provider value={{value: 'test'}}>
            {children}
        </PatientManagementContext.Provider>
    )
}