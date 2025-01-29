/* eslint-disable react/prop-types */
import { PlusCircle } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useDispatch } from "react-redux";

export const TaskForm = ({ createTask, newTodo, setNewTodo, initialState }) => {
  const dispatch = useDispatch();

  return (
    <form
      onSubmit={(e) => {
        dispatch(createTask({ e, newTodo })), setNewTodo(initialState);
      }}
      className="flex gap-2"
    >
      <Input
        type="text"
        value={newTodo.text}
        name="text"
        onChange={(e) => setNewTodo({ ...newTodo, text: e.target.value })}
        placeholder="Agrega una nueva tarea..."
        className="flex-1"
      />
      <Select
        value={newTodo.priority}
        name="priority"
        onValueChange={(value) => setNewTodo({ ...newTodo, priority: value })}
      >
        <SelectTrigger className="w-[140px]">
          <SelectValue placeholder="Select priority" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="low">Prioridad Baja</SelectItem>
          <SelectItem value="medium">Prioridad Media</SelectItem>
          <SelectItem value="high">Prioridad Alta</SelectItem>
        </SelectContent>
      </Select>
      <Button type="submit" disabled={!newTodo.text}>
        <PlusCircle className="h-5 w-5 mr-2" />
        Agregar
      </Button>
    </form>
  );
};
