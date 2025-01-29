import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

const initialState = {
  tasks: [],
  loading: false,
};

// Async actions
export const getTasks = createAsyncThunk(
  "tasks/getTasks",
  async (_, { rejectWithValue, getState }) => {
    try {
      const token = getState().user.token;
      const { data } = await axios.get("/api/task", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return data.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const createTask = createAsyncThunk(
  "tasks/createTask",
  async ({ e, newTodo }, { rejectWithValue, dispatch, getState }) => {
    try {
      e.preventDefault();

      const token = getState().user.token;
      const { data } = await axios.post("/api/task", newTodo, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch(getTasks());
      toast.success(data.message);

      return {};
    } catch (error) {
      toast.error("error en createTask");
      return rejectWithValue(error.message);
    }
  }
);

export const toggleTodo = createAsyncThunk(
  "tasks/toggleTodo",
  async (id, { getState, rejectWithValue, dispatch }) => {
    try {
      const { tasks } = getState().task;
      const token = getState().user.token;

      const { data } = await axios.put(
        `/api/task/${id}`,
        {
          completed: !tasks.find((task) => task.id === id).completed,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch(getTasks());
      toast.success(data.message);
    } catch (error) {
      toast.error("error en toggleTodo");
      console.log(error.message)
      return rejectWithValue(error.message);
    }
  }
);

export const deleteTodo = createAsyncThunk(
  "tasks/deleteTodo",
  async (todoToDelete, { getState, rejectWithValue, dispatch }) => {
    try {
      const token = getState().user.token;

      const { data } = await axios.delete(`/api/task/${todoToDelete}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success(data.message);
      dispatch(getTasks());
      return null;
    } catch (error) {
      toast.error("Error en deleteTodo");
      return rejectWithValue(error.message);
    }
  }
);

export const saveEdit = createAsyncThunk(
  "tasks/saveEdit",
  async ({ id, updateTodo }, { getState, rejectWithValue, dispatch }) => {
    try {
      const token = getState().user.token;

      const { data } = await axios.put(`/api/task/${id}`, updateTodo, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success(data.message);
      dispatch(getTasks());

      return null;
    } catch (error) {
      toast.error("Error en deleteTodo");
      return rejectWithValue(error.message);
    }
  }
);

// Slice
const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTasks.pending, (state) => {
        state.loading = true;
      })
      .addCase(getTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload;
      })
      .addCase(getTasks.rejected, (state) => {
        state.loading = false;
      })
      .addCase(createTask.fulfilled, (state) => {
        state.newTodo = {};
      })
      .addCase(deleteTodo.fulfilled, (state) => {
        state.todoToDelete = null;
      });
  },
});

export const { cancelEdit, confirmDelete } = tasksSlice.actions;

export default tasksSlice.reducer;
