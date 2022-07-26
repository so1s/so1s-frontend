import { useState } from 'react';
import { Box, Paper, Tab, Tabs } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';
import {
    IDetailCardProps,
    ITabPanelProps,
} from '../../interfaces/components/detail';
import { Backspace } from '../backspace';

const TabPanel: React.FC<ITabPanelProps> = ({ children, index, value }) => {
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`${index}`}
            aria-labelledby={`tab-${index}`}
        >
            {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
        </div>
    );
};

export const DetailCard: React.FC<IDetailCardProps> = ({
    title,
    tabs,
    children,
    deleteHandler,
}) => {
    const [value, setValue] = useState(0);
    const navigate = useNavigate();
    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <Paper className="min-w-fit mx-10 my-10">
            <div className="flex justify-between">
                <div className="flex font-serif text-2xl text-body mx-5 py-5">
                    <Backspace className="mt-1" />
                    <div>{title}</div>
                </div>
                {deleteHandler && (
                    <div className="my-auto mx-5 hover:cursor-pointer">
                        <DeleteIcon fontSize="large" onClick={deleteHandler} />
                    </div>
                )}
            </div>

            <Tabs
                value={value}
                onChange={handleChange}
                aria-label="disabled tabs example"
                variant="fullWidth"
            >
                {tabs.map((title, idx) => {
                    return <Tab label={title} key={idx} />;
                })}
            </Tabs>
            {children.map((node, idx) => {
                return (
                    <TabPanel value={value} key={idx} index={idx}>
                        {node}
                    </TabPanel>
                );
            })}
        </Paper>
    );
};
