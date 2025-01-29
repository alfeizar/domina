import { useState } from "react";
import {
  PlusCircle,
  CheckCircle2,
  Circle,
  Trash2,
  Clock,
  Calendar,
  Filter,
  LayoutGrid,
  List,
  Search,
  Pencil,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export const TasksPageExample = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [filter, setFilter] = useState("all");
  const [priority, setPriority] = useState("medium");
  const [searchQuery, setSearchQuery] = useState("");
  const [view, setView] = useState("list");
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");
  const [editPriority, setEditPriority] = useState("medium");
  const [todoToDelete, setTodoToDelete] = useState(null);

  // const addTodo = (e) => {
  //   e.preventDefault();
  //   if (newTodo.trim()) {
  //     setTodos([
  //       ...todos,
  //       {
  //         id: Date.now(),
  //         text: newTodo.trim(),
  //         completed: false,
  //         createdAt: new Date(),
  //         priority,
  //       },
  //     ]);
  //     setNewTodo("");
  //   }
  // };

  // const toggleTodo = (id) => {
  //   setTodos(
  //     todos.map((todo) =>
  //       todo.id === id ? { ...todo, completed: !todo.completed } : todo
  //     )
  //   );
  // };

  const startEditing = (todo) => {
    setEditingId(todo.id);
    setEditText(todo.text);
    setEditPriority(todo.priority);
  };

  // const saveEdit = (id) => {
  //   if (editText.trim()) {
  //     setTodos(
  //       todos.map((todo) =>
  //         todo.id === id
  //           ? { ...todo, text: editText.trim(), priority: editPriority }
  //           : todo
  //       )
  //     );
  //   }
  //   setEditingId(null);
  //   setEditText("");
  // };

  const cancelEdit = () => {
    setEditingId(null);
    setEditText("");
  };

  const confirmDelete = (id) => {
    setTodoToDelete(id);
  };

  const deleteTodo = () => {
    if (todoToDelete !== null) {
      setTodos(todos.filter((todo) => todo.id !== todoToDelete));
      setTodoToDelete(null);
    }
  };

  const stats = {
    total: 12,
    completed: 2,
    pending: 4,
  };

  const priorityColors = {
    low: "priority-low",
    medium: "priority-medium",
    high: "priority-high",
  };

  const prueba = [
    {
      id: 1,
      text: "Tarea 1",
      completed: false,
      createdAt: new Date(),
      priority: "low",
    },
  ];

  return (
    <div className="min-h-screen dark bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-4xl">
        <CardHeader>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-6 w-6" />
              <div>
                <CardTitle className="text-2xl font-bold">
                  Task Master Pro
                </CardTitle>
                <CardDescription>
                  Organize your tasks efficiently
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
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search tasks..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8"
              />
            </div>
          </div>

          <form
            // onSubmit={addTodo}
            className="flex gap-2"
          >
            <Input
              type="text"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              placeholder="Add a new task..."
              className="flex-1"
            />
            <Select
              value={priority}
              onValueChange={(value) => setPriority(value)}
            >
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Select priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">Low Priority</SelectItem>
                <SelectItem value="medium">Medium Priority</SelectItem>
                <SelectItem value="high">High Priority</SelectItem>
              </SelectContent>
            </Select>
            <Button type="submit">
              <PlusCircle className="h-5 w-5 mr-2" />
              Add Task
            </Button>
          </form>
        </CardHeader>

        <CardContent>
          <div className="flex items-center justify-between mb-6">
            <div className="flex gap-4">
              <div className="text-sm">
                <span className="text-muted-foreground">Total: </span>
                <span className="font-medium">
                  {/* {stats.total} */}
                  12
                </span>
              </div>
              <div className="text-sm">
                <span className="text-muted-foreground">Completed: </span>
                <span className="font-medium">{/* {stats.completed} */}1</span>
              </div>
              <div className="text-sm">
                <span className="text-muted-foreground">Pending: </span>
                <span className="font-medium">{/* {stats.pending} */}3</span>
              </div>
            </div>
            <Button variant="ghost" size="sm" className="gap-2">
              <Filter className="h-4 w-4" />
              Filter
            </Button>
          </div>

          <Tabs
            defaultValue="all"
            className="w-full"
            onValueChange={(value) => setFilter(value)}
          >
            <TabsList className="grid w-full grid-cols-3 mb-4">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="active">Active</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
            </TabsList>

            <ScrollArea className="h-[400px] pr-4">
              <div
                className={cn(
                  "grid gap-3",
                  view === "grid" ? "grid-cols-1 sm:grid-cols-2" : "grid-cols-1"
                )}
              >
                {prueba.map((todo) => (
                  <div
                    key={todo.id}
                    className={cn(
                      "flex items-center gap-3 p-4 rounded-lg transition-all",
                      "hover:bg-muted group border"
                    )}
                  >
                    <button
                      // onClick={() => toggleTodo(todo.id)}
                      className="flex-shrink-0"
                    >
                      {todo.completed ? (
                        <CheckCircle2 className="h-5 w-5" />
                      ) : (
                        <Circle className="h-5 w-5" />
                      )}
                    </button>
                    <div className="flex-1 min-w-0">
                      {editingId === todo.id ? (
                        <div className="flex gap-2">
                          <Input
                            value={editText}
                            onChange={(e) => setEditText(e.target.value)}
                            className="h-8"
                            autoFocus
                          />
                          <Select
                            value={editPriority}
                            onValueChange={(value) => setEditPriority(value)}
                          >
                            <SelectTrigger className="w-[140px] h-8">
                              <SelectValue placeholder="Select priority" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="low">Low Priority</SelectItem>
                              <SelectItem value="medium">
                                Medium Priority
                              </SelectItem>
                              <SelectItem value="high">
                                High Priority
                              </SelectItem>
                            </SelectContent>
                          </Select>
                          <Button
                            size="sm"
                            // onClick={() => saveEdit(todo.id)}
                          >
                            Save
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={cancelEdit}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ) : (
                        <p
                          className={cn(
                            "text-sm font-medium transition-all truncate",
                            todo.completed &&
                              "line-through text-muted-foreground"
                          )}
                        >
                          {todo.text}
                        </p>
                      )}
                      <div className="flex items-center gap-2 mt-1">
                        <Badge
                          variant="secondary"
                          className={cn(
                            "text-xs",
                            priorityColors[todo.priority]
                          )}
                        >
                          {todo.priority}
                        </Badge>
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {todo.createdAt.toLocaleTimeString()}
                        </span>
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {todo.createdAt.toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => startEditing(todo)}
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => confirmDelete(todo.id)}
                        className="opacity-0 group-hover:opacity-100 transition-opacity text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}

                {prueba.length === 0 && (
                  <div className="text-center text-muted-foreground text-sm py-8 col-span-full">
                    {searchQuery
                      ? "No tasks match your search"
                      : "No tasks yet. Add one to get started!"}
                  </div>
                )}
              </div>
            </ScrollArea>
          </Tabs>
        </CardContent>
      </Card>

      {/* <AlertDialog
        open={todoToDelete !== null}
        onOpenChange={() => setTodoToDelete(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              task.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={deleteTodo}
              className="bg-destructive text-destructive-foreground"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog> */}
    </div>
  );
};
