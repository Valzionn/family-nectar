import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { PiggyBank, Plus } from "lucide-react";
import { getContributions, createContribution, deleteContribution } from '../services/api';
import { Link } from "react-router-dom"
import { X, ArrowLeft } from "lucide-react";

interface Contribution {
  id?: number; // Optional for frontend
  member: string;
  amount: number;
  date: string;
}

const TravelFund = () => {
  const { toast } = useToast();
  const [contributions, setContributions] = useState<Contribution[]>([]);
  const [newAmount, setNewAmount] = useState("");

  useEffect(() => {
    const fetchContributions = async () => {
      const response = await getContributions();
      setContributions(response.data);
    };
    fetchContributions();
  }, []);

  const totalFund = contributions.reduce((sum, contribution) => sum + contribution.amount, 0);

  const handleAddContribution = async () => {
    const user = JSON.parse(localStorage.getItem('user')); // Retrieve user data from local storage
    const memberName = user.username; // Use username from user data

    if (!memberName || !newAmount) {
      toast({
        title: "Error",
        description: "Please fill in the amount",
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
      member: memberName,
      amount: amount,
      date: new Date().toISOString(),
    };

    try {
      const response = await createContribution(newContribution);
      setContributions([...contributions, response.data]);
      setNewAmount("");
      toast({
        title: "Success",
        description: `Added ${amount.toFixed(2)} to the travel fund!`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add contribution",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="container px-4 py-8 max-w-2xl mx-auto">
      <Link to="/index">
        <Button variant="ghost" className="mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
        </Button>
      </Link>
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
                      <p className="text-sm text-gray-500">{new Date(contribution.date).toLocaleDateString()}</p>
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