import { Snackbar } from '@material-ui/core'
import MuiAlert from '@material-ui/lab/Alert';
import { useSelector } from 'react-redux'
import { useActions } from '../hooks/redux/useActions'
import { snackBarFailureOpenSelector, snackBarFailureMessagesSelector } from '../redux/selectors/appSelectors'
import SnackBarActionType from '../types/SnackBarActionType';
import SnackBarType from '../types/SnackBarType';

function Alert(props: any) {
    return <MuiAlert elevation={6} variant="filled" {...props} />
}

export default function FailureSnackBar() {

    const snackBarIsOpen = useSelector(snackBarFailureOpenSelector)
    const snackBarMessages = useSelector(snackBarFailureMessagesSelector)

    const { setSnackBar } = useActions()

    const handleClose = () => {
        setSnackBar(SnackBarActionType.CLEAR, SnackBarType.ERROR)
    }

    const AlertList = (props: { messages: string[] }) => {
        const { messages } = props;
        const alertList = messages.map((message, i) => (<Alert severity="error" key={`alert-${i}`}>{message}</Alert>));
        return (<>{alertList}</>);
    }

    return (
        <Snackbar
            anchorOrigin={{
                vertical: "bottom",
                horizontal: "left"
            }}
            open={snackBarIsOpen}
            autoHideDuration={4000}
            onClose={handleClose}
        >
            <AlertList messages={snackBarMessages} />
        </Snackbar>
    )
}