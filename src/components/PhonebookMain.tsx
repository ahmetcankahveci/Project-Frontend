import React, { useState, useEffect } from 'react';
import { DataGrid, GridColDef, GridPaginationModel } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import NewRecordForm from './NewRecordForm';
import { getPhonebook, createRecord, updateRecord, deleteRecord } from '../api/phonebookApi';
import { PhonebookRecord } from '../types/PhonebookRecord';

const PhonebookMain: React.FC = () => {
    const [open, setOpen] = useState(false);
    const [rows, setRows] = useState<PhonebookRecord[]>([]);
    const [selectedRow, setSelectedRow] = useState<PhonebookRecord | null>(null);
    const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({ pageSize: 5, page: 0 });

    useEffect(() => {
        fetchPhonebook();
    }, []);

    const fetchPhonebook = async () => {
        const data = await getPhonebook();
        setRows(data);
    };

    const handleClickOpen = () => {
        setOpen(true);
        setSelectedRow(null);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleFormSubmit = async (record: PhonebookRecord) => {
        if (selectedRow) {
            await updateRecord(selectedRow.id, record);
        } else {
            await createRecord({ ...record, id: rows.length + 1 });
        }
        fetchPhonebook();
        handleClose();
    };

    const handleUpdateClick = (row: PhonebookRecord) => {
        setSelectedRow(row);
        setOpen(true);
    };

    const handleDeleteClick = async (id: number) => {
        await deleteRecord(id);
        fetchPhonebook();
    };

    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', width: 90 },
        { field: 'name', headerName: 'Name', width: 150 },
        { field: 'surname', headerName: 'Surname', width: 150 },
        { field: 'phoneNumber', headerName: 'Phone Number', width: 150 },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 150,
            renderCell: (params) => (
                <>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleUpdateClick(params.row as PhonebookRecord)}
                    >
                        Update
                    </Button>
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => handleDeleteClick((params.row as PhonebookRecord).id)}
                    >
                        Delete
                    </Button>
                </>
            ),
        },
    ];

    return (
        <div style={{ height: 400, width: '100%' }}>
            <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                New
            </Button>
            <DataGrid
                rows={rows}
                columns={columns}
                paginationModel={paginationModel}
                onPaginationModelChange={setPaginationModel}
                checkboxSelection
            />
            <Dialog open={open} onClose={handleClose}>
                <NewRecordForm onSubmit={handleFormSubmit} initialValues={selectedRow} />
            </Dialog>
        </div>
    );
};

export default PhonebookMain;
