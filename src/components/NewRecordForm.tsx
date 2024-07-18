import React from 'react';
import { useFormik } from 'formik';
import { PhonebookRecord } from '../types/PhonebookRecord';

interface NewRecordFormProps {
    onSubmit: (record: PhonebookRecord) => Promise<void>;
    initialValues: PhonebookRecord | null;
}

const NewRecordForm: React.FC<NewRecordFormProps> = ({ onSubmit, initialValues }) => {
    const formik = useFormik({
        initialValues: initialValues || {
            id: 0,
            name: '',
            surname: '',
            phoneNumber: ''
        },
        onSubmit: async (values) => {
            await onSubmit(values);
        },
    });

    return (
        <form onSubmit={formik.handleSubmit}>
            <label>
                Name:
                <input
                    type="text"
                    name="name"
                    onChange={formik.handleChange}
                    value={formik.values.name}
                />
            </label>
            <label>
                Surname:
                <input
                    type="text"
                    name="surname"
                    onChange={formik.handleChange}
                    value={formik.values.surname}
                />
            </label>
            <label>
                Phone Number:
                <input
                    type="text"
                    name="phoneNumber"
                    onChange={formik.handleChange}
                    value={formik.values.phoneNumber}
                />
            </label>
            <button type="submit">Submit</button>
        </form>
    );
};

export default NewRecordForm;
