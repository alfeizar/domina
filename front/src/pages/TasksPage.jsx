import { useEffect, useState } from "react";
import { CheckCircle2, LayoutGrid, List, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";

import axios from "axios";
import { tokenLocalStorage } from "@/constants/localStorage";
import toast from "react-hot-toast";
import { useUser } from "@/hooks/useUser";
import { Loading } from "@/components/Loading";
import { DeleteDialog } from "@/components/DeleteDialog";
import { TaskItem } from "@/components/TaskItem";
import { TaskForm } from "@/components/TaskForm";
import { useDispatch, useSelector } from "react-redux";
import {
  createTask,
  deleteTodo,
  getTasks,
  saveEdit,
  toggleTodo,
} from "@/store/taskSlice";

const initialState = {
  text: "",
  priority: "medium",
};

export const TasksPage = () => {
  const [newTodo, setNewTodo] = useState(initialState);
  const [updateTodo, setUpdateTodo] = useState(initialState);
  const [view, setView] = useState("list");
  const [todoToDelete, setTodoToDelete] = useState(null);

  const { handleLogout } = useUser();
  const dispatch = useDispatch();

  const { tasks, loading } = useSelector((state) => state.task);

  const cancelEdit = () => {
    setUpdateTodo(initialState);
  };

  const confirmDelete = (id) => {
    setTodoToDelete(id);
  };

  useEffect(() => {
    dispatch(getTasks());
  }, [dispatch]);

  return (
    <div className="min-h-screen dark- bg-background- flex items-center justify-center p-4">
      <Card className="w-full max-w-5xl">
        <CardHeader>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-6 w-6" />
              <div>
                <CardTitle className="text-2xl font-bold">
                  Domina Maestro de tareas profesional
                </CardTitle>
                <CardDescription>
                  Organiza tus tareas de manera eficiente
                </CardDescription>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setView(view === "list" ? "grid" : "list")}
              >
                {view === "list" ? (
                  <LayoutGrid className="h-4 w-4" />
                ) : (
                  <List className="h-4 w-4" />
                )}
              </Button>

              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleLogout()}
              >
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <TaskForm
            createTask={createTask}
            newTodo={newTodo}
            setNewTodo={setNewTodo}
            initialState={initialState}
          />
        </CardHeader>

        <CardContent>
          {loading ? (
            <Loading />
          ) : (
            <ScrollArea className="h-[400px] pr-4">
              <div
                className={cn(
                  "grid gap-3",
                  view === "grid" ? "grid-cols-1 sm:grid-cols-2" : "grid-cols-1"
                )}
              >
                {tasks.map((todo) => (
                  <TaskItem
                    key={todo.id}
                    saveEdit={saveEdit}
                    todo={todo}
                    updateTodo={updateTodo}
                    setUpdateTodo={setUpdateTodo}
                    toggleTodo={toggleTodo}
                    cancelEdit={cancelEdit}
                    confirmDelete={confirmDelete}
                    initialState={initialState}
                  />
                ))}

                {tasks.length === 0 && (
                  <div className="text-center text-muted-foreground text-sm py-8 col-span-full">
                    Aún no hay tareas. ¡Agrega una para comenzar!
                  </div>
                )}
              </div>
            </ScrollArea>
          )}
        </CardContent>
      </Card>

      <DeleteDialog
        todoToDelete={todoToDelete}
        setTodoToDelete={setTodoToDelete}
        deleteTodo={deleteTodo}
      />
    </div>
  );
};
