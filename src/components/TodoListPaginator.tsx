import { MobileStepper, Button, useTheme, Breadcrumbs, Grid } from '@material-ui/core';
import { KeyboardArrowLeft, KeyboardArrowRight } from '@material-ui/icons'
import React, { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useApi } from '../hooks/graphql/useApi';
import { useActions } from '../hooks/redux/useActions';
import { todosActualPageSelector, todosMaxPageSelector, todosTotalRecordsSelector, todosCompletedFilterSelector, todosFilterTakeSelector } from '../redux/selectors'
import CompletedFilterType from '../types/CompletedFilterType';

function TodoListPaginator() {
    const theme = useTheme();

    const maxPage = useSelector(todosMaxPageSelector)
    const currentPage = useSelector(todosActualPageSelector)
    const totalRecords = useSelector(todosTotalRecordsSelector)
    const actualFilterType = useSelector(todosCompletedFilterSelector)
    const take = useSelector(todosFilterTakeSelector)
    const api = useApi()
    const { setTodoItems } = useActions()

    const paginate = useCallback((offsetPage: number) => {
        const skip = take * ((currentPage + offsetPage) - 1)

        const filters: any = {
            pagination: { skip, take },
            ...actualFilterType === CompletedFilterType.ALL ? {} : (actualFilterType === CompletedFilterType.COMPLETED ? { completed: true } : { completed: false })
        }

        api.getTodos(filters).then((data) => {
            setTodoItems(data)
        })
    }, [api, currentPage, setTodoItems, actualFilterType, take])

    const handleNext = useCallback(() => {
        paginate(1)
    }, [paginate]);

    const handleBack = useCallback(() => {
        paginate(-1)
    }, [paginate]);

    return (
        <Grid className="fluid" alignItems="center" container spacing={2}>
            <Grid item md={9} xs={12}>
                <MobileStepper
                    variant="progress"
                    steps={maxPage}
                    position="static"
                    activeStep={currentPage}
                    nextButton={
                        <Button size="small" onClick={handleNext} disabled={currentPage === maxPage}>
                            Next
          {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
                        </Button>
                    }
                    backButton={
                        <Button size="small" onClick={handleBack} disabled={currentPage === 1}>
                            {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
          Back
        </Button>
                    }
                />
            </Grid>
            <Grid item md={3} xs={12}>
                <Breadcrumbs aria-label="breadcrumb" className="breadcrumb">
                    <p>{currentPage}</p>
                    <p>{maxPage} Pages</p>
                    <p>{totalRecords} Records</p>
                </Breadcrumbs>
            </Grid>



        </Grid>
    )
}

export default React.memo(TodoListPaginator)