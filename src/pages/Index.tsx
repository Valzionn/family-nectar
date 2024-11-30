import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle, ListTodo, Vote, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-secondary to-white">
      <div className="container px-4 py-8">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-primary mb-4">Family Hub</h1>
          <p className="text-lg text-gray-600">Keep your family organized and connected</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="p-6 hover:shadow-lg transition-shadow">
            <Vote className="w-12 h-12 text-primary mb-4" />
            <h2 className="text-xl font-semibold mb-2">Dinner Poll</h2>
            <p className="text-gray-600 mb-4">Vote on tonight's dinner or suggest something new!</p>
            <Link to="/dinner-poll">
              <Button className="w-full bg-primary hover:bg-primary/90">
                <PlusCircle className="mr-2 h-4 w-4" /> Start Poll
              </Button>
            </Link>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-shadow">
            <ShoppingCart className="w-12 h-12 text-primary mb-4" />
            <h2 className="text-xl font-semibold mb-2">Shopping List</h2>
            <p className="text-gray-600 mb-4">Keep track of what we need to buy</p>
            <Link to="/shopping-list">
              <Button className="w-full bg-primary hover:bg-primary/90">
                <PlusCircle className="mr-2 h-4 w-4" /> View List
              </Button>
            </Link>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-shadow">
            <ListTodo className="w-12 h-12 text-primary mb-4" />
            <h2 className="text-xl font-semibold mb-2">Chores</h2>
            <p className="text-gray-600 mb-4">See and manage family chores</p>
            <Link to="/chores">
              <Button className="w-full bg-primary hover:bg-primary/90">
                <PlusCircle className="mr-2 h-4 w-4" /> View Chores
              </Button>
            </Link>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;