/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import {
    Paper,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Table,
    TablePagination,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DownloadIcon from '@mui/icons-material/Download';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useCallback, useState } from 'react';
import IListTableProps from '../interfaces/components/table';
import { hasOwnProperty } from '../utils';

export const ListTable = <T extends {}>({
    title,
    entity,
    items,
    itemKey,
    hasDetail,
    creatable,
    editable,
    downloadable,
    deletable,
    deleteAction,
    deleteParams,
}: IListTableProps<T>) => {
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [page, setPage] = useState(0);

    const { pathname } = useLocation();

    const navigate = useNavigate();

    const heads = items.length
        ? Object.keys(items[0])
              .filter((key) => {
                  const value = items[0][key as keyof T];
                  return typeof value !== 'object';
              })
              .map((key) => key[0].toUpperCase() + key.slice(1))
        : [];
    const bodies = items.map((e) => Object.values(e)) as unknown as any[][];

    const handleChangePage = useCallback(
        (
            event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null,
            newPage: number
        ) => {
            setPage(newPage);
        },
        [setPage]
    );

    const handleChangeRowsPerPage = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            setRowsPerPage(parseInt(event.target.value, 10));
            setPage(0);
        },
        [setRowsPerPage, setPage]
    );

    return (
        <Paper className="mx-10 font-sans">
            <div className="flex justify-between mx-5 py-5">
                <div className="font-serif text-2xl text-body">{title}</div>
                {creatable && (
                    <Link
                        to={`${pathname}/create`}
                        className="text-primary hover:cursor-pointer"
                    >
                        {' '}
                        + New {entity ?? title}{' '}
                    </Link>
                )}
            </div>
            <Table>
                <TableHead>
                    <TableRow>
                        {heads.map((item, idx) => {
                            return (
                                <TableCell key={idx} align="center">
                                    <div className="text-lg">{item}</div>
                                </TableCell>
                            );
                        })}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {bodies
                        .slice(page * rowsPerPage, (page + 1) * rowsPerPage)
                        .map((row, idx) => {
                            let name = '';

                            const item = items[idx];

                            if (hasOwnProperty(item, itemKey)) {
                                name = item[itemKey] as unknown as string;
                            }

                            const nameWithSlash = name ? `/${name}` : '';

                            const deleteItem = () => {
                                if (!deleteAction) {
                                    return;
                                }

                                const args = ['id'];

                                if (deleteParams) {
                                    args.push(...deleteParams);
                                }

                                const values = args.map((key) => {
                                    if (hasOwnProperty(item, key)) {
                                        return item[key] as any;
                                    }
                                    return null;
                                });

                                deleteAction(...values);
                            };

                            return (
                                <TableRow
                                    key={idx}
                                    className="hover:cursor-pointer hover:bg-background"
                                    onClick={
                                        hasDetail
                                            ? (e) =>
                                                  navigate(
                                                      `${pathname}${nameWithSlash}`
                                                  )
                                            : undefined
                                    }
                                >
                                    {row.map((item: any, idx) => {
                                        if (typeof item === 'object') {
                                            return null;
                                        }

                                        return (
                                            <TableCell key={idx} align="center">
                                                {item ?? 'None'}
                                            </TableCell>
                                        );
                                    })}
                                    <TableCell align="center">
                                        {editable ? (
                                            <Link
                                                to={`${pathname}/update${nameWithSlash}`}
                                                onClick={(e) =>
                                                    e.stopPropagation()
                                                }
                                            >
                                                <EditIcon />
                                            </Link>
                                        ) : null}
                                        {downloadable ? (
                                            <Link
                                                to={`${pathname}/download${nameWithSlash}`}
                                                onClick={(e) =>
                                                    e.stopPropagation()
                                                }
                                            >
                                                <DownloadIcon />
                                            </Link>
                                        ) : null}
                                        {deletable && deleteAction ? (
                                            <div
                                                onClick={(e) =>
                                                    e.stopPropagation()
                                                }
                                            >
                                                <span
                                                    className="hover:cursor-pointer"
                                                    onClick={deleteItem}
                                                >
                                                    <DeleteIcon />
                                                </span>
                                            </div>
                                        ) : null}
                                        {deletable && !deleteAction ? (
                                            <Link
                                                to={`${pathname}/delete${nameWithSlash}`}
                                                onClick={(e) =>
                                                    e.stopPropagation()
                                                }
                                            >
                                                <DeleteIcon />
                                            </Link>
                                        ) : null}
                                    </TableCell>
                                </TableRow>
                            );
                        })
                        .filter((e) => !!e)}
                </TableBody>
            </Table>
            <TablePagination
                count={bodies.length}
                rowsPerPageOptions={[5, 10, 25, 50]}
                rowsPerPage={rowsPerPage}
                page={page}
                component="div"
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    );
};

export default ListTable;
