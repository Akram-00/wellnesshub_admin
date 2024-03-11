"use client";
import React from "react";
import { useTable } from "react-table";
import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import Paper from "@mui/material/Paper";
import StyledTableRow from "@/styles/StyledTableRow";
import StyledTableCell from "@/styles/StyledTableCell";

const page = () => {
  const [data, setData] = React.useState<any>([]);
  React.useEffect(() => {
    getUserData();
  }, []);
  const getUserData = async () => {
    try {
      const response = await fetch(
        process.env.NEXT_PUBLIC_BACKEND_API + "/admin/userData",
        {
          method: "GET",
          credentials: "include",
        }
      );

      const data = await response.json();
      if (data.ok) {
        setData(data.data);
      } else {
        console.error("Error in generating the workout data");
        setData([]);
      }
    } catch (error) {
      console.log(error);
      setData([]);
    }
  };

  const memoizedData = React.useMemo(() => data, [data]);
  const columns = React.useMemo(
    () => [
      {
        Header: "User Information",
        columns: [
          {
            Header: "ID",
            accessor: "_id",
          },
          {
            Header: "Name",
            accessor: "name",
          },
          {
            Header: "Email",
            accessor: "email",
          },
          {
            Header: "DOB",
            accessor: "dob",
          },
        ],
      },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data: memoizedData });

  return (
    <TableContainer component={Paper}>
      <Table {...getTableProps()}>
        <TableHead>
          {headerGroups.map((headerGroup, index) => (
            <StyledTableRow
              key={`headerGroup-${index}`}
              {...headerGroup.getHeaderGroupProps()}
            >
              {headerGroup.headers.map((column) => (
                <StyledTableCell
                  key={`header-${column.id}`}
                  {...column.getHeaderProps()}
                >
                  {column.render("Header")}
                </StyledTableCell>
              ))}
            </StyledTableRow>
          ))}
        </TableHead>
        <TableBody {...getTableBodyProps()}>
          {rows.map((row, index) => {
            prepareRow(row);
            return (
              <StyledTableRow key={`row-${index}`} {...row.getRowProps()}>
                {row.cells.map((cell, cellIndex) => (
                  <StyledTableCell
                    key={`cell-${index}-${cellIndex}`}
                    {...cell.getCellProps()}
                  >
                    {cell.render("Cell")}
                  </StyledTableCell>
                ))}
              </StyledTableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default page;
