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
  Spinner,
  Button,
} from "@nextui-org/react";
import { API_BASE_URL } from "../../lib/constant";
import useDataFetcher from "../../hooks/useDataFetcher";
import useColumns from "../../hooks/useColumns";
import CustomPagination from "../../components/common/CustomPagination";
import useTable from "../../hooks/useTable";
import TableFilter from "../../components/table/TableFilter";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../../components/ui/sheet";
import withSheet from "../../components/hoc/withSheet";

function AccountList() {
  const { data: dataList, isLoading } = useDataFetcher(
    `${API_BASE_URL}products`,
    true
  );
  const baseFields = [
    { uid: "name", label: "name", sortable: false },
    { uid: "detail", label: "detail", sortable: false },
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

  const DeleteAccountComponent = () => {
    return (
      <>
        <p>Are you sure you want to delete your account?</p>
        <button className="btn btn-danger">Confirm Delete</button>
      </>
    );
  };

  const DeleteAccountWithSheet = withSheet(DeleteAccountComponent);

  return (
    <>
      <Breadcrumb
        pageName="Account"
        items={[{ name: "Dashboard", path: "/" }, { name: "Account" }]}
      />

      <DeleteAccountWithSheet
        triggerText="Add"
        title="Create Account"
        description="Create a new account"
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
              className={`uppercase
                ${column.uid} === "action" ? "text-end pr-10" : "text-start"
              `}
              key={column.uid}
              align={column.uid === "action" ? "end" : "start"}
              allowsSorting={column.sortable}
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody
          isLoading={true}
          loadingContent={<Spinner label="Loading..." />}
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
