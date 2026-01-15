import LargeStatCard from "@/components/cards/LargeStatCard"

const Test=()=>{
    return(
        <div>
            <h1>Test</h1>
            <hr />
            <LargeStatCard  amount={1000} title="Total Balance" type="BALANCE" percentage="10.1"/>
        </div>
    )
}
export default Test