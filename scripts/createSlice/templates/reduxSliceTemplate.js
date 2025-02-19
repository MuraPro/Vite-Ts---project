import firstCharUpperCase from "../firstCharUpperCase.js";

export default function reduxSliceTemplate(sliceName) {
  const typeName = `${firstCharUpperCase(sliceName)}Schema`;

  return `import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ${typeName} } from '../types/${sliceName}Schema';

const initialState: ${typeName} = {
    // Определите начальное состояние
};

export const ${sliceName}Slice = createSlice({
    name: '${sliceName}',
    initialState,
    reducers: {
        template: (state, action: PayloadAction<string>) => {
            // Введите логику редьюсера
        },
    },
    // extraReducers: (builder) => {
    //     builder
    //         .addCase(, (state) => {
    //             state.error = undefined;
    //             state.isLoading = true;
    //         })
    //         .addCase(, (state) => {
    //             state.isLoading = false;
    //         })
    //         .addCase(, (state, action) => {
    //             state.isLoading = false;
    //             state.error = action.payload;
    //         });
    // },
});

export const { actions: ${sliceName}Actions } = ${sliceName}Slice;
export const { reducer: ${sliceName}Reducer } = ${sliceName}Slice;
`;
}
