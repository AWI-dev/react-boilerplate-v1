import React, { useState } from "react";
import Breadcrumb from "../../components/common/Breadcrumb";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  SortDescriptor,
} from "@nextui-org/react";
import { API_BASE_URL } from "../../lib/constant";
import useDataFetcher from "../../hooks/useDataFetcher";
import useColumns from "../../hooks/useColumns";
import CustomPagination from "../../components/common/CustomPagination";
import useTable from "../../hooks/useTable";
import TableFilter from "../../components/table/TableFilter";

function AccountList() {
  const { data: dataList } = useDataFetcher(`${API_BASE_URL}products`, true);
  const baseFields = [
    { uid: "name", label: "Name", sortable: false },
    { uid: "detail", label: "DETAIL", sortable: false },
  ];

  const { initialColumns, columns } = useColumns(baseFields);
  const rowsPerPage = 10;
  const [page, setPage] = useState(1);

  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
    column: "id",
    direction: "ascending",
  });

  type DataItem = (typeof dataList)[0];

  const filterKey = [{ key: "name" }, { key: "detail" }];
  const {
    visibleColumns,
    headerColumns,
    filteredItems,
    filterValue,
    items,
    sortedItems,
    pages,
    RowsPerPage,
    setColumns,
    onSearchChange,
    onRowsPerPageChange,
  } = useTable(
    initialColumns,
    columns,
    dataList,
    filterKey,
    setPage,
    {},
    page,
    rowsPerPage,
    sortDescriptor,
    setSortDescriptor
  );

  //#region Rendering Table Content
  const renderCell = React.useCallback(
    (item: DataItem, columnKey: React.Key) => {
      const cellValue = item[columnKey as keyof DataItem];
      switch (columnKey) {
        default:
          return cellValue ?? "--";
      }
    },
    []
  );

  const topContent = React.useMemo(
    () => (
      <TableFilter
        title="Account"
        filterValue={filterValue}
        setFilterValue={onSearchChange}
        visibleColumns={visibleColumns}
        setColumns={setColumns}
        columns={columns}
        RowsPerPage={RowsPerPage}
        onRowsPerPageChange={onRowsPerPageChange}
        filteredItems={filteredItems}
      ></TableFilter>
    ),
    [
      filterValue,
      visibleColumns,
      onSearchChange,
      onRowsPerPageChange,
      dataList?.length,
    ]
  );

  const bottomContent = React.useMemo(
    () => <CustomPagination pages={pages} page={page} setPage={setPage} />,
    [items.length, page, pages, filterValue]
  );
  //#endregion

  return (
    <>
      <Breadcrumb
        pageName="Account"
        items={[{ name: "Dashboard", path: "/" }, { name: "Account" }]}
      />

      <Table
        isHeaderSticky
        bottomContent={bottomContent}
        bottomContentPlacement="outside"
        classNames={{
          wrapper: "max-h-[500px]",
        }}
        isStriped
        topContent={topContent}
        topContentPlacement="outside"
        showSelectionCheckboxes={false}
        sortDescriptor={sortDescriptor}
        onSortChange={setSortDescriptor}
      >
        <TableHeader columns={headerColumns}>
          {(column: any) => (
            <TableColumn
              className={
                column.uid === "action" ? "text-end pr-10" : "text-start"
              }
              key={column.uid}
              align={column.uid === "action" ? "end" : "start"}
              allowsSorting={column.sortable}
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody
          loadingContent={"LOADING"}
          emptyContent={
            <div className="flex justify-center py-10">
              {/* <img src={NoData} /> */}
            </div>
          }
          items={sortedItems}
        >
          {sortedItems ? (
            sortedItems.map((item, index) => (
              <TableRow key={item.key || index}>
                {/* Use index as fallback for the key */}
                {(columnKey) => (
                  <TableCell>
                    {/* Render index in a specific column or conditionally in renderCell */}
                    {columnKey === "index"
                      ? index + 1
                      : renderCell(item, columnKey)}
                  </TableCell>
                )}
              </TableRow>
            ))
          ) : (
            <TableRow key="null">
              {() => (
                <TableCell>
                  <p className="hidden"></p>
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  );
}

export default AccountList;
