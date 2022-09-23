import {
    Paper,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Table,
    TablePagination,
} from '@mui/material';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import DownloadIcon from '@mui/icons-material/Download';
import { Link } from 'react-router-dom';
import { useCallback, useState } from 'react';
import { useAtom } from 'jotai';
import currentPage from '../atoms/current-page';
import IListTableProps from '../interfaces/components/table';

const ListTable: React.FC<IListTableProps> = ({
    headEl,
    bodyEl,
    isAddUpdateCol,
}) => {
    const [pageInfo] = useAtom(currentPage);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [page, setPage] = useState(0);

    const handleChangePage = useCallback((event: unknown, newPage: number) => {
        setPage(newPage);
    }, []);

    const handleChangeRowsPerPage = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            setRowsPerPage(parseInt(event.target.value, 10));
            setPage(0);
        },
        []
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
                        {headEl.map((item, idx) => {
                            return (
                                <TableCell key={idx} align="center">
                                    <div className="text-lg">{item}</div>
                                </TableCell>
                            );
                        })}
                        {isAddUpdateCol ? <TableCell /> : ''}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {bodyEl
                        .slice(page * rowsPerPage, (page + 1) * rowsPerPage)
                        .map((row, idx) => {
                            return (
                                <TableRow key={idx}>
                                    {row.map((item, idx) => {
                                        return (
                                            <TableCell key={idx} align="center">
                                                {item}
                                            </TableCell>
                                        );
                                    })}
                                    {isAddUpdateCol ? (
                                        <TableCell align="center">
                                            <Link
                                                to={`${pageInfo?.uri}/update`}
                                            >
                                                <FileUploadIcon />
                                            </Link>
                                            <Link
                                                to={`${pageInfo?.uri}/update`}
                                            >
                                                <DownloadIcon />
                                            </Link>
                                        </TableCell>
                                    ) : (
                                        ''
                                    )}
                                </TableRow>
                            );
                        })}
                </TableBody>
            </Table>
            <TablePagination
                count={bodyEl.length}
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