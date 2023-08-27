
"use client"
import { useState } from 'react';
import { TextField } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const DOLLAR_TO_GRAMS_CONVERSION = 1/100;
const DOLLAR_TO_KILOGRAMS_CONVERSION = 0.01; 
const DOLLAR_TO_POUNDS_CONVERSION = DOLLAR_TO_KILOGRAMS_CONVERSION * 2.205; 

export default function Home() {
  const [convertedValues, setConvertedValues] = useState({
    grams: 0,
    kilograms: 0,
    pounds: 0,
  });

  const validationSchema = Yup.object({
    money: Yup.number()
      .typeError('Please enter a valid number')
      .required('Amount of money is required')
      .min(0, 'Amount must be positive'),
  });

  const {
    handleChange,
    values,
    handleSubmit,
    resetForm,
    handleBlur,
    touched,
    errors,
  } = useFormik({
    initialValues: {
      money: '',
    },

    validationSchema,
    onSubmit: (data) => {
      resetForm();
      const dollars = parseFloat(data.money);
      const grams = dollars * DOLLAR_TO_GRAMS_CONVERSION;
      const kilograms = grams / 1000;
      const pounds =  kilograms *  2.205;

      setConvertedValues({
        grams: grams,
        kilograms: kilograms,
        pounds: pounds,
      });
    },
  });

  return (
    <main className='container mx-auto'>
      <h1 className='text-center font-medium text-4xl mt-5'>Weight Calculator based on Money Amount</h1>
      <form className='

      
    ' onSubmit={handleSubmit}>
        <div className='mt-5'>
          <div className='flex items-center gap-2 '>
          <div>
            <p className='font-bold text-gray-500 text-lg '> $</p>
          </div>
          <TextField
            onChange={handleChange}
            name='money'
            value={values.money}
            onBlur={handleBlur}
            fullWidth
            label='Input the amount of money'
            // id='fullWidth'
            error={touched.money && Boolean(errors.money)}
            helperText={touched.money && errors.money}
          />
          
          </div>
        </div>
        <div className='mt-4 space-y-5'>
          <p>Converted values:</p>
          <p>Grams: {convertedValues.grams.toFixed(2)}</p>
          <p>Kilograms: {convertedValues.kilograms}</p>
          <p>Pounds: {convertedValues.pounds.toFixed(2)}</p>
        </div>
        <button className='px-4 py-2 font-medium border rounded-md bg-lime-600 mt-4' type='submit'>
          Convert
        </button>
      </form>
    </main>
  );
}
