    export const paperReducer = (state, action) => {
      switch (action.type) {
        case 'SET_LOADING':
          return {
            ...state,
            loading: true,
          };
        case 'GET_PAPERS_SUCCESS':
          return {
            ...state,
            papers: action.payload,
            loading: false,
          };
        case 'CREATE_PAPER_SUCCESS':
          return {
            ...state,
            papers: [action.payload, ...state.papers],
            loading: false,
          };
        // [+] TAMBAHKAN CASE DI BAWAH INI
        case 'UPDATE_PAPER_SUCCESS':
          return {
            ...state,
            // Map melalui daftar paper, jika ID-nya cocok, ganti dengan data baru
            papers: state.papers.map((paper) =>
              paper._id === action.payload._id ? action.payload : paper
            ),
            loading: false,
          };
        case 'DELETE_PAPER_SUCCESS':
          return {
            ...state,
            papers: state.papers.filter(
              (paper) => paper._id !== action.payload
            ),
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
    