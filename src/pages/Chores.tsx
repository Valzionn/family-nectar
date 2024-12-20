import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Plus, X } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { getChores, createChore, updateChore, deleteChore, getUsernames } from '../services/api';

const Chores = () => {
  const [chores, setChores] = useState([]);
  const [newChore, setNewChore] = useState("");
  const [usernames, setUsernames] = useState([]);

  useEffect(() => {
    const fetchChores = async () => {
      const response = await getChores();
      setChores(response.data);
    };

    const fetchUsernames = async () => {
      const response = await getUsernames();
      setUsernames(response.data);
    };

    fetchChores();
    fetchUsernames();
  }, []);

  const addChore = async (e) => {
    e.preventDefault();
    if (newChore.trim()) {
      const newChoreData = { description: newChore.trim(), assignedTo: "" };
      const response = await createChore(newChoreData);
      setChores([...chores, response.data]);
      setNewChore("");
      toast.success("Added new chore!");
    }
  };

  const removeChore = async (id) => {
    await deleteChore(id);
    setChores(chores.filter((chore) => chore.id !== id));
    toast.success("Removed chore");
  };

  const assignChore = async (id, username) => {
    const chore = chores.find((chore) => chore.id === id);
    const updatedChore = { ...chore, assignedTo: username };
    await updateChore(id, updatedChore);
    setChores(chores.map((chore) => (chore.id === id ? updatedChore : chore)));
    toast.success(`Assigned chore to ${username}`);
  };

  return (
    <div className="container px-4 py-8 max-w-2xl mx-auto">
      <Link to="/index">
        <Button variant="ghost" className="mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
        </Button>
      </Link>

      <h1 className="text-3xl font-bold mb-6">Chores</h1>

      <form onSubmit={addChore} className="flex gap-2 mb-6">
        <Input
          type="text"
          value={newChore}
          onChange={(e) => setNewChore(e.target.value)}
          placeholder="Add new chore..."
          className="flex-1"
        />
        <Button type="submit">
          <Plus className="mr-2 h-4 w-4" /> Add Chore
        </Button>
      </form>

      <ScrollArea className="h-[50vh] rounded-md border p-4">
        {chores.length === 0 ? (
          <p className="text-center text-muted-foreground">
            No chores added yet. Add some tasks to get started!
          </p>
        ) : (
          <div className="space-y-4">
            {chores.map((chore) => (
              <div
                key={chore.id}
                className="flex items-center justify-between gap-4 p-4 rounded-lg border hover:bg-accent/50 transition-colors"
              >
                <span className="font-medium flex-1">{chore.description}</span>
                <Select
                  value={chore.assignedTo}
                  onValueChange={(value) => assignChore(chore.id, value)}
                >
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="Assign to..." />
                  </SelectTrigger>
                  <SelectContent>
                    {usernames.map((username) => (
                      <SelectItem key={username} value={username}>
                        {username}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeChore(chore.id)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </ScrollArea>
    </div>
  );
};

export default Chores;