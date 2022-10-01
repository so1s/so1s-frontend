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
import { Link } from 'react-router-dom';
import { useCallback, useState } from 'react';
import { useAtom } from 'jotai';
import currentPage from '../atoms/current-page';
import IListTableProps from '../interfaces/components/table';
import { hasOwnProperty } from '../utils';

export const ListTable = <T extends {}>({
    items,
    editable,
    downloadable,
}: IListTableProps<T>) => {
    const [pageInfo] = useAtom(currentPage);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [page, setPage] = useState(0);

    const heads = items.length
        ? Object.keys(items[0]).map(
              (key) => key[0].toUpperCase() + key.slice(1)
          )
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
                <div className="font-serif text-2xl text-body">Models</div>
                <Link
                    to={`${pageInfo?.uri}/create`}
                    className="text-primary hover:cursor-pointer"
                >
                    {' '}
                    + New Models{' '}
                </Link>
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

                            if (hasOwnProperty(item, 'name')) {
                                name = item.name as string;
                            }

                            const nameWithSlash = name ? `/${name}` : '';

                            return (
                                <TableRow key={idx}>
                                    {row.map((item: any, idx) => {
                                        return (
                                            <TableCell key={idx} align="center">
                                                {item}
                                            </TableCell>
                                        );
                                    })}
                                    <TableCell align="center">
                                        {editable ? (
                                            <Link
                                                to={`${pageInfo?.uri}/update${nameWithSlash}`}
                                            >
                                                <EditIcon />
                                            </Link>
                                        ) : null}
                                        {downloadable ? (
                                            <Link
                                                to={`${pageInfo?.uri}/download${nameWithSlash}`}
                                            >
                                                <DownloadIcon />
                                            </Link>
                                        ) : null}
                                    </TableCell>
                                </TableRow>
                            );
                        })}
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
