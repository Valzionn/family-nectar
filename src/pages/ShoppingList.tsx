import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { X, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { getShoppingItems, createShoppingItem, updateShoppingItem, deleteShoppingItem } from '../services/api';

const ShoppingList = () => {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState("");

  useEffect(() => {
    const fetchItems = async () => {
      const response = await getShoppingItems();
      setItems(response.data);
    };
    fetchItems();
  }, []);

  const addItem = async (e) => {
    e.preventDefault();
    if (newItem.trim()) {
      const newItemData = { name: newItem.trim(), isPurchased: false };
      const response = await createShoppingItem(newItemData);
      setItems([...items, response.data]);
      setNewItem("");
    }
  };

  const toggleItem = async (id) => {
    const item = items.find((item) => item.id === id);
    const updatedItem = { ...item, isPurchased: !item.isPurchased };
    await updateShoppingItem(id, updatedItem);
    setItems(items.map((item) => (item.id === id ? updatedItem : item)));
  };

  const removeItem = async (id) => {
    await deleteShoppingItem(id);
    setItems(items.filter((item) => item.id !== id));
  };

  return (
    <div className="container px-4 py-8 max-w-2xl mx-auto">
      <Link to="/index">
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
                    checked={item.isPurchased}
                    onCheckedChange={() => toggleItem(item.id)}
                  />
                  <span
                    className={`${
                      item.isPurchased ? "line-through text-muted-foreground" : ""
                    }`}
                  >
                    {item.name}
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