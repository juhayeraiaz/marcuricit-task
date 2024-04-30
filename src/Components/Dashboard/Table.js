import React, { useMemo } from 'react';
import { Table as BSTable, Form } from 'react-bootstrap';
import { useTable, useSortBy, useGlobalFilter, usePagination } from 'react-table';

const Table = ({ columns, data, pageSize, sizePerPageList, isSortable, pagination, isSearchable }) => {
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        state,
        setGlobalFilter,
        page,
        nextPage,
        previousPage,
        canNextPage,
        canPreviousPage,
        gotoPage,
        pageCount,
        setPageSize,
    } = useTable(
        {
            columns,
            data,
            initialState: { pageSize },
        },
        useGlobalFilter,
        useSortBy,
        usePagination
    );
    console.log(data)
    const { pageIndex, globalFilter } = state;

    const renderPagination = useMemo(() => {
        if (!pagination) return null;

        return (
            <div className="d-flex justify-content-between align-items-center mt-3">
                <div>
                    <span>
                        Page{' '}
                        <strong>
                            {pageIndex + 1} of {pageCount}
                        </strong>{' '}
                    </span>
                    <span>
                        | Go to page:{' '}
                        <input
                            type="number"
                            defaultValue={pageIndex + 1}
                            onChange={(e) => {
                                const pageNumber = e.target.value ? Number(e.target.value) - 1 : 0;
                                gotoPage(pageNumber);
                            }}
                            style={{ width: '50px' }}
                        />
                    </span>
                </div>
                <div>
                    <select
                        value={pageSize}
                        onChange={(e) => setPageSize(Number(e.target.value))}
                        style={{ width: '120px', height: '38px' }}
                    >
                        {sizePerPageList.map(({ text, value }) => (
                            <option key={value} value={value}>
                                {text}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
                        {'<<'}
                    </button>{' '}
                    <button onClick={() => previousPage()} disabled={!canPreviousPage}>
                        Previous
                    </button>{' '}
                    <button onClick={() => nextPage()} disabled={!canNextPage}>
                        Next
                    </button>{' '}
                    <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
                        {'>>'}
                    </button>{' '}
                </div>
            </div>
        );
    }, [
        canNextPage,
        canPreviousPage,
        gotoPage,
        nextPage,
        pageCount,
        pageIndex,
        pageSize,
        pagination,
        previousPage,
        setPageSize,
        sizePerPageList,
    ]);

    return (
        <>
            {isSearchable && (
                <div className="mb-3">
                    <Form.Control
                        type="text"
                        value={globalFilter || ''}
                        onChange={(e) => setGlobalFilter(e.target.value)}
                        placeholder="Search..."
                    />
                </div>
            )}
            <BSTable striped bordered hover {...getTableProps()}>
                <thead>
                    {headerGroups.map((headerGroup) => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map((column) => (
                                <th {...column.getHeaderProps(isSortable ? column.getSortByToggleProps() : {})}>
                                    {column.render('Header')}
                                    {isSortable && (
                                        <span>
                                            {column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''}
                                        </span>
                                    )}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {page.map((row) => {
                        prepareRow(row);
                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map((cell) => (
                                    <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                ))}
                            </tr>
                        );
                    })}
                </tbody>
            </BSTable>
            {renderPagination}
        </>
    );
};

export default Table;
