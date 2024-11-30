import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ArrowLeft, Plus, X } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

interface DinnerOption {
  id: string;
  text: string;
  votes: number;
}

const DinnerPoll = () => {
  const [options, setOptions] = useState<DinnerOption[]>([]);
  const [newOption, setNewOption] = useState("");
  const [selectedOption, setSelectedOption] = useState<string | undefined>();

  const addOption = (e: React.FormEvent) => {
    e.preventDefault();
    if (newOption.trim()) {
      setOptions([
        ...options,
        { id: crypto.randomUUID(), text: newOption.trim(), votes: 0 },
      ]);
      setNewOption("");
      toast.success("Added new dinner option!");
    }
  };

  const removeOption = (id: string) => {
    setOptions(options.filter((option) => option.id !== id));
    toast.success("Removed dinner option");
  };

  const vote = (id: string) => {
    if (selectedOption) {
      toast.error("You've already voted!");
      return;
    }
    setOptions(
      options.map((option) =>
        option.id === id ? { ...option, votes: option.votes + 1 } : option
      )
    );
    setSelectedOption(id);
    toast.success("Vote recorded!");
  };

  const resetPoll = () => {
    setOptions([]);
    setSelectedOption(undefined);
    toast.success("Poll reset!");
  };

  return (
    <div className="container px-4 py-8 max-w-2xl mx-auto">
      <Link to="/">
        <Button variant="ghost" className="mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
        </Button>
      </Link>

      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Dinner Poll</h1>
        <Button variant="outline" onClick={resetPoll}>Reset Poll</Button>
      </div>

      <form onSubmit={addOption} className="flex gap-2 mb-6">
        <Input
          type="text"
          value={newOption}
          onChange={(e) => setNewOption(e.target.value)}
          placeholder="Add dinner suggestion..."
          className="flex-1"
        />
        <Button type="submit">
          <Plus className="mr-2 h-4 w-4" /> Add Option
        </Button>
      </form>

      <ScrollArea className="h-[50vh] rounded-md border p-4">
        {options.length === 0 ? (
          <p className="text-center text-muted-foreground">
            No dinner options yet. Add some suggestions!
          </p>
        ) : (
          <div className="space-y-4">
            {options.map((option) => (
              <div
                key={option.id}
                className="flex items-center justify-between gap-2 p-3 rounded-lg border"
              >
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">{option.text}</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeOption(option.id)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      {option.votes} vote{option.votes !== 1 ? "s" : ""}
                    </span>
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => vote(option.id)}
                      disabled={selectedOption !== undefined}
                    >
                      Vote
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </ScrollArea>
    </div>
  );
};

export default DinnerPoll;