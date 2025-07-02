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

      // --- Kumpulan Aksi untuk Paper ---

      // Aksi: Mengambil semua paper
      const getPapers = async () => {
        try {
          const res = await axios.get('/api/papers');
          dispatch({
            type: 'GET_PAPERS_SUCCESS',
            payload: res.data,
          });
        } catch (err) {
          dispatch({
            type: 'PAPER_ERROR',
            payload: err.response.data.msg,
          });
        }
      };

      // [*] Ubah fungsi createPaper
      const createPaper = async (uploadData) => {
        // Siapkan header khusus untuk file upload
        const config = {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        };

        try {
          // Kirim FormData dengan config khusus
          const res = await axios.post('/api/papers', uploadData, config);
          dispatch({
            type: 'CREATE_PAPER_SUCCESS',
            payload: res.data,
          });
          alert('Paper berhasil diunggah!');
        } catch (err) {
          dispatch({
            type: 'PAPER_ERROR',
            payload: err.response.data.msg,
          });
          alert('Gagal mengunggah paper: ' + err.response.data.msg);
        }
      };

      return (
        <PaperContext.Provider
          value={{
            ...state,
            getPapers,
            createPaper,
          }}
        >
          {children}
        </PaperContext.Provider>
      );
    };

    export const usePaper = () => {
      return useContext(PaperContext);
    };
    