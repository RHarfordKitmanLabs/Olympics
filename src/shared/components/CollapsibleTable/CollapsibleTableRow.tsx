import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  Typography,
  Collapse,
  Box,
} from "@mui/material";
import { Fragment, useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { Header, RowValue } from "./types";

const CollapsibleTableRow = ({
  row,
  keys,
  childrenHeaders,
  childrenTitle,
}: {
  row: RowValue;
  keys: string[];
  childrenTitle: string | null;
  childrenHeaders: Header[];
}) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <TableRow>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen((prev) => !prev)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        {keys.map((key: string) => (
          <TableCell key={key}>{row[key]}</TableCell>
        ))}
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              {childrenTitle && (
                <Typography variant="h6" gutterBottom component="div">
                  {childrenTitle}
                </Typography>
              )}
              <Table size="small" aria-label="sub-rows">
                <TableHead>
                  <TableRow>
                    {childrenHeaders.map(({ label, key }) => (
                      <TableCell key={key}>{label}</TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.children.map((child) => (
                    <Fragment key={child.id}>
                      <TableRow>
                        {childrenHeaders.map(({ key }: { key: string }) => (
                          <TableCell key={key}>{child[key]}</TableCell>
                        ))}
                      </TableRow>
                    </Fragment>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

export default CollapsibleTableRow;
