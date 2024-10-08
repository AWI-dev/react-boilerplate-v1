import React from "react";
import {
  Input,
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Select,
  SelectItem,
} from "@nextui-org/react";
import { Search, ChevronDown } from "lucide-react";

interface TableFilterProps {
  title: any;
  filterValue: any;
  setFilterValue: any;
  visibleColumns: any;
  setColumns: (selected: any) => void;
  columns: any;
  RowsPerPage: any;
  onRowsPerPageChange: any;
  children?: React.ReactNode; // Define children prop type
  filteredItems: any;
  
}

const TableFilter: React.FC<TableFilterProps> = ({
  title,
  filterValue,
  setFilterValue,
  visibleColumns,
  setColumns,
  columns,
  RowsPerPage,
  onRowsPerPageChange,
  children = null, // Set default value to null
  filteredItems,
}) => {
  const onSearchChange = (value?: string) => {
    setFilterValue(value || "");
  };

  const onClear = () => {
    setFilterValue("");
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between gap-3 items-end">
        <Input
          isClearable
          size="md"
          className="w-full"
          placeholder="Search"
          startContent={<Search size={16} />}
          value={filterValue}
          onClear={onClear}
          onValueChange={onSearchChange}
        />
        <div className="mt-5 lg:mt-0 flex items-center gap-3">
          <Dropdown aria-label="dropdown">
            <DropdownTrigger className="bg-default-100 shadow-sm">
              <Button
                className="text-default-600 text-xs md:text-sm"
                size="md"
                endContent={
                  <ChevronDown
                    className="text-small text-default-500"
                    size={15}
                  />
                }
                variant="flat"
              >
                Columns
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              disallowEmptySelection
              aria-label="Table Columns"
              closeOnSelect={false}
              selectedKeys={visibleColumns}
              selectionMode="multiple"
              onSelectionChange={setColumns}
            >
              {columns.map((column: any) => (
                <DropdownItem key={column.uid} className="capitalize font-body">
                  {column.name}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>

          <div className="flex gap-3">
            <Select
              size="md"
              aria-label="select"
              onChange={onRowsPerPageChange}
              items={RowsPerPage}
              placeholder="Rows"
              className="max-w-24 w-24"
            >
              {(rowsPerPage: any) => (
                <SelectItem key={rowsPerPage.value}>
                  {rowsPerPage.label}
                </SelectItem>
              )}
            </Select>
          </div>
        </div>
      </div>
      {children && <>{children}</>}
      <div className="flex justify-between items-center">
        <span className="text-default-400 text-small">
          Total {filteredItems?.length} {title}
        </span>
      </div>
    </div>
  );
};

export default TableFilter;
