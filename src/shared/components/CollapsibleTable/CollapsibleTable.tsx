import {
  Paper,
  Table,
  TableHead,
  TableRow,
  TableContainer,
  TableCell,
  TableBody,
} from "@mui/material";
import { Fragment } from "react";
import { Header, RowValue } from "./types";
import CollapsibleTableRow from "@shared/components/CollapsibleTable/CollapsibleTableRow";

const CollapsibleTable = ({
  headers,
  childrenHeaders,
  childrenTitle,
  rows,
}: {
  headers: Header[];
  childrenHeaders: Header[];
  childrenTitle: string | null;
  rows: RowValue[];
}) => {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            {headers.map(({ label, key }) => (
              <TableCell key={key}>{label}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <Fragment key={row.id}>
              <CollapsibleTableRow
                row={row}
                keys={headers.map(({ key }) => key)}
                childrenHeaders={childrenHeaders}
                childrenTitle={childrenTitle}
              />
            </Fragment>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CollapsibleTable;
