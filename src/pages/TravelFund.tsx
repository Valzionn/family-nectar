import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { PiggyBank, Plus } from "lucide-react";

interface Contribution {
  id: number;
  member: string;
  amount: number;
  date: string;
}

const TravelFund = () => {
  const { toast } = useToast();
  const [contributions, setContributions] = useState<Contribution[]>([]);
  const [newAmount, setNewAmount] = useState("");
  const [memberName, setMemberName] = useState("");

  const totalFund = contributions.reduce((sum, contribution) => sum + contribution.amount, 0);

  const handleAddContribution = () => {
    if (!memberName || !newAmount) {
      toast({
        title: "Error",
        description: "Please fill in both name and amount",
        variant: "destructive",
      });
      return;
    }

    const amount = parseFloat(newAmount);
    if (isNaN(amount) || amount <= 0) {
      toast({
        title: "Error",
        description: "Please enter a valid amount",
        variant: "destructive",
      });
      return;
    }

    const newContribution: Contribution = {
      id: Date.now(),
      member: memberName,
      amount: amount,
      date: new Date().toLocaleDateString(),
    };

    setContributions([...contributions, newContribution]);
    setNewAmount("");
    setMemberName("");

    toast({
      title: "Success",
      description: `Added ${amount.toFixed(2)} to the travel fund!`,
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-primary mb-4">Family Travel Fund</h1>
          <p className="text-lg text-gray-600">Save together for our next adventure!</p>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center justify-center gap-2">
              <PiggyBank className="h-6 w-6" />
              Current Total: ${totalFund.toFixed(2)}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4">
              <Input
                type="text"
                placeholder="Family Member Name"
                value={memberName}
                onChange={(e) => setMemberName(e.target.value)}
                className="flex-1"
              />
              <Input
                type="number"
                placeholder="Amount"
                value={newAmount}
                onChange={(e) => setNewAmount(e.target.value)}
                className="flex-1"
                min="0"
                step="0.01"
              />
              <Button onClick={handleAddContribution} className="whitespace-nowrap">
                <Plus className="mr-2 h-4 w-4" /> Add Contribution
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <h2 className="text-2xl font-semibold mb-4">Recent Contributions</h2>
          {contributions.length === 0 ? (
            <p className="text-center text-gray-500">No contributions yet. Be the first to add!</p>
          ) : (
            <div className="grid gap-4">
              {contributions.map((contribution) => (
                <Card key={contribution.id}>
                  <CardContent className="flex items-center justify-between p-4">
                    <div>
                      <p className="font-semibold">{contribution.member}</p>
                      <p className="text-sm text-gray-500">{contribution.date}</p>
                    </div>
                    <p className="text-lg font-semibold text-primary">
                      ${contribution.amount.toFixed(2)}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TravelFund;