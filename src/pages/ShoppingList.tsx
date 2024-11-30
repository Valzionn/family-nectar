import { Button } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const ShoppingList = () => {
  return (
    <div className="container px-4 py-8">
      <Link to="/">
        <Button variant="ghost" className="mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
        </Button>
      </Link>
      <h1 className="text-3xl font-bold mb-6">Shopping List</h1>
      <p>Coming soon!</p>
    </div>
  );
};

export default ShoppingList;