import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react'

import FormCoding from './FormCoding'

describe('FormPage', () => {
    test('renders Form component', () => {
        render(<FormCoding/>);
        expect(screen.getByText(/Nama Lengkap/)).toBeInTheDocument;
        expect(screen.getAllByLabelText(/Email/)).toBeInTheDocument;
    });

    test('memasukkan value nama dan email yang salah', () => {
        render(<FormCoding />);
        fireEvent.input(
            screen.getByRole("textbox", { name: /nama/i }), {
          target: { value: 'N0v14n' },
        });
        fireEvent.input(
            screen.getByRole("textbox", { name: /email/i }), {
          target: { value: 'Pratama' },
        });
        expect(screen.getByText('Nama Lengkap Harus Berupa Huruf')).toBeInTheDocument();
        expect(screen.getByLabelText(/Nama/)).toHaveValue('N0v14n');
        expect(screen.getByText('Email Tidak Sesuai')).toBeInTheDocument();
        expect(screen.getByLabelText(/Email/)).toHaveValue('Pratama');
    });

    test('memasukkan value nama dan email yag benar', () => {
        render(<FormCoding />);
        fireEvent.input(screen.getByRole("textbox", { name: /nama/i }), {
          target: { value: 'Novian' },
        });
        fireEvent.input(screen.getByRole("textbox", { name: /email/i }), {
          target: { value: 'novianpratama@mail.com' },
        });
        expect(screen.getByLabelText(/Nama/)).toHaveValue('Novian');
        expect(screen.getByLabelText(/Email/)).toHaveValue('novianpratama@mail.com');
      });

      test('button submit with error', () => {
        render(<FormCoding />);
        jest.spyOn(window, 'alert').mockImplementation(() => {});
        fireEvent.input(screen.getByRole("textbox", { name: /nama/i }), {
          target: { value: 'Buku Hebat' },
        });
        fireEvent.input(screen.getByRole("textbox", { name: /email/i }), {
          target: { value: 'emailmail.com' },
        });
        fireEvent.submit(screen.getByText("Submit"))
        expect(window.alert).toBeCalledWith("Data Pendaftar Tidak Sesuai");
        expect(screen.getByLabelText(/Nama/)).toHaveValue('Buku Hebat');
        expect(screen.getByLabelText(/Email/)).toHaveValue('emailmail.com');
      });
})