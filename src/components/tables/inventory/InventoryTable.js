import React, {useMemo, useState, useEffect} from 'react'
import {useTable, useSortBy, useGlobalFilter, useFilters, usePagination, useResizeColumns} from 'react-table'
import { Table, Button } from 'reactstrap';
import Loader from 'react-loader-spinner'
import { faArrowUp, faArrowDown} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// import DayPicker from '../../components/DayPicker'

import {COLUMNS, GROUPED_COLUMNS} from './inventoryColumns'
import Pagination from '../common/Pagination'
import { GlobalFilter } from '../common/GlobalFilter';

import getInventory from '../../../services/getInventory'

export const InventoryTable = () => {
    
    const [products, setProducts] = useState([])
    const [isLoading, setIsLoading] = useState(true);
    // const [dateRange, setdateRange] = useState({
    //     from: undefined,
    //     to: undefined,
    //     show: false
    // })
    const [filterNum, setfilterNum] = useState('')

    const defaultColumn = React.useMemo(
        () => ({
          minWidth: 30,
          width: 150,
          maxWidth: 400,
        }),
        []
      )

    // const filterRecords = async () => {
    //     console.log(dateRange)
    //     let filteredPayments = await filterPayments(dateRange.from, dateRange.to)
    //     console.log(filteredPayments)
    //     setPayments(filteredPayments)
    //     setfilterNum(filteredPayments.length)
    // }

    useEffect(async () => {
        setIsLoading(true)
        const records = await getInventory()
        records.forEach(p => {
            if(p.combinations) {
                p.combinations.forEach( c => {
                    p[c.size] = c.qty
                })
            }
        })
        setProducts(records)
        setIsLoading(false)
    }, []);
        
    const columns = useMemo(() => COLUMNS, [])
    const data = products

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page,
        allColumns,
        getToggleHideAllColumnsProps,
        nextPage,
        previousPage,
        canNextPage,
        canPreviousPage,
        pageOptions,
        gotoPage,
        pageCount,
        setPageSize,
        state,
        setGlobalFilter,
        prepareRow,

    } = useTable({
        columns,
        data,
        defaultColumn,
        useResizeColumns
    },
    useFilters,
    useGlobalFilter,
    useSortBy,
    usePagination
    )

    const {globalFilter, pageIndex, pageSize} = state

    return (
        <div>
            {
                isLoading ? 
                <Loader style={{marginLeft : "35%"}}
                    type="ThreeDots"
                    color="#00BFFF"
                    height={300}
                    width={300}
                /> :
                <div>
                    

                    <p className="alert alert-info"> {data.length} records.</p>
                    <div className="row">
                        <div className="col-12">
                            <input type="checkbox" {...getToggleHideAllColumnsProps()} />All Columns
                        </div>
                        {
                            allColumns.map(column => (
                                <div key={column.id} className="col-3" style={{float: "left"}}>
                                    <label>
                                        <input type="checkbox" {...column.getToggleHiddenProps()}/>
                                        {column.Header}
                                    </label>
                                </div>
                            ))
                        }
                    </div>

                    
                    {/* <DayPicker dateRange={dateRange} setdateRange={setdateRange} filterRecords={filterRecords}/>
                    {filterNum && (
                        filterNum>0 ?
                            <h6>{filterNum} records found.</h6>
                            : <h6>No records found.</h6>
                    )
                    } */}
                    <div className="mb-3">
                        <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter}/>
                    </div>                   

                    <Table size="sm"  dark hover {...getTableProps()} responsive style={{height: "200px"}}>
                        <thead style={{textAlign: 'center'}}> 
                            {headerGroups.map((headerGroups) => (
                                <tr {...headerGroups.getHeaderGroupProps()}>
                                    {
                                        headerGroups.headers.map( (column) => (
                                            <th {...column.getHeaderProps(column.getSortByToggleProps())} style={column.style}  >
                                                {column.render('Header')}
                                                <span>
                                                    {column.isSorted ? (column.isSortedDesc ? 
                                                        <FontAwesomeIcon icon={faArrowDown} size="1x"/>: 
                                                        <FontAwesomeIcon icon={faArrowUp} size="1x"/>) : ''}
                                                </span>
                                                <div placeholder="Search">{column.canFilter ? column.render('Filter') : null}</div>
                                            </th>
                                        ))
                                    }
                                </tr>
                            ))}
                            
                        </thead>
                        <tbody {...getTableBodyProps()}>
                            {
                                page.map( row => {
                                    prepareRow(row)
                                    return (
                                        <tr {...row.getRowProps()}>
                                            {row.cells.map((cell) => {
                                                return <td {...cell.getCellProps()} style={{textAlign: 'center'}} 
                                                >{cell.render('Cell')}</td>
                                            })}
                                            {/* <Button>Hello</Button> */}
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </Table>
                    <div>
                        <span>
                            Page{' '}
                        <strong> {pageIndex + 1} of {pageOptions.length}</strong> {' '}
                        </span>
                        <span>
                            | Go to Page: {' '}
                            <input type="number" defaultValue={pageIndex+1}
                            onChange={e => {
                                const pageNumber = e.target.value ? Number(e.target.value) - 1 : 0
                                gotoPage(pageNumber)
                            }} style={{width: "50px"}}/>
                        </span>
                        <select value={pageSize} onChange={(e) => setPageSize(Number(e.target.value))}>
                            {
                                [5,10,25,50,100].map((pageSize) => (
                                    <option key={pageSize} value={pageSize}>
                                        Show {pageSize}
                                    </option>
                                ))
                            }
                        </select>
                        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>{'<<'}</button>
                        <button onClick={() => previousPage()} disabled={!canPreviousPage}>Previous</button>
                        <button onClick={() => nextPage()} disabled={!canNextPage}>Next</button>
                        <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>{'>>'}</button>
                    </div>
                </div>
            }
        {/* <Pagination /> */}
        </div>
    )
}
