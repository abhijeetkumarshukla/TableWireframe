   // Import necessary dependencies
import  { useReducer } from 'react';
 

const initialState = {
  rows: [{ label1: '', label2: [] }],
  dropdown1Options: ['Option 1', 'Option 2', 'Option 3'],
  dropdown2Options: ['Option A', 'Option B', 'Option C'],
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE_DROPDOWN1': {
      const { index, value } = action.payload;
      const updatedRows = state.rows.map((row, i) =>
        i === index ? { ...row, label1: value } : row
      );
      const updatedDropdown1Options = state.dropdown1Options.filter(
        (option) => option !== value
      );
      return { ...state, rows: updatedRows, dropdown1Options: updatedDropdown1Options };
    }

    case 'REMOVE_DROPDOWN1_OPTION': {
      const { index } = action.payload;
      const updatedRows = state.rows.map((row, i) =>
        i === index ? { ...row, label1: '' } : row
      );
      return { ...state, rows: updatedRows };
    }

    case 'UPDATE_DROPDOWN2': {
      const { index, value } = action.payload;
      const updatedRows = state.rows.map((row, i) =>
        i === index
          ? { ...row, label2: row.label2.includes(value) ? row.label2 : [...row.label2, value] }
          : row
      );
      return { ...state, rows: updatedRows };
    }

    case 'REMOVE_DROPDOWN2_OPTION': {
      const { index, value } = action.payload;
      const updatedRows = state.rows.map((row, i) =>
        i === index
          ? { ...row, label2: row.label2.filter((option) => option !== value) }
          : row
      );
      return { ...state, rows: updatedRows };
    }

    case 'ADD_DROPDOWN2_OPTION': {
      const { newOption } = action.payload;
      if (!newOption || state.dropdown2Options.includes(newOption)) {
        return state;
      }
      return {
        ...state,
        dropdown2Options: [...state.dropdown2Options, newOption],
      };
    }

    case 'ADD_ROW': {
      return { ...state, rows: [...state.rows, { label1: '', label2: [] }] };
    }

    default:
      return state;
  }
};

const Task = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div className='flex items-center justify-center'>
    <div className="p-6 mt-20 w-250">
      <h1 className="text-xl font-bold mb-4">Table wireframe</h1>
      <table className="table-auto w-full border border-gray-300 ">
        <thead>
        
          <tr className="bg-gray-100">
            <th className="border px-4 py-2">Label 1</th>
            <th className="border px-4 py-2">Label 2</th>
          </tr>
        </thead>
        <tbody>
          {state.rows.map((row, index) => (
            <tr key={index}>
              {/* Single-select dropdown */}
              <td className="border px-4 py-2">
                <div className="flex items-center">
                  <select
                    className="border rounded px-2 py-1 w-full"
                    value={row.label1}
                    onChange={(e) =>
                      dispatch({
                          type: 'UPDATE_DROPDOWN1',
                          payload: { index, value: e.target.value },
                      })
                  }
                  >
                    <option value="">Select</option>
                    {state.dropdown1Options.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                  {row.label1 && (
                    <button
                      className="ml-2 text-red-500"
                      onClick={() =>
                        dispatch({
                          type: 'REMOVE_DROPDOWN1_OPTION',
                          payload: { index },
                        })
                      }
                    >
                      ×
                    </button>
                  )}
                </div>
              </td>

              {/* Multi-select dropdown for Label 2 */}
              <td className="border px-4 py-2">
                <div className="relative">
                  <div className="border rounded px-2 py-1 w-full h-auto">
                    {row.label2.map((selected, i) => (
                      <span
                      key={i}
                      className="inline-block bg-blue-100 text-blue-700 rounded px-2 py-1 mr-2 mb-1"
                      >
                        {selected}
                        <button
                          className="ml-1 text-red-500"
                          onClick={() =>
                            dispatch({
                              type: 'REMOVE_DROPDOWN2_OPTION',
                              payload: { index, value: selected },
                            })
                          }
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                  <select
                    className="border rounded px-2 py-1 w-full mt-2"
                    onChange={(e) =>
                      dispatch({
                        type: 'UPDATE_DROPDOWN2',
                        payload: { index, value: e.target.value },
                      })
                    }
                  >
                    <option value="">Select</option>
                    {state.dropdown2Options.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                  <div className="mt-2">
                    <input
                      type="text"
                      className="border rounded px-2 py-1 w-full"
                      placeholder="Add new option"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          dispatch({
                              type: 'ADD_DROPDOWN2_OPTION',
                              payload: { newOption: e.target.value },
                            });
                          e.target.value = '';
                        }
                    }}
                    />
                  </div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

     <div style={{display:'flex' , justifyContent:'end'}}>
     <button
        className="mt-4 bg-black text-white px-4 py-2 rounded"
        onClick={() => dispatch({ type: 'ADD_ROW' })}
      >
        Add New Row
      </button>
     </div>
    </div>
        </div>
  );
};

export default Task;

