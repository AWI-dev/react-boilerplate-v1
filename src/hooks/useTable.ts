import { Selection } from "@nextui-org/react";
import React from "react";

const useTable = (
    initialColumns: any,
    columns: any,
    dataList: any[],
    filters: { key: string }[], // General text search filters
    setPage: React.Dispatch<React.SetStateAction<number>>,
    additionalFilters: { [key: string]: any } = {}, // Default to empty object
    page: number,
    rowsPerPage: number,
    sortDescriptor: any,
    setRowsPerPage: any
) => {

    //#region Initialization
    const INITIAL_VISIBLE_COLUMNS = initialColumns;
    const [visibleColumns, setVisibleColumns] = React.useState<Selection>(new Set(INITIAL_VISIBLE_COLUMNS));

    const headerColumns = React.useMemo(() => {
        if (visibleColumns === "all") return columns;
        return columns.filter((column: any) => Array.from(visibleColumns).includes(column.uid));
    }, [visibleColumns, columns]);

    const setColumns = (columns: any) => setVisibleColumns(columns);
    //#endregion

    //#region Filtering
    const [filterValue, setFilterValue] = React.useState("");

    const getNestedValue = (obj: any, key: string) => key.split(".").reduce((o: any, k: string) => o ? o[k] : undefined, obj);

    const normalizeFilterValue = (filterValue: any) => Array.isArray(filterValue) ? filterValue : [filterValue?.value || filterValue];

    const onSearchChange = (search: string) => {
        setFilterValue(search);
        setPage(1);
    };

    const onClear = () => {
        setFilterValue("");
        setPage(1);
    };

    const filteredItems = React.useMemo(() => {
        const lowerCaseFilterValue = filterValue.toLowerCase();

        return dataList?.filter(data => {
            const matchesFilterValue = filters.some(filter => {
                const value = getNestedValue(data, filter.key);
                return !filterValue || (value?.toLowerCase().includes(lowerCaseFilterValue));
            });

            const matchesAdditionalFilters = Object.entries(additionalFilters).every(([key, filterValue]) => {
                const value = getNestedValue(data, key);
                const normalValue = normalizeFilterValue(filterValue);

                if (normalValue.toString() === "all") return true;
                return normalValue.includes(value);
            });

            return matchesFilterValue && matchesAdditionalFilters;
        });
    }, [dataList, filterValue, filters, additionalFilters]);
    //#endregion

    //#region Sorting & Pagination
    const RowsPerPage = React.useMemo(() => [
        { label: "10", value: "10" },
        { label: "20", value: "20" },
        { label: "50", value: "50" },
        { label: "100", value: "100" },
        { label: "All", value: filteredItems ? String(filteredItems.length) : "0" }, // Ensure filteredItems is defined
    ], [filteredItems]);


    const start = (page - 1) * rowsPerPage;
    const items = React.useMemo(() => {
        const safeFilteredItems = filteredItems || [];
        return rowsPerPage === safeFilteredItems.length
            ? safeFilteredItems
            : safeFilteredItems.slice(start, start + rowsPerPage);
    }, [filteredItems, rowsPerPage, start]);


    const pages = React.useMemo(() => {
        const safeFilteredItems = filteredItems || []; // Ensure filteredItems is always an array
        return Math.max(Math.ceil(safeFilteredItems.length / rowsPerPage), 1);
    }, [filteredItems, rowsPerPage]);


    const sortedItems = React.useMemo(() => {
        return [...items].sort((a, b) => {
            const first = a[sortDescriptor.column];
            const second = b[sortDescriptor.column];
            return first === second ? 0 : (first < second ? -1 : 1) * (sortDescriptor.direction === "descending" ? -1 : 1);
        });
    }, [items, sortDescriptor]);

    const onRowsPerPageChange = React.useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
        setRowsPerPage(Number(e.target.value));
        setPage(1);
    }, [setRowsPerPage, setPage]);
    //#endregion

    return { visibleColumns, headerColumns, filteredItems, filterValue, items, sortedItems, pages, RowsPerPage, setColumns, onSearchChange, onClear, onRowsPerPageChange };
};

export default useTable;
