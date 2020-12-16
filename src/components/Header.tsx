import { useSelector } from "react-redux"
import { isFetchingSelector } from "../redux/selectors"
import { LinearProgress } from '@material-ui/core'
import React from "react"

function Header() {
    const isFetching = useSelector(isFetchingSelector)
    return (
        <header className="app-header">
            {isFetching ? <LinearProgress /> : null}
        </header >
    )
}

export default React.memo(Header)