    import React, { createContext, useReducer, useContext } from 'react';
    import axios from 'axios';
    import { paperReducer } from './paperReducer';

    const initialState = {
      papers: [],
      paper: null,
      loading: true,
      error: null,
    };

    const PaperContext = createContext();

    export const PaperProvider = ({ children }) => {
      const [state, dispatch] = useReducer(paperReducer, initialState);

      const getPapers = async () => {
        dispatch({ type: 'SET_LOADING' });
        try {
          const res = await axios.get('/api/papers');
          dispatch({ type: 'GET_PAPERS_SUCCESS', payload: res.data });
        } catch (err) {
          dispatch({ type: 'PAPER_ERROR', payload: err.response.data.msg });
        }
      };

      const createPaper = async (uploadData) => { /* ...kode tidak berubah... */ };

      const deletePaper = async (id) => {
        if (window.confirm('Apakah Anda yakin ingin menghapus paper ini?')) {
          try {
            await axios.delete(`/api/papers/${id}`);
            dispatch({ type: 'DELETE_PAPER_SUCCESS', payload: id });
            alert('Paper berhasil dihapus.');
            return true;
          } catch (err) {
            dispatch({ type: 'PAPER_ERROR', payload: err.response.data.msg });
            alert('Gagal menghapus paper: ' + err.response.data.msg);
            return false;
          }
        }
        return false;
      };

      // [+] TAMBAHKAN FUNGSI DI BAWAH INI
      // Aksi: Mengupdate paper
      const updatePaper = async (id, formData) => {
        try {
          const res = await axios.put(`/api/papers/${id}`, formData);
          dispatch({
            type: 'UPDATE_PAPER_SUCCESS',
            payload: res.data,
          });
          alert('Paper berhasil diperbarui.');
          return true; // Beri sinyal sukses
        } catch (err) {
          dispatch({
            type: 'PAPER_ERROR',
            payload: err.response.data.msg,
          });
          alert('Gagal memperbarui paper: ' + err.response.data.msg);
          return false; // Beri sinyal gagal
        }
      };

      return (
        <PaperContext.Provider
          value={{
            ...state,
            getPapers,
            createPaper,
            deletePaper,
            updatePaper, // <-- [*] Sediakan fungsi baru ini
          }}
        >
          {children}
        </PaperContext.Provider>
      );
    };

    export const usePaper = () => {
      return useContext(PaperContext);
    };
    