import { FC } from "react";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import ReadMoreIcon from "@mui/icons-material/ReadMore";
import { Link } from "react-router5";
import { Tooltip } from "@mui/material";

import { ITableBodyTemplateProps } from "./types";
import css from "./styles.module.scss";
import { Phones } from "../../../../components/shared/Phones";
import cn from "classnames";

const TableBodyTemplate: FC<ITableBodyTemplateProps> = ({
  rows,
  isLoadingItem,
}) => {
  return (
    <TableBody>
      {rows.map(({ id, phones, agencyName, createDate }) => {
        const classes = cn({
          [css.row__loading]: isLoadingItem(id),
        });

        return (
          <TableRow key={id} tabIndex={-1} className={classes}>
            <TableCell>{agencyName}</TableCell>

            <TableCell>{createDate}</TableCell>

            <TableCell>
              <div className={css.phones_cell}>
                <div className={css.phones}>
                  <Phones phones={phones} />
                </div>

                <Tooltip title="Подробнее" disableInteractive>
                  <span>
                    <Link
                      className={css.more_link}
                      routeName="agencies.agency"
                      routeParams={{ id }}
                    >
                      <ReadMoreIcon />
                    </Link>
                  </span>
                </Tooltip>
              </div>
            </TableCell>
          </TableRow>
        );
      })}
    </TableBody>
  );
};

export default TableBodyTemplate;