/* eslint-disable react/prop-types */
import {
  CheckCircle2,
  Circle,
  Trash2,
  Clock,
  Calendar,
  Pencil,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useMemo } from "react";
import { useDispatch } from "react-redux";

export const TaskItem = ({
  saveEdit,
  todo,
  updateTodo,
  setUpdateTodo,
  toggleTodo,
  cancelEdit,
  confirmDelete,
  initialState,
}) => {
  const dispatch = useDispatch();

  const priorityColors = useMemo(() => {
    return {
      low: "priority-low",
      medium: "priority-medium",
      high: "priority-high",
    };
  }, []);

  return (
    <div
      key={todo.id}
      className={cn(
        "flex items-center gap-3 p-4 rounded-lg transition-all",
        "hover:bg-muted group border"
      )}
    >
      <button
        onClick={() => dispatch(toggleTodo(todo.id))}
        className="flex-shrink-0"
      >
        {todo.completed ? (
          <CheckCircle2 className="h-5 w-5" />
        ) : (
          <Circle className="h-5 w-5" />
        )}
      </button>
      <div className="flex-1 min-w-0">
        {updateTodo.id === todo.id ? (
          <div className="flex gap-2">
            <Input
              value={updateTodo.text}
              name="text"
              onChange={(e) => setUpdateTodo({ ...todo, text: e.target.value })}
              className="h-8"
              autoFocus
            />
            <Select
              value={updateTodo.priority}
              onValueChange={(value) =>
                setUpdateTodo({ ...todo, priority: value })
              }
            >
              <SelectTrigger className="w-[140px] h-8">
                <SelectValue placeholder="Select priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">Prioridad Baja</SelectItem>
                <SelectItem value="medium">Prioridad Media</SelectItem>
                <SelectItem value="high">Prioridad Alta</SelectItem>
              </SelectContent>
            </Select>
            <Button
              size="sm"
              onClick={() => {
                dispatch(saveEdit({ id: todo.id, updateTodo }));
                setUpdateTodo(initialState);
              }}
            >
              Guardar
            </Button>
            <Button size="sm" variant="ghost" onClick={cancelEdit}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        ) : (
          <p
            className={cn(
              "text-sm font-medium transition-all truncate",
              todo.completed && "line-through text-muted-foreground"
            )}
          >
            {todo.text}
          </p>
        )}
        <div className="flex items-center gap-2 mt-1">
          <Badge
            variant="secondary"
            className={cn("text-xs", priorityColors[todo.priority])}
          >
            {todo.priority}
          </Badge>
          <span className="text-xs text-muted-foreground flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {new Date(todo.createdAt).toLocaleTimeString()}
          </span>
          <span className="text-xs text-muted-foreground flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            {new Date(todo.createdAt).toLocaleDateString()}
          </span>
        </div>
      </div>
      <div className="flex gap-1">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setUpdateTodo(todo)}
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
  );
};
