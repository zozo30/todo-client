import { useMemo } from "react";
import { useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as actions from '../../redux/actions'

type Actions = typeof actions

type BoundActions = { [K in keyof Actions]: Actions[K] };

export const useActions = (): BoundActions => {
    const dispatch = useDispatch();
    return useMemo(() => {
        return Object.keys(actions).reduce(
            (acc, actionName) => ({
                ...acc,
                [actionName]: bindActionCreators(actions[actionName as keyof typeof actions], dispatch)
            }),
            {} as BoundActions
        );
    }, [dispatch]);
};