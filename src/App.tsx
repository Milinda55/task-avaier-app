import './App.css'
import {Header} from "@/components/common/Header.tsx";
import {BorrowerPipeline} from "@/components/borrower/BorrowerPipeline.tsx";
import {BorrowerDetails} from "@/components/borrower/BorrowerDetails.tsx";
import {useState} from "react";
import type {BorrowerDetail} from "@/types";

function App() {

    const [activeBorrower, setActiveBorrower] = useState<BorrowerDetail | null>(null);

  return (
    <>
        <Header />
        <BorrowerPipeline />
        <BorrowerDetails activeBorrower={activeBorrower} />
    </>
  )
}

export default App
