import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { X, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

interface ShoppingItem {
  id: string;
  text: string;
  completed: boolean;
}

const ShoppingList = () => {
  const [items, setItems] = useState<ShoppingItem[]>([]);
  const [newItem, setNewItem] = useState("");

  const addItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (newItem.trim()) {
      setItems([
        ...items,
        { id: crypto.randomUUID(), text: newItem.trim(), completed: false },
      ]);
      setNewItem("");
    }
  };

  const toggleItem = (id: string) => {
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  const removeItem = (id: string) => {
    setItems(items.filter((item) => item.id !== id));
  };

  return (
    <div className="container px-4 py-8 max-w-2xl mx-auto">
      <Link to="/">
        <Button variant="ghost" className="mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
        </Button>
      </Link>
      
      <h1 className="text-3xl font-bold mb-6">Shopping List</h1>
      
      <form onSubmit={addItem} className="flex gap-2 mb-6">
        <Input
          type="text"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          placeholder="Add new item..."
          className="flex-1"
        />
        <Button type="submit">Add</Button>
      </form>

      <ScrollArea className="h-[50vh] rounded-md border p-4">
        {items.length === 0 ? (
          <p className="text-center text-muted-foreground">
            No items in the shopping list
          </p>
        ) : (
          <ul className="space-y-3">
            {items.map((item) => (
              <li
                key={item.id}
                className="flex items-center justify-between gap-2 p-2 rounded hover:bg-accent"
              >
                <div className="flex items-center gap-2">
                  <Checkbox
                    checked={item.completed}
                    onCheckedChange={() => toggleItem(item.id)}
                  />
                  <span
                    className={`${
                      item.completed ? "line-through text-muted-foreground" : ""
                    }`}
                  >
                    {item.text}
                  </span>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeItem(item.id)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </li>
            ))}
          </ul>
        )}
      </ScrollArea>
    </div>
  );
};

export default ShoppingList;