import { useSelector } from "react-redux"
import { isFetchingSelector } from "../redux/selectors/appSelectors"
import { LinearProgress } from '@material-ui/core'

export function Header() {
    const isFetching = useSelector(isFetchingSelector)
    return (
        <header className="app-header">
            {isFetching ? <LinearProgress /> : null}
        </header >
    )
}