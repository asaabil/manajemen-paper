    // Reducer untuk mengelola state yang berhubungan dengan paper
    export const paperReducer = (state, action) => {
      switch (action.type) {
        case 'GET_PAPERS_SUCCESS':
          return {
            ...state,
            papers: action.payload,
            loading: false,
          };
        case 'CREATE_PAPER_SUCCESS':
          return {
            ...state,
            papers: [action.payload, ...state.papers], // Tambah paper baru di atas daftar
            loading: false,
          };
        case 'PAPER_ERROR':
          return {
            ...state,
            error: action.payload,
            loading: false,
          };
        default:
          return state;
      }
    };
    