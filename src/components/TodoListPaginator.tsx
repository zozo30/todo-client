import { MobileStepper, Button, useTheme, Breadcrumbs, Grid } from '@material-ui/core';
import { KeyboardArrowLeft, KeyboardArrowRight } from '@material-ui/icons'
import React, { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useApi } from '../hooks/graphql/useApi';
import { useActions } from '../hooks/redux/useActions';
import { todosMaxPagesSelector, todosCurrentPageSelector, todosIsPaginatingSelector, todosTotalRecordsSelector, todosCompletedFilterSelector } from '../redux/selectors/todoSelectors'
import CompletedFilterType from '../types/CompletedFilterType';

function TodoListPaginator() {
    const theme = useTheme();

    const maxPage = useSelector(todosMaxPagesSelector)
    const currentPage = useSelector(todosCurrentPageSelector)
    const isPaginate = useSelector(todosIsPaginatingSelector)
    const totalRecords = useSelector(todosTotalRecordsSelector)
    const actualFilterType = useSelector(todosCompletedFilterSelector)

    const api = useApi()
    const { todoSetItems } = useActions()

    const take = 10

    const paginate = useCallback((offsetPage: number) => {
        const skip = take * ((currentPage + offsetPage) - 1)

        const filters: any = Object.assign(
            { pagination: { skip, take } },
            actualFilterType === CompletedFilterType.ALL ? {} : (actualFilterType === CompletedFilterType.COMPLETED ? { completed: true } : { completed: false }))

        api.getTodos(filters).then((data) => {
            todoSetItems(data)
        }).catch(() => {

        })
    }, [api, currentPage, todoSetItems, actualFilterType])

    const handleNext = useCallback(() => {
        if (isPaginate) return
        paginate(1)
    }, [paginate, isPaginate]);

    const handleBack = useCallback(() => {
        if (isPaginate) return
        paginate(-1)
    }, [paginate, isPaginate]);

    return (
        <Grid className="fluid" alignItems="center" container spacing={2}>
            <Grid item xs={9}>
                <MobileStepper
                    variant="progress"
                    steps={maxPage}
                    position="static"
                    activeStep={currentPage}
                    nextButton={
                        <Button size="small" onClick={handleNext} disabled={isPaginate || currentPage === maxPage}>
                            Next
          {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
                        </Button>
                    }
                    backButton={
                        <Button size="small" onClick={handleBack} disabled={isPaginate || currentPage === 1}>
                            {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
          Back
        </Button>
                    }
                />
            </Grid>
            <Grid item xs={3}>
                <Breadcrumbs aria-label="breadcrumb">
                    <p>{currentPage}</p>
                    <p>{maxPage} Pages</p>
                    <p>{totalRecords} Records</p>
                </Breadcrumbs>
            </Grid>



        </Grid>
    )
}

export default React.memo(TodoListPaginator)